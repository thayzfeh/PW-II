let tabela = window.document.querySelector('#tabela');
let output = window.document.querySelector('div#output');
let conteudoPopup = output.children[0].children[0];
let botaoFecharPopup= window.document.querySelector('button#okPopup');
let colunas;
let conteudoColunas;
let botoes = window.document.querySelectorAll('div.botao');
function fecharPopup(){
    //função que fecha o popup
    output.removeAttribute('ativo');
}
function resetarBotoes(){
    //função que reseta os botões de criar coluna e criar item. CASO existam 3 colunas, o botão de criar colunas some. CASO não existam colunas, o botão de criar itens some.
    colunas = window.document.querySelectorAll('div.coluna');
    colunas.length == 3? botoes[0].removeAttribute('ativo'):botoes[0].setAttribute('ativo',1);
    colunas.length == 0? botoes[1].removeAttribute('ativo'):botoes[1].setAttribute('ativo',1);
}
function solicitarTitulo(tipo){
    //função que recebe o tipo de elemento que está se criando, abre um popup e solicita ao usuário que ele digite um título para o elemento. CASO o elemento for um item, dá a possibilidade do usuário personalizar a cor do item.
    if(tipo == 'item' && colunas[0].children[1].children.length >=5){
        mensagemErro();
    }else{
        conteudoPopup.innerHTML = `<h1>Por favor, adicione um título: </h1>`;
        let input = window.document.createElement("input");
        input.type = 'text';
        input.maxLength = 10;
        conteudoPopup.appendChild(input);
        if(tipo == 'item'){
            let inputCor = window.document.createElement('input');
            inputCor.type = 'color';
            let p = window.document.createElement('p');
            p.innerText =`Escolha a cor para seu item:`;
            conteudoPopup.appendChild(p);
            conteudoPopup.appendChild(inputCor);
            escolherTipoPopup('item');
            botaoFecharPopup.setAttribute('onclick', "adicionarItem()");
        }else{
            escolherTipoPopup('coluna');
            botaoFecharPopup.setAttribute('onclick', "adicionarColuna()")
        }
        output.setAttribute('ativo', 1);
    }
}
function adicionarColuna(){
    //função que adiciona uma coluna com base no título recebido pelo usuário. Também adiciona um botão capaz de excluir a coluna e cria um listener para o drag and drop.
    fecharPopup();
    colunas = window.document.querySelectorAll('div.coluna');
    let coluna = window.document.createElement('div');
    let input = conteudoPopup.children[1];
    let elementosColuna = window.document.createElement('div');
    elementosColuna.classList.add("elementosColuna");
    elementosColuna.addEventListener('dragover',(e) =>{
        const dragging = document.querySelector('.dragging');
        const applyAfter = getNewPosition(elementosColuna, e.clientY)

        if(applyAfter){
            applyAfter.insertAdjacentElement("afterend", dragging);
        }else{
            elementosColuna.prepend(dragging);
        }
    })
    let remover = criarRemover();
    coluna.innerHTML = `<h1>${input.value}</h1>`;
    coluna.appendChild(elementosColuna);
    coluna.appendChild(remover)
    coluna.classList.add("coluna");
    tabela.appendChild(coluna);
    conteudoColunas = window.document.querySelectorAll(".elementosColuna");
    resetarBotoes();
}
function removerColuna(elemento){
    //função que recebe como parâmetro o botão pressionado e exclui a coluna ou item que ele pertence.
    let colunaSelecionada = elemento.parentElement;
    colunaSelecionada.parentNode.removeChild(colunaSelecionada);
    resetarBotoes();
}
function adicionarItem(){
    //função que adiciona um item com base no título e cor recebido pelo usuário. Também adiciona um botão capaz de excluir o item. Também adiciona a classe draggable.
    fecharPopup()
    let input = conteudoPopup.children[1];
    let remover = criarRemover();
    let item = window.document.createElement('div');
    item.setAttribute('draggable','true');
    item.classList.add('item');
    item.style.backgroundColor = conteudoPopup.children[3].value;
    item.innerHTML = `<p>${input.value}</p>`;
    item.appendChild(remover);
    colunas[0].children[1].appendChild(item);
}
function mensagemErro(){
    //função que abre um popup com uma mensagem de erro pois existem 5 itens na primeira coluna, impossibilitando a criação de outros itens.
    escolherTipoPopup('erro');
    conteudoPopup.innerHTML = `<h1>ERRO!</h1><p>Você tem muitos elementos na primeira coluna, por favor, remova alguns elementos para prosseguir.</p>`;
    botaoFecharPopup.setAttribute('onclick', "fecharPopup()");
    output.setAttribute('ativo',1);
}
function criarRemover(){
    //função que cria um botão para a exclusão do elemento pai e retorna o botão.
    let remover = window.document.createElement('button');
    remover.innerText = "X";
    remover.setAttribute('onclick', 'removerColuna(this)');
    remover.classList.add('remover');
    return remover;
}
function escolherTipoPopup(tipo){
    //função que reseta os atributos e adiciona um atributo passado como parâmetro.
    output.children[0].removeAttribute('erro');
    botaoFecharPopup.removeAttribute('erro');
    output.children[0].removeAttribute('item');
    botaoFecharPopup.removeAttribute('item');
    output.children[0].removeAttribute('coluna');
    botaoFecharPopup.removeAttribute('coluna');
    output.children[0].setAttribute(tipo, 1);
    botaoFecharPopup.setAttribute(tipo, 1);
}
document.addEventListener("dragstart", (e) =>{
    e.target.classList.add('dragging');
})
document.addEventListener("dragend", (e)=>{
    e.target.classList.remove('dragging');
})

function getNewPosition(column, posY){
    const cards = column.querySelectorAll('.item:not(.dragging)');
    let result;
    for(let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height /2;
        if(posY >= boxCenterY) result = refer_card;
    }
    return result
}