

//logout

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/login.htm";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
  }
