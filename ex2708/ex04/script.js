var perguntas = window.document.querySelectorAll('.pergunta');
var respostas = window.document.querySelectorAll('.resposta');
function alternar(index){
    let pergunta = perguntas[index];
    let resposta = respostas[index];
    pergunta.classList.toggle('ativa');
    if(resposta.style.maxHeight){
        resposta.style.maxHeight = null;
    }else{
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
    }
}