const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const date = document.querySelector("#date");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const btnInclude = document.querySelector("#btnInclude");

const profit = document.querySelector("#profit");
const loss = document.querySelector("#loss");
const total = document.querySelector("#total");

const btnCSV = document.getElementById("downloadCSV");

function fazGet(url){
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

function getValores(url){
    const data = fazGet(url);
    const entradas = JSON.parse(data);
    return entradas[0].total_sum;
};

function getWithIndex(url){
    const data = fazGet(url);
    const entradas = JSON.parse(data);
    return entradas;
};

function getTotals(){
    profit.innerHTML =  'R$ ' + getValores("http://localhost:3001/get/profit");
    loss.innerHTML =  'R$ ' +  getValores("http://localhost:3001/get/loss");
    total.innerHTML = 'R$ ' + ( getValores("http://localhost:3001/get/profit") - getValores("http://localhost:3001/get/loss")).toFixed(2);
};

function loadItens(){
    items = getWithIndex("http://localhost:3001/get");
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });
    getTotals();
};



// Incluir um gasto no Banco de Dados
btnInclude.onclick = () => {
    if(descItem.value === "" || amount.value === ""){
        return alert("Preencha todos os campos!");
    };

    if(type.value === "Entrada"){
        type_value = "E";
    }else{
        type_value = "S";
    };

    const params = {
        id_user: window.localStorage.getItem('id'),
        date: document.querySelector("#date").value,
        price: document.querySelector("#amount").value,
        description: document.querySelector("#desc").value,
        category: document.querySelector("#category").value,
        type: type_value
    };

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3001/post", false);
    request.setRequestHeader("Content-type", "application/json");
    console.log(JSON.stringify(params))
    request.send(JSON.stringify(params));

    loadItens();

    descItem.value = "";
    amount.value = "";
};

// Inserir o gasto na tabela
function insertItem(item){
    const tr = document.createElement("tr");

    if(item.type === "E"){
        type_new_value = "Entrada";
    }else{
        type_new_value = "Saída";
    };

    tr.innerHTML = `
    <td id="exportarCSV">${item.date.split("T")[0].split("-").reverse().join("/")}</td>
    <td id="exportarCSV">${item.description}</td>
    <td id="exportarCSV">R$${item.price}</td>
    <td id="exportarCSV">${item.category}</td>
    <td id="exportarCSV">${type_new_value}</td>
    </td>
    <td class="columnAction">
    <button onClick="openModal(${item.id})">Atualizar</button>
    <button onClick="deleteItem(${item.id})">Excluir</button>
    </td>
    `;

    tbody.appendChild(tr);
};

// Abertura do modal para atualização de um gasto
function openModal(index){
    location.href = "http://127.0.0.1:5500/#atualizarGasto";

    let userId;
    const dateNew = document.querySelector("#dateNew");
    const descNew = document.querySelector("#descNew");
    const amountNew = document.querySelector("#amountNew");
    const typeNew = document.querySelector("#typeNew");
    const categoryNew = document.querySelector("#categoryNew");
    const btnAtualizar = document.getElementById("btnAtualizar");

    items = getWithIndex("http://localhost:3001/get/id/"+parseInt(index));
    items.forEach((item) => {
        dateNew.value = item.date.split("T")[0];
        descNew.value = item.description;
        amountNew.value = item.price;
        categoryNew.value = item.category;
        userId = item.id_user;
        if(item.type === "E"){
            typeNew.value = "Entrada";
        }else{
            typeNew.value = "Saída";
        };
    });

    btnAtualizar.addEventListener("click", function(){
        if(dateNew.value === "" || descNew.value === "" || amountNew.value === ""){
            return alert("Preencha todos os campos!");
        };
        const resposta = confirm("Você tem certeza que quer atualizar esta operação?");
        if(resposta){    
            if(typeNew.value === "Entrada"){
                type_value_new = "E";
            }else{
                type_value_new = "S";
            };

            const params = {
                id_user: userId,
                date: dateNew.value,
                price: amountNew.value,
                description: descNew.value,
                category: categoryNew.value,
                type: type_value_new
            };

            const request = new XMLHttpRequest();
            request.open("PUT", "http://localhost:3001/update/"+parseInt(index), true);
            request.setRequestHeader("Content-type","application/json");
            request.onload = function(){
                const item = JSON.parse(request.responseText);
                if(request.readyState == 4 && request.status == "200"){
                    console.table(item);
                    alert("A operação foi atualizada com sucesso!");
                    document.querySelector(".modalClose").click();
                    loadItens();
                }else{
                    console.error(item);
                };
            };
            request.send(JSON.stringify(params));
        }else{
            alert("A operação não foi atualizada!");
            document.querySelector(".modalClose").click();
        };
    });
};

