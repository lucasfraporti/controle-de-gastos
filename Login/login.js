// FIREBASE AUTH - VERIFICA SE O USER TA LOGADO, E NÃO DEIXA ENTRAR NA TELA DE LOGIN
firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "Pages/Principal/index.html";
  }
})


// CONTROLA A NAVEGAÇÃO ENTRE ABAS DE CADASTRO E LOGIN
var formSignin = document.querySelector('#signin')
var formSignup = document.querySelector('#signup')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px"
    formSignup.style.left = "450px"
    btnColor.style.left = "0px"
})

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px"
    formSignup.style.left = "25px"
    btnColor.style.left = "110px"
})

//logout

function logout() {
  firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
  }).catch(() => {
      alert('Erro ao fazer logout');
  })
}


// FUNCTION DE LOGAR
function login() {
  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value
  ).then(() => {
      window.location.href = "Pages/Principal/index.html";
  }).catch(error => {
      alert(getErrorMessage(error));
  });
}

function teste(){
  alert(form.email().value + form.password().value);
}


// validando novos users
let regemail = document.querySelector('#regemail')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let password = document.querySelector('#regpassword1')
let labePassword1 = document.querySelector('#labelPassword1')
let validPassword1 = false

let confirmPassword = document.querySelector('#regpassword2')
let labePassword2 = document.querySelector('#labelPassword2')
let validPassword2 = false

regemail.addEventListener('keyup', () => {
  if(regemail.value.length <= 2){
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Insira no minimo 3 caracteres'
    regemail.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    regemail.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

password.addEventListener('keyup', () => {
  if(password.value.length <= 5){
    labePassword1.setAttribute('style', 'color: red')
    labePassword1.innerHTML = 'Insira no minimo 6 caracteres'
    password.setAttribute('style', 'border-color: red')
    validPassword1 = false
  } else {
    labePassword1.setAttribute('style', 'color: green')
    labePassword1.innerHTML = 'Senha'
    password.setAttribute('style', 'border-color: green')
    validPassword1 = true
  }
})

confirmPassword.addEventListener('keyup', () => {
  if(password.value != confirmPassword.value){
    labePassword2.setAttribute('style', 'color: red')
    labePassword2.innerHTML = 'As senhas não conferem'
    confirmPassword.setAttribute('style', 'border-color: red')
    validPassword2 = false
  } else {
    labePassword2.setAttribute('style', 'color: green')
    labePassword2.innerHTML = 'Confirmar Senha'
    confirmPassword.setAttribute('style', 'border-color: green')
    validPassword2 = true
  }
})

// FUNCTION DE CADASTRAR NOVO USER
function register() {
  const regemail = form.regemail().value;
  const regpassword = form.regpassword1().value;

  if(validEmail && validPassword1 && validPassword2){
    firebase.auth().createUserWithEmailAndPassword(
        regemail, regpassword
    ).then(() => {
        window.location.href = "Pages/Principal/index.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    })
  } else {
    alert("deu ruim gurizada");
  }
}

// RETORNAR OS ERROS DO FIREBASE
function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
      return "Usuário nao encontrado";
  }
  if (error.code == "auth/wrong-password") {
      return "Senha inválida";
  }

  return error.message;
}


//DECLARANDO AS CONST
const form = {
  email: () => document.getElementById("email"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  regemail: () => document.getElementById("regemail"),
  regpassword1: () => document.getElementById("regpassword1"),
  regpassword2: () => document.getElementById("regpassword2"),
} 