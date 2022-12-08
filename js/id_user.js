const iduser = window.localStorage.getItem('id');

const Ajuda = document.querySelector("#ajuda");
const Sugestao = document.querySelector("#sugestão");

function alertsuccess(msg) {
  iziToast.success({
      title: 'Sucesso',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  }); 
}

function alerterror(msg){
  iziToast.error({
      title: 'Erro',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  });
}

function alertwarning(msg) {
  iziToast.warning({
      title: 'Atenção',
      position: 'topRight',
      message: msg,
      displayMode: 1,
  });
}

function deletarregistro(item) {
  swal("Você tem certeza que quer deletar esta operação?", {
      dangerMode: true,
      closeOnClickOutside: false,
      buttons: ["Cancelar", "Deletar"],
  }).then((result) => {
      if (result) {
          deleteItem(item)
      }
  })
}