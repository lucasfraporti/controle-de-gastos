const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const date = document.querySelector("#date-input");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const btnInclude = document.querySelector("#btnInclude");

//modal ajuda e sugestão
const Ajuda = document.querySelector("#ajuda");
const Sugestao = document.querySelector("#sugestão");

//valores
const profit = document.querySelector("#profit");
const loss = document.querySelector("#loss");
const total = document.querySelector("#total");

const usuario = document.querySelector("#usuario");

//id firebase
const iduser = window.localStorage.getItem('id');

//const btnCSV = document.getElementById("downloadCSV");

//carousel data
var util = {
    qs(sel, ctx){ 
        return (ctx || document).querySelector(sel);
    },
    qsa(sel, ctx){
        return Array.from((ctx || document).querySelectorAll(sel));
    }
};

class DateCarousel {
    constructor(el) {
    this.element = el;
    this.prevButton = util.qs(".date-carousel-prev", el);
    this.input = util.qs(".date-carousel-input",el);
    this.nextButton = util.qs(".date-carousel-next",el);
    this.input.valueAsDate = new Date();
    this.prevButton.addEventListener("click",this.prev.bind(this));
    this.nextButton.addEventListener("click",this.next.bind(this));
    }
    prev(){
    this.input.stepDown();
    }
    next() {
    this.input.stepUp();
    }  
}
util.qsa('.date-carousel').forEach(function(el){ new DateCarousel(el) });

//pegando a troca de data do carousel  
document.getElementById("dataprev").addEventListener("click", loadItens);
document.getElementById("datanext").addEventListener("click", loadItens);

// TESTE NOVA DATA
var mes;
var ano;

function datanext() {
    let data = document.getElementById("datacarousel").value;
    let dataString = data.split('-') // Retornará ['09', '2022']
    mes = dataString[1]
    ano = dataString[0]
}

//functions da API
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

//formatar os valores
function formatavalor(valor) {
    const formatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return formatado;
};

function getprofit(){
    const profit =  formatavalor(getValores("https://controle-de-gastos-pila.herokuapp.com/get/profit2?id_user="+iduser+"&mes="+mes+"&ano="+ano));
    return profit
};

function getloss(){
    const loss =  formatavalor(getValores("https://controle-de-gastos-pila.herokuapp.com/get/loss2?id_user="+iduser+"&mes="+mes+"&ano="+ano));
    return loss
};

function getprofitandloss(){
    const profit = getValores("https://controle-de-gastos-pila.herokuapp.com/get/profit2?id_user="+iduser+"&mes="+mes+"&ano="+ano);
    const loss =  getValores("https://controle-de-gastos-pila.herokuapp.com/get/loss2?id_user="+iduser+"&mes="+mes+"&ano="+ano);
    const total = formatavalor(profit - loss);
    return total;
};

function getTotals(){
    profit.innerHTML =  getprofit();
    loss.innerHTML = getloss();
    total.innerHTML = getprofitandloss();
};

function loadItens(){
    datanext()
    items = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/gettabela2?id_user="+iduser+"&mes="+mes+"&ano="+ano);
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });
    getTotals();
};

function validainput(){
    swal("É necessário preencher todos os campos!", {
    buttons: false,
    timer: 3000,
    });  
};

// Incluir um gasto no Banco de Dados
function incluirgasto(){
    if(desc.value === "" || amount.value === "" || date.value === ""){
        alertwarning('É necessário preencher todos os campos!');
    }else{
        if(amount.value > 0){
            type_value = "E";
        }else{
            type_value = "S";
        };
        const priceatual = document.querySelector("#amount").value;
        const pricefinal = priceatual.replace('-','');
        const params = {
            id_user: window.localStorage.getItem('id'),
            date: document.querySelector("#date-input").value,
            price: pricefinal,
            description: document.querySelector("#desc").value,
            category: document.querySelector("#category").value,
            type: type_value
        };
        const request = new XMLHttpRequest();
        request.open("POST", "https://controle-de-gastos-pila.herokuapp.com/post", false);
        request.setRequestHeader("Content-type", "application/json");
        // console.log(JSON.stringify(params))
        request.send(JSON.stringify(params));
        loadItens();
        Modal.close();
        alertsuccess("Transação inserida com sucesso!")
    }
};

// Inserir o gasto na tabela
function insertItem(item){
    const tr = document.createElement("tr");
    const CSSClass = item.type === "E" ? "income" : "expense"
    if(item.type === "E"){
        type_new_value = "Entrada";
        
    }else{
        type_new_value = "Saída";
    };
    tr.innerHTML = `
    <td id="exportarCSV">${item.date.split("T")[0].split("-").reverse().join("/")}</td>
    <td id="exportarCSV">${item.description}</td>
    <td id="exportarCSV" class="${CSSClass}">${formatavalor(item.price)}</td>
    <td id="exportarCSV">${item.category}</td>
    <td id="exportarCSV" class="${CSSClass}">${type_new_value}</td>
    </td>
    <td class="columnAction">
    <img onclick="openModal(${item.id})" src="/Vendors/img/edit.png" width='27'" alt="Alterar transação">
    <img onclick="deletarregistro(${item.id})" src="/Vendors/img/recycle-bin.png" width='27'" alt="remover transação">
    </td>
    `;
    tbody.appendChild(tr);
};

