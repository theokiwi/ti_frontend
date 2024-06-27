document.addEventListener('DOMContentLoaded', function () {
     if (!localStorage.getItem("whoAmI")) {
         alert("Você não está logado e será redirecionado para a página de login");
         openLogin();
     } else {
        // O resto do código dentro do else, se a pessoa estiver logada.
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
            return;
        }

        frameObj.onload = function () {
            var frameContent = frameObj.contentWindow.document; 
            applyStoredChanges(frameContent); // Aplicar mudanças ao carregar o iframe

            const edits = frameContent.getElementsByClassName('edit');
            if (edits == null) {
                alert('ERRO - Recarregue a página. Elementos editaveis nao encontradas');
                console.log('ERROR - Nao foram encontradas elementos editaveis na pagina');
                return;
            }
            var editCount = edits.length;

            for (var i = 0; i < editCount; i += 1) {
                edits[i].addEventListener('click', editClicked);
            }

            function editClicked(event) {
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
                console.log("id do elemento que eu clickei ", clickedId);

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

                var styles = [
                    { className: 'text-color-change', style: 'color', value: dataArray['colorpicker'],  },
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

                var currentUser = localStorage.getItem("userId");
                fetch("http://localhost:3000/elementsById", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: currentUser,
                        elementClasses: Array.from(classNames),
                        whoAmI: whoDidIt,
                        elementId: clickedId,
                        elementInfo: styles
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });

                fetch('http://localhost:3000/elementsById')
                    .then(response => response.json())
                    .then(data => {
                        for (let element of data) {
                            if (element.userId === localStorage.getItem("userId")) {
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
                                    }
                                });
                            }
                        }
                    })
                    .catch(error => console.log('Não foi possível puxar item do banco de dados', error));

            }
        };

        function applyStoredChanges(frameContent) {
            fetch('http://localhost:3000/elementsById')
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        if (element.userId === localStorage.getItem("userId")) {
                            element.elementInfo.forEach(info => {
                                const targetElement = frameContent.getElementById(element.elementId);
                                if (targetElement && targetElement.classList.contains(info.className)) {
                                    if (info.className === "text-content") {
                                        targetElement.textContent = info.value;
                                    } else if (info.style === "fontFamily") {
                                        const selectedFont = info.value;
                                        const link = frameContent.createElement('link');
                                        link.href = `https://fonts.googleapis.com/css2?family=${selectedFont}&display=swap`;
                                        link.rel = 'stylesheet';
                                        frameContent.head.appendChild(link);
                                        targetElement.style.fontFamily = selectedFont;
                                    } else {
                                        targetElement.style[info.style] = info.value;
                                    }
                                    console.log(`Applied ${info.style}: ${info.value}`);
                                }
                            });
                        }
                    });
        
                })
                .catch(error => console.log('Não foi possível puxar item do banco de dados', error));

        }        
    }

    document.getElementById('downloadBtn').addEventListener('click', async function() {
        try {
            alert("ATENÇÃO -> Essa função só está disponível em navegadores CHROMIUM. Use de prefêrencia Google Chrome ou Microsoft Edge")
            const response = await fetch('http://localhost:3000/download');
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            const data = await response.json();
    
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: data.fileName,
                types: data.fileTypes.map(type => ({
                    description: type.description,
                    accept: { [type.mimeType]: [type.extension] },
                })),
            });
    
            const writableStream = await fileHandle.createWritable();
            
            const fileContent = data.documentContent;
            
            await writableStream.write(fileContent);
            
            await writableStream.close();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
    
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
    window.open('ajuda.html');
}

function openLogin(){
    alert("Você não está logado e será redirecionado para a página de login");
    if ($("#the_login_iframe").css("display") == "block") {
       $("#the_login_iframe").css("display", "none");
   }
   else {
       $("#login_iframe").attr("src", "login.html");
       $("#the_login_iframe").css("display", "block");
   }
}





