const Modal_login = {
    open() {
    document
    .querySelector('.modal-login')
    .classList
    .add('active')
    },
    close () {
    document
    .querySelector('.modal-login')
    .classList
    .remove('active'),
    limpacampos()
    }
}


function limpacampos(){
    document.getElementById("email").value='';; 
    document.getElementById("login-button").value='';
    document.getElementById("password").value='';
    document.getElementById("regemail").value='';
    document.getElementById("regpassword1").value='';
    document.getElementById("regpassword2").value='';
};

 