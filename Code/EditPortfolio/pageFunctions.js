//Salva o input do usuario na pagina

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#formEl");

    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        const formData = new FormData(form);

        const inputs = Object.fromEntries(formData);
        console.log(inputs);

        const inputsJSON = JSON.stringify(inputs);
        localStorage.setItem('formInputs', inputsJSON);
    })

    

    var frameObj = document.getElementById("output");
    if(frameObj == null){
        alert("ERRO - Recarregue a página. Iframe nao encontrado.")
        console.log("ERROR - Nao foi encontrado um iframe contendo um template editavel");
    }
    //Tudo que tem que acontecer dentro do frame vem aqui dentro
    frameObj.onload = function(){
        let frameContent = frameObj.contentWindow.document; //isso aqui retorna o conteudo html dentro do iframe


        //Aqui ele ta recolhendo todas as divs da pagina
        const edits = frameContent.getElementsByClassName("edit");
        if(edits == null){
            alert("ERRO - Recarregue a página. Elementos editaveis nao encontradas");
            console.log("ERROR - Nao foram encontradas elementos editaveis na pagina");
        }
        var editCount = edits.length;
        console.log(`edits encontradas ${editCount}`);
    
    
        //Percorrendo todas as divs e chamando o evento para as clickadas
        for (var i = 0; i < editCount; i += 1) {
            edits[i].addEventListener("click", editClicked);
            console.log(edits);
        }
    
        function editClicked(event) {
            console.log("Reconheci que clickou a div");
            event.stopPropagation();
            console.log(event);

            var clickedElement = event.target;  
            var classNames = clickedElement.classList;

            //Em styles eu to guardando tudo que vai ser injetado no Iframe
            var styles = [
                {className: "text-color-change", style: "color", value: "blue"},
                {className: "background-color-change", style: "backgroundColor", value: "blue" },
                {className: "text-size-change", style: "fontSize", value: "100px" },
                {className: "text-font-change", style: "fontFamily", value: "Arial" },
                {className: "text-decoration-change", style: "textDecoration", value: "underline" },
                {className: "text-weight-change", style: "fontWeight", value: "bold"},
                {className: "opacity-change", style: "opacity", value: "0.5"},
                {className: "border-change", style: "border", value: "1px solid black"},
                {className: "padding-change", style: "padding", value: "20px"},




 
            ]
            
            styles.forEach(function(item){
                if(classNames.contains(item.className)){
                    clickedElement.style[item.style] = item.value;
                }
                console.log(`Applied ${item.style}: ${item.value}`);

            });
            // if(clickedElement.classList.contains("text-color-change")){
            //     event.target.style.color = "blue";
            // }
            // if(clickedElement.classList.contains("background-color-change")){
            //     event.target.style.backgroundColor = "blue";
            // }
            // event.target.style.
    
            // const color = JSON.parse(localStorage.getItem('colorpicker'));
            // console.log(color);
            // if (color) {
            //     event.target.style.backgroundColor = blue;
            // } else {
            //     console.log('No color found in localStorage');
            // }
        }
    }
   
});


//Faz o menu expandir e encolher

function hideMenuItems() {
    var submenuItems = document.querySelectorAll('.submenuItems');

    submenuItems.forEach(function (submenuItem) {
        if (submenuItem.style.display !== 'none') {
            submenuItem.style.display = 'none';

        }
        else if (submenuItem.style.display == 'none') {
            submenuItem.style.display = 'block';
        };
    });
}

/*
COMENTARIOS:
O plano é injetar codigo nas divs selecionadas dentro do Iframe
Usando os parametros do local storage
Essa injeção é uma atualização ao vivo do CSS da página
*/