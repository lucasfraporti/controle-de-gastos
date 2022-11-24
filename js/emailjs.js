emailjs.init("zLZju1IbGGqFx5iCh")

//enviar email

function sendmailhelp() {

    emailjs.send("service_gec7wcf", "template_5cqt6sp", {
      to_name: "Pila",
      from_name: iduser,
      message: Ajuda.value,

    });
    Modal_ajuda.close();
    alertsuccess("Solicitação enviada com sucesso!");

}

function sendmailsugestao() {
    emailjs.send("service_gec7wcf", "template_5cqt6sp", {
      to_name: "Pila",
      from_name: iduser,
      message: Sugestao.value,
 
    });
    Modal_configuracoes.close();
    alertsuccess("Sugestão enviada com sucesso!");

}