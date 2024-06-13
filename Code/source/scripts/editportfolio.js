
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem("whoAmI")) {
        alert("Você não está logado e será redirecionado para a página de login")
    }
    //Depois todo o resto da função dentro de um else, pra ele não rodar nada se a pessoa não estiver logada.
    let dataArray;

    const form = document.querySelector('#formEl');

    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();


        const formData = new FormData(form);

        const inputs = Object.fromEntries(formData);
        console.log(inputs);
        const inputsJSON = JSON.stringify(inputs);
        localStorage.setItem('formInputs', inputsJSON);

        const jsonString = localStorage.getItem('formInputs');
        dataArray = JSON.parse(jsonString);
        console.log("coisa" + dataArray);


    });

    var frameObj = document.getElementById('output');
    if (frameObj == null) {
        alert('ERRO - Recarregue a página. Iframe nao encontrado.');
        console.log('ERROR - Nao foi encontrado um iframe contendo um template editavel');
    }

    frameObj.onload = function () {
        var frameContent = frameObj.contentWindow.document;

        const edits = frameContent.getElementsByClassName('edit');
        if (edits == null) {
            alert('ERRO - Recarregue a página. Elementos editaveis nao encontradas');
            console.log('ERROR - Nao foram encontradas elementos editaveis na pagina');
        }
        var editCount = edits.length;

        for (var i = 0; i < editCount; i += 1) {
            edits[i].addEventListener('click', editClicked);
        }

        function editClicked(event) {
            console.log('Reconheci que clickou a div');
            event.stopPropagation();
            console.log(event);

            var clickedElement = event.target;
            if (!clickedElement) {
                console.log("Elemento clickado não encontrado");
            }

            var clickedId = clickedElement.id;
            if (!clickedId) {
                console.log("ElementoID clickado não encontrado");
            }
            console.log("id do elemento que eu clickei ");

            var whoDidIt = localStorage.getItem("whoAmI");
            if (!whoDidIt) {
                console.log("Usuario dono da ação não encontrado");
            }

            var classNames = clickedElement.classList;
            if (!classNames) {
                console.log("Não foi possível extrair o nome das classes");
            }

            const jsonString = localStorage.getItem('formInputs');
            dataArray = JSON.parse(jsonString);
            whichPortfolio = dataArray.whichport;
            localStorage.setItem("whichPortfolioAmI", whichPortfolio);
            if (!whichPortfolio) {
                console.log("Não foi possível identificar o portfólio");
            }
            else {
                console.log(whichPortfolio);
            }
            changePortfolio(whichPortfolio);

            var styles = [
                { className: 'text-color-change', style: 'color', value: dataArray['colorpicker'] },
                { className: 'background-color-change', style: 'backgroundColor', value: dataArray['colorpicker'] },
                { className: 'opacity-change', style: 'opacity', value: dataArray['opacitypicker'] },
                { className: 'padding-change', style: 'padding', value: dataArray['paddingPick'] + "px" },
                { className: 'text-decoration-change', style: 'textDecoration', value: dataArray['textdecorationpicker'] },
                { className: 'text-font-change', style: 'fontFamily', value: dataArray['textfontpicker'] },
                { className: 'text-size-change', style: 'fontSize', value: dataArray['textsizepicker'] },
                { className: 'text-weight-change', style: 'fontWeight', value: dataArray['textweightpicker'] },
                { className: 'text-content', value: dataArray['textcontentpick'] },
                { className: 'border-change', style: 'border', value: dataArray['borderPick'] },
            ];

            fetch("http://localhost:3000/elementsById", {
                method: "POST",
                body: JSON.stringify({
                    elementClasses: Array.from(classNames),
                    whichPortAmI: whichPortfolio,
                    whoAmI: whoDidIt,
                    elementId: clickedId,
                    elementInfo: styles
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })

            fetch('http://localhost:3000/elementsById')
                .then(response => response.json())
                .then(data => {
                    for (let element of data) {
                        alert("chamei update pageinfo");
                        element.elementInfo.forEach(info => {
                            if (element.elementClasses.includes(info.className)) {
                                if (info.style === "fontFamily") {
                                    const selectedFont = info.value;
                                    const link = frameContent.createElement('link');
                                    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont}&display=swap`;
                                    link.rel = 'stylesheet';
                                    frameContent.head.appendChild(link);
                                } else if (info.className === "text-content") {
                                    const textElement = frameContent.getElementById(element.elementId);
                                    textElement.textContent = info.value;
                                    textElement.addEventListener('click', function () {
                                        textElement.textContent = info.value;
                                    });
                                }
                                clickedElement.style[info.style] = info.value;
                                console.log(`Applied ${info.style}: ${info.value}`);
                                alert("Acabei de aplicar, ver log");
                            }
                        });
                    }
                })
                .catch(error => console.log('Não foi possível puxar item do banco de dados', error));

        }
    };
});

function hideMenuItems() {
    var submenuItems = document.querySelectorAll('.submenuItems');

    submenuItems.forEach(function (submenuItem) {
        if (submenuItem.style.display !== 'none') {
            submenuItem.style.display = 'none';
        }
        else if (submenuItem.style.display == 'none') {
            submenuItem.style.display = 'block';
        }
    });
}

function openHelp() {
    window.open('help.html');
}

function changePortfolio(whichPort) {
    console.log("rodei o change portfolio");
    if (localStorage.getItem("whichPortfolioAmI") !== whichPort) {
        let result = confirm("Aperte OK para confirmar que deseja trocar de portfólio");
        if (result === true) {
            //substituir o iframe
            switch (whichPort) {
                case '3d':
                    // document.getElementById('output').src = loc;
                    alert("Portfólio ainda não disponível.");
                    break;
                case 'VideoEdit':
                    // document.getElementById('output').src = loc;
                    alert("Portfólio ainda não disponível.");
                    break;
                case '2dTrad':
                    document.getElementById('output').src = "../assets/template/Template_2DTradicional/2DTradicional.html";
                    break;
                case '2dDigital':
                    // document.getElementById('output').src = loc;
                    alert("Portfólio ainda não disponível.");
                    break;
                case 'Photo':
                    alert("Portfólio ainda não disponível. Recarregue a p");
                    // document.getElementById('output').src = loc;
                    break;
            }
        }
        else {
            console.log("Não foram aceitas as condições");
        }
    }
}

