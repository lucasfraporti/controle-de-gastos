function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
        localStorage.clear();
    }).catch(() => {
        alerterror('Erro ao fazer logout');
    })
}

function alerterror(msg){
    iziToast.error({
        title: 'Erro',
        position: 'topRight',
        message: msg,
    });
  }

usuario.innerHTML = localStorage.getItem('user')