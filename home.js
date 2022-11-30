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
    limpacampos(),
    clearafterenter()
    }
}


function limpacampos(){
    document.getElementById("email").value=''; 
    document.getElementById("password").value='';
    document.getElementById("regemail").value='';
    document.getElementById("regpassword1").value='';
    document.getElementById("regpassword2").value='';
    labelEmaillogin.setAttribute('style', 'color: black');
    labelPasswordlogin.setAttribute('style', 'color: black');
    labelEmail.setAttribute('style', 'color: black'),
    document.querySelector('#labelEmail').value='';
    document.querySelector('#labelPassword1').value='';
    document.querySelector('#labelPassword2').value='';
    labePassword1.setAttribute('style', 'color: black'),
    labePassword2.setAttribute('style', 'color: black')
};

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#logar");
      
      btn.click();
    
    }
  });

  document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#cadastrar");
      
      btn.click();
    
    }
  });
