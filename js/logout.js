function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../../home.html";
        localStorage.clear();
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

usuario.innerHTML = localStorage.getItem('user')