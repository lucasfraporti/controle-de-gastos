

//logout

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
  }
