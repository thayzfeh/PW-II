let tabela = window.document.querySelector('#tabela');
let output = window.document.querySelector('div#output');
let conteudoPopup = output.children[0].children[0];
let botaoFecharPopup= window.document.querySelector('button#okPopup');
let colunas;
let botoes = window.document.querySelectorAll('div.botao');
function criarColuna(){
    colunas = window.document.querySelectorAll('div.coluna');
    let coluna = window.document.createElement('div');
    solicitarTitulo(coluna);
    coluna.classList.add("coluna");
    tabela.appendChild(coluna);
    resetarBotoes();
}
function fecharPopup(){
    output.removeAttribute('ativo');
}
function mensagemErro(){

}
function resetarBotoes(){
    colunas.length == 2? botoes[0].removeAttribute('ativo'):botoes[0].setAttribute('ativo',1);
    colunas.length < 0? botoes[1].removeAttribute('ativo'):botoes[1].setAttribute('ativo',1);
}