//mudar categoria
function changecategory(categoria){
    $('#categoryNew').val(categoria);
    $('#categoryNew').select2().trigger('change');

}

// Abertura do modal para atualização de um gasto
function openModal(index){
    let listaIndex = [];
    listaIndex.push(index);
    Modal_ajuste.open();
    let userId;
    const dateNew = document.querySelector("#dateNew");
    const descNew = document.querySelector("#descNew");
    const amountNew = document.querySelector("#amountNew");
    const categoryNew = document.querySelector("#categoryNew");
    const btnAtualizar = document.getElementById("btnAtualizar");
    items = getWithIndex("https://controle-de-gastos-pila.herokuapp.com/get/id/"+parseInt(index));
    items.forEach((item) => {
        dateNew.value = item.date.split("T")[0];
        descNew.value = item.description;
        //categoryNew.value = item.category;
        changecategory(item.category)
        userId = item.id_user;
        if(item.type === "E"){
            amountNew.value = item.price;
        }else{
            amountNew.value = '-'+item.price;
        };
    });
    btnAtualizar.addEventListener("click", function(){
        if(dateNew.value === "" || descNew.value === "" || amountNew.value === ""){
            alertwarning('É necessário preencher todos os campos!');
        }
        else{
            if(amountNew.value > 0){
                type_value_new = "E";
            }else{
                type_value_new = "S";
            };
            const pricefinal = amountNew.value.replace('-','');
            const params = {
                id_user: userId,
                date: dateNew.value,
                price: pricefinal,
                description: descNew.value,
                category: categoryNew.value,
                type: type_value_new
            };
            if(listaIndex.length == 1){
                const request = new XMLHttpRequest();
                request.open("PUT", "https://controle-de-gastos-pila.herokuapp.com/update/"+parseInt(listaIndex[0]), true);
                request.setRequestHeader("Content-type","application/json");
                request.onload = function(){
                    const item = JSON.parse(request.response);  
                    if(request.readyState == 4 && request.status == "200"){
                        loadItens();
                        alertsuccess("Transação atualizada com sucesso!");
                        Modal_ajuste.close();
                    }else{
                        console.error(item);
                    };
                    // console.table(item);
                }; 
                request.send(JSON.stringify(params));
                listaIndex.length = 0;
            }
        }
    });
    btnCancelar.addEventListener("click", function(){
        listaIndex.length = 0;
        // console.log(listaIndex)
        
    })
};

// Deletar um gasto
function deleteItem(index){
    const request = new XMLHttpRequest();
    request.open("DELETE", "https://controle-de-gastos-pila.herokuapp.com/delete/"+index, true);
    request.onload = function (){
        const item = JSON.parse(request.responseText);
        if(request.readyState == 4 && request.status == "200"){
            console.table(item);
            alertsuccess("Transação deletada com sucesso!");
            loadItens();
        }else{
            console.error(item);
        };
    };
    request.send(null);
};

// Fazer download do CSV
function downloadCSVFile(csv_data){
    CSVFile = new Blob(["\ufeff", csv_data], {type: "text/csv"});
    const linkDownload = document.createElement("a");
    linkDownload.download = "Pila"+mes+'-'+ano+'.csv';
    const url = window.URL.createObjectURL(CSVFile);
    linkDownload.href = url;
    linkDownload.style.display = "none";
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
};

// Clicar no botão, formar o CSV e fazer o download
function exportcsv(){
    let csv_data = [];
    csv_data.push("Relatório de transações Pila", "Data;Descrição;Valor;Categoria;Tipo");
    const rows = document.getElementsByTagName("tr");
    for(let i = 0; i < rows.length; i++){
        const cols = rows[i].querySelectorAll("#exportarCSV");
        const csvrow = [];
        for(let j = 0; j < cols.length; j++){
            csvrow.push(cols[j].innerText);
        };
        csv_data.push(csvrow.join(";"));
    };
    csv_data = csv_data.join("\n");
    downloadCSVFile(csv_data);
}

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

//notificacoes
function alertsuccess(msg) {
    iziToast.success({
        title: 'Sucesso',
        position: 'topRight',
        message: msg,
        displayMode: 1,
    }); 
}

function alerterror(msg){
    iziToast.error({
        title: 'Erro',
        position: 'topRight',
        message: msg,
        displayMode: 1,
    });
}

function alertwarning(msg) {
    iziToast.warning({
        title: 'Atenção',
        position: 'topRight',
        message: msg,
        displayMode: 1,
    });
}

function deletarregistro(item) {
    swal("Você tem certeza que quer deletar esta operação?", {
        dangerMode: true,
        closeOnClickOutside: false,
        buttons: ["Cancelar", "Deletar"],
    }).then((result) => {
        if (result) {
            deleteItem(item)
        }
    })
}

loadItens();