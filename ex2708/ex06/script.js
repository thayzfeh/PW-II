let displayOutput = window.document.querySelector('div.output');
let mensagemErro = window.document.querySelector('p#mensagemErro');
var erros= [];
function estaVazio(input){
    return input == '';
}
function temNumero(input){
    return /\d/.test(input);

}
function temEspaco(input){
    input = input.trim();
    input = input.split(" ");
    return input.length >1;
}
function mostrarErro(erro){
    if(!mensagemErro.innerHTML.includes(erro)){
    mensagemErro.innerHTML += `${erro}<br>`;
    }
}
function fecharPopup(){
    displayOutput.removeAttribute('ativado');
    setTimeout(() => {mensagemErro.innerHTML = ''}, 500);
}
function resetarErros(inputs){
    erros = [];
    inputs.forEach(input => {
        erros.push(false);
        input.removeAttribute('erro');
    }); 
    return erros;
}
function verificarNome(index, input){
    let nomeCampo = index == 0? 'nome':'sobrenome';
    if(temNumero(input)){
        mostrarErro(`Seu ${nomeCampo} não pode possuir números.`);
        erros[index] = true;
    }
    if(temEspaco(input)){
        mostrarErro(`Por favor, insira apenas um nome no campo de ${nomeCampo}.`);
        erros[index] = true;
    }
}
function verificarEmail(index, input){
    if(!estaVazio(input)){
        if(temEspaco(input)){
            mostrarErro('Seu e-mail não pode pussuir espaços.');
            erros[index] = true;
        }
        if(!input.includes('@')){
            mostrarErro('Seu e-mail deve conter @.');
            erros[index] = true;
        }
        if(!input.endsWith('.com') && !input.endsWith('.br')){
            mostrarErro('Seu e-mail deve terminar com .com ou .br');
            erros[index] = true;
        }
    }
}
function verificarTelefone(index, input){
    let regex = /^\s*([(]\d{2}[)]|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
    if(!regex.test(input) && !estaVazio(input)){
        mostrarErro('Formate o número de telefone para o descrito dentro do campo.');
        erros[index] =true;
    }
}
function verificar(){
    displayOutput.removeAttribute('sucesso');
    let inputs = window.document.querySelectorAll('input.input');
    let currentIndex = 0;
    erros = resetarErros(inputs);
    do{
        let input = inputs[currentIndex].value;
        if(estaVazio(input)){
            mostrarErro('Não deixe nenhum campo vazio.');
            erros[currentIndex] = true;
        }
        switch(currentIndex){
            case 0: case 1:
                verificarNome(currentIndex, input);
                break;         
            case 2:
                verificarEmail(currentIndex, input);
                break;
            case 3:
                verificarTelefone(currentIndex, input);
        }    
        currentIndex++;
    }while(currentIndex < inputs.length);
    if(erros.includes(true)){
        displayOutput.children[0].children[0].innerHTML = 'ERRO!';
        displayOutput.setAttribute('ativado',1);
    for(let i = 0; i<erros.length; i++){
        if(erros[i]){
            inputs[i].setAttribute('erro',1);
        }
    }
    }else{
        displayOutput.children[0].children[0].innerHTML = 'SUCESSO!';
        displayOutput.setAttribute('sucesso', 1);
        displayOutput.setAttribute('ativado', 1);
    }
    
}
