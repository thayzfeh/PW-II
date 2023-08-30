function ativar(index){
    let lista = window.document.querySelector('ul');
    let items = lista.querySelectorAll('li');
    items[index].hasAttribute('ativado')?items[index].removeAttribute('ativado'):items[index].setAttribute('ativado', 1);
}