// Deletar um gasto
function deleteItem(index){
    const resposta = confirm("Você tem certeza que quer deletar esta operação?");
    if(resposta){
        const request = new XMLHttpRequest();
        request.open("DELETE", "http://localhost:3001/delete/"+index, true);
        request.onload = function (){
            const item = JSON.parse(request.responseText);
            if(request.readyState == 4 && request.status == "200"){
                console.table(item);
                alert("A operação foi deletada com sucesso!");
                loadItens();
            }else{
                console.error(item);
            };
        };
        request.send(null);
    }else{
        alert("A operação não foi deletado!")
    };
};

// // Fazer download do CSV
// function downloadCSVFile(csv_data){
//     CSVFile = new Blob(["\ufeff", csv_data], {type: "text/csv"});
//     const linkDownload = document.createElement("a");
//     linkDownload.download = "Operações_Pila.csv";
//     const url = window.URL.createObjectURL(CSVFile);
//     linkDownload.href = url;
//     linkDownload.style.display = "none";
//     document.body.appendChild(linkDownload);
//     linkDownload.click();
//     document.body.removeChild(linkDownload);
// };

// // Clicar no botão, formar o CSV e fazer o download
// btnCSV.addEventListener("click", function(){
//     let csv_data = [];
//     const rows = document.getElementsByTagName("tr");
//     for(let i = 0; i < rows.length; i++){
//         const cols = rows[i].querySelectorAll("#exportarCSV");
//         const csvrow = [];
//         for(let j = 0; j < cols.length; j++){
//             csvrow.push(cols[j].innerHTML);
//         };
//         csv_data.push(csvrow.join(";"));
//     };
//     csv_data = csv_data.join("\n");
//     downloadCSVFile(csv_data);
// });

// // Filtro por coluna da tabela
// function filtragemTbl(idCampo, colunaTbl){
//     let filtrar, tabela, tr, td, th, i;

//     filtrar = document.getElementById(idCampo);
//     filtrar = filtrar.value.toUpperCase();

//     tabela = document.getElementById("tbl");
//     tr = tabela.getElementsByTagName("tr");
//     th = tabela.getElementsByTagName("th");

//     for(i = 0; i < tr.length; i++){
//         td = tr[i].getElementsByTagName("td")[colunaTbl];
//         if(td){
//             if(td.innerHTML.toUpperCase().indexOf(filtrar) > -1){
//                 tr[i].style.display = "";
//             }else{
//                 tr[i].style.display = "none";
//             };
//         };
//     };
// };

// document.getElementById("buscaDesc").addEventListener("input", function(){
//     filtragemTbl("buscaDesc", 1);
// });

// document.getElementById("buscaValor").addEventListener("input", function(){
//     filtragemTbl("buscaValor", 2);
// });

// document.getElementById("buscaCategoria").addEventListener("input", function(){
//     filtragemTbl("buscaCategoria", 3);
// });

// document.getElementById("buscaTipo").addEventListener("input", function(){
//     filtragemTbl("buscaTipo", 4);
// });

loadItens();