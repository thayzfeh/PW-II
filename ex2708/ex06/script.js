let displayOutput = window.document.querySelector('div.output');
let mensagemErro = window.document.querySelector('p#mensagemErro');
function temNumero(input){
    return /\d/.test(input);

}
function temEspaco(input){
    input = input.trim();
    input = input.split(" ");
    return input.length >1;
}
function mostrarErro(erro){
    mensagemErro.innerHTML += `${erro}<br>`;
}
function fecharPopup(){
    displayOutput.removeAttribute('ativado');
    mensagemErro = '';
}
function verificar(){
    let inputs = window.document.querySelectorAll('input.input');
    let currentIndex = 0;
    let erro = false;
    do{
        let input = inputs[currentIndex].value;
        switch(currentIndex){
            case 0:
                if(temNumero(input)){
                    mostrarErro('Seu nome não pode possuir números.');
                }
                if(temEspaco(input)){
                    mostrarErro('Por favor, insira apenas um nome no campo de nome.');
                }
        }
        displayOutput.setAttribute('ativado',1);    
        currentIndex++;
    }while(!erro && currentIndex < inputs.length-1);
    
}
