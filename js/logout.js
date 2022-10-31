

//logout

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/login.htm";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
  }

//user id
  function showuser(){
    localStorage.setItem('id', firebase.auth().currentUser.uid);
};