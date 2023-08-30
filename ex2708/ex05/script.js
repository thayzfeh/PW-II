var imagens = window.document.querySelectorAll('.imgnav');
var divPrincipal =window.document.querySelector('div.img');
var imagemPrincipal = window.document.querySelector('#imgMain');
var srcImagens =[];
var estaAtivo = (element) => element == window.document.querySelector('#imgMain').src;
function mostrarAnterior(){
    if(srcImagens.findIndex(estaAtivo) != -1){
        imagens[srcImagens.findIndex(estaAtivo)].classList.remove('ativo');
    }
}
function anterior(){
    mostrarAnterior();
    imagemPrincipal.src = srcImagens.findIndex(estaAtivo) == 0? srcImagens[srcImagens.length-1]:srcImagens[srcImagens.findIndex(estaAtivo)-1];
    imagens[srcImagens.findIndex(estaAtivo)].classList.add('ativo');
}
function proxima(){
    mostrarAnterior();
    imagemPrincipal.src = srcImagens.findIndex(estaAtivo) == srcImagens.length-1? srcImagens[0]:srcImagens[srcImagens.findIndex(estaAtivo)+1];
    imagens[srcImagens.findIndex(estaAtivo)].classList.add('ativo');
}

for( i = 0; i <imagens.length; i++){
    imagens[i].style.order = i;
    srcImagens.push(imagens[i].src);
    imagens[i].addEventListener("click", function() {
        divPrincipal.classList.add('ativo');
        mostrarAnterior();
        imagemPrincipal.src = this.src;
        this.classList.add('ativo');
    })
}