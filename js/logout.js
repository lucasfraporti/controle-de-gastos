function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.clear();
        window.location.href = "../../login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

console.log(usuario.innerHTML = localStorage.getItem('user'))

