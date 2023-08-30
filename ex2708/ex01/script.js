function acender(){
    let img = window.document.querySelector('img');
    let button = window.document.querySelector('button');
    window.document.body.style.backgroundColor != "black" && button.hasAttribute("ativado")? button.removeAttribute("ativado"):button.setAttribute("ativado",1);
    button.style.backgroundColor = window.document.body.style.backgroundColor;
    window.document.body.style.backgroundColor = window.document.body.style.backgroundColor == "black"?"#eb2410":"black";
    img.style.backgroundColor = window.document.body.style.backgroundColor;
    }