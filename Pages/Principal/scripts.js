//data atual ao inserir na tabela 
// const myDate = new Date().toLocaleDateString();
// console.log(myDate); // 29/07/2022 
// const myInput = document.querySelector("#date-input");
// myInput.value = myDate;


const Modal = {
    open() {
    document
    .querySelector('.modal-overlay')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-overlay')
    .classList
    .remove('active')
    limpacadastro()
    }
}

const Modal_ajuste = {
    open() {
    document
    .querySelector('.modal-ajuste')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-ajuste')
    .classList
    .remove('active')
    }
}

const Modal_sobre = {
    open() {
    document
    .querySelector('.modal-sobre')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-sobre')
    .classList
    .remove('active')
    }
}

const Modal_ajuda = {
    open() {
    document
    .querySelector('.modal-ajuda')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-ajuda')
    .classList
    .remove('active')
    limpaemail()
    }
}

const Modal_configuracoes = {
    open() {
    document
    .querySelector('.modal-configuracoes')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-configuracoes')
    .classList
    .remove('active')
    }
}


function limpaemail() {
    document.getElementById("ajuda").value='';
}

function limpacadastro(){
    document.querySelector("#desc").value = '';
    document.querySelector("#date-input").value = '';
    document.querySelector("#amount").value = '';
    document.querySelector("#category").value = '';
    
}


const Utils = {

    formatAmount(value) {
        value = value * 100
        return Math.round(value)
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
   
        return signal + value
    }
    
}

const Form = {
    description: document.querySelector('input#desc'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date-input'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },


    validateFields() {
        const { description, amount, date } = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Preencha todos os campos")
        }
    },

   

    formatValues () {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    submit(event) {
        event.preventDefault()

        try{
            //Form.validateFields()
            //const transaction = Form.formatValues()
            //Transaction.add(transaction)
            //Form.formatData()
            //Form.clearFields()
            //Modal.close()

        } catch (error) {
            alert(error.message)
        }
    }
    

}

// const App = {
//     init() {
//     Transaction.all.forEach(DOM.addTransaction)
    
//     DOM.updateBalance()

//     Storage.set(Transaction.all)
//     },

//     reload() {
//         DOM.clearTransactions()
//         App.init()
//     },
// }





// console.log(localStorage.getItem('finances:transactions'))

// console.log(tbody.children)



// console.log(localStorage.getItem('finances:transactions'))
// App.init()
// console.log(Transaction);