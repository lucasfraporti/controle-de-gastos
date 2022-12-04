// FIREBASE AUTH - VERIFICA SE O USER TA LOGADO, E NÃO DEIXA ENTRAR NA TELA DE LOGIN
firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "principal.html";
  }
})

//DECLARANDO AS CONST
const form = {
  email: () => document.getElementById("email"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  regemail: () => document.getElementById("regemail"),
  regpassword1: () => document.getElementById("regpassword1"),
  regpassword2: () => document.getElementById("regpassword2"),
}

//validar e-mail
function validateEmail(emailteste) {
  var re = /\S+@\S+\.\S+/;
  return re.test(emailteste);
}

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
      window.location.href = "index.html";
  }).catch(() => {
      alert('Erro ao fazer logout');
  })
}

//login
let labelEmaillogin = document.querySelector('#labelEmaillogin')
let emaillogin = document.querySelector('#email')
let validEmaillogin = false

let labelPasswordlogin = document.querySelector('#labelPasswordlogin')
let passwordlogin = document.querySelector('#password')
let validPasswordlogin = false

emaillogin.addEventListener('keyup', () => {
  if(emaillogin.value.length < 0){
    // labelEmaillogin.setAttribute('style', 'color: red')
    // labelEmaillogin.innerHTML = 'Insira no minimo 3 caracteres'
    // emaillogin.setAttribute('style', 'border-color: red')
    // validEmaillogin = false
  } else {
    labelEmaillogin.setAttribute('style', 'color: black')
    labelEmaillogin.innerHTML = 'Email'
    emaillogin.setAttribute('style', 'border-color: green')
    validEmaillogin = true
  }
})

passwordlogin.addEventListener('keyup', () => {
  if(passwordlogin.value.length < 0){
    // labelEmaillogin.setAttribute('style', 'color: red')
    // labelEmaillogin.innerHTML = 'Insira no minimo 3 caracteres'
    // emaillogin.setAttribute('style', 'border-color: red')
    // validEmaillogin = false
  } else {
    labelPasswordlogin.setAttribute('style', 'color: black')
    labelPasswordlogin.innerHTML = 'Senha'
    passwordlogin.setAttribute('style', 'border-color: green')
    validPasswordlogin = true
  }
})

//cadastro novo user
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
  if(validateEmail(regemail.value)){
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    regemail.setAttribute('style', 'border-color: green')
    validEmail = true
  } else {
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Insira em e-mail valido'
    regemail.setAttribute('style', 'border-color: red')
    validEmail = false
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

// FUNCTION DE LOGAR
function login() {
  if (form.email().value === "" && form.password().value === ""){
    // console.log('teste')
    return labelEmaillogin.setAttribute('style', 'color: red'),labelPasswordlogin.setAttribute('style', 'color: red')
  }else{
    firebase.auth().signInWithEmailAndPassword(
      form.email().value, form.password().value
    ).then(() => {
        window.location.href = "principal.html";
        const emailuser = firebase.auth().currentUser.email;
        var user = ((emailuser.match(/(\S+)@/) || [])[1]);
        localStorage.setItem('user', user.toUpperCase());
        localStorage.setItem('id', firebase.auth().currentUser.uid);
    }).catch(error => {
        getErrorMessage(error);
    });
  }
}

function teste(){
  alert(form.email().value + form.password().value);
}

// FUNCTION DE CADASTRAR NOVO USER
function register() {
  const regemail = form.regemail().value;
  const regpassword = form.regpassword1().value;
  if(validEmail && validPassword1 && validPassword2){
    firebase.auth().createUserWithEmailAndPassword(
        regemail, regpassword
    ).then(() => {
        const emailuser = firebase.auth().currentUser.email;
        var user = ((emailuser.match(/(\S+)@/) || [])[1]);
        localStorage.setItem('user', user );
        localStorage.setItem('id', firebase.auth().currentUser.uid);  
        window.location.href = "principal.html";
    }).catch(error => {
        getErrorMessage(error);
    })
  }else{
    labelEmail.setAttribute('style', 'color: red'),
    labelEmail.innerHTML = 'Insira um e-mail valido',
    labePassword1.setAttribute('style', 'color: red'),
    labePassword1.innerHTML = 'Insira no minimo 6 caracteres',
    labePassword2.setAttribute('style', 'color: red'),
    labePassword2.innerHTML = 'Insira no minimo 6 caracteres'
  }
}

function clearafterenter(){
  labelEmail.setAttribute('style', 'color: black'),
  labePassword1.setAttribute('style', 'color: black'),
  labePassword2.setAttribute('style', 'color: black')
}

// FUNCTION RECUPERAR SENHA
function recoverPassword() {
  if (form.email().value === ""){
    // console.log('teste')
    return labelEmaillogin.setAttribute('style', 'color: red'),labelEmaillogin.innerHTML = 'Preencha o campo e-mail'
  }
  else{
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
      alert('Email enviado com sucesso');
  }).catch(error => {
      getErrorMessage(error);
  });
  }
}

// RETORNAR OS ERROS DO FIREBASE
function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
      return labelEmaillogin.setAttribute('style', 'color: red'),
      labelEmaillogin.innerHTML = 'E-mail não cadastrado',
      emaillogin.setAttribute('style', 'border-color: red');
  }
  if (error.code == "auth/wrong-password") {
      return labelPasswordlogin.setAttribute('style', 'color: red'),
      labelPasswordlogin.innerHTML = 'Senha incorreta',
      passwordlogin.setAttribute('style', 'border-color: red');
  }
  if (error.code == "auth/email-already-in-use") {
    return labelEmail.setAttribute('style', 'color: red'),
    labelEmail.innerHTML = 'E-mail já cadastrado',
    regemail.setAttribute('style', 'border-color: red');
  }
  return error.message;
};