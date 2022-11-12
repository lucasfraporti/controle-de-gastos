

//logout

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../home.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
  }

//user id
  function showuser(){
    localStorage.setItem('id', firebase.auth().currentUser.uid);
};