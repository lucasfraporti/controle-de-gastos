firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "home.html";
  }
})

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

function login() {
  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value
  ).then(() => {
      window.location.href = "home.html";
  }).catch(error => {
      alert(getErrorMessage(error));
  });
}

function teste(){
  alert(form.email().value + form.password().value);
}


function register() {
  const regemail = form.regemail().value;
  const regpassword = form.regpassword1().value;
  firebase.auth().createUserWithEmailAndPassword(
      regemail, regpassword
  ).then(() => {
      window.location.href = "home.html";
  }).catch(error => {
      alert(getErrorMessage(error));
  })
}


function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
      return "Usuário nao encontrado";
  }
  if (error.code == "auth/wrong-password") {
      return "Senha inválida";
  }
  return error.message;
}

const form = {
  email: () => document.getElementById("email"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  regemail: () => document.getElementById("regemail"),
  regpassword1: () => document.getElementById("regpassword1"),
  regpassword2: () => document.getElementById("regpassword2"),
} 