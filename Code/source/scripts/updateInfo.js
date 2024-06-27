document.addEventListener('DOMContentLoaded', function () {
    // O resto do código dentro do else, se a pessoa estiver logada.
    let dataArray;

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
            var whichPortfolio = dataArray.whichport;
            localStorage.setItem("whichPortfolioAmI", whichPortfolio);
            if (!whichPortfolio) {
                console.log("Não foi possível identificar o portfólio");
            } else {
                console.log(whichPortfolio);
            }

            changePortfolio(whichPortfolio);

            var styles = [
                { className: 'text-color-change', style: 'color', value: dataArray['colorpicker'], },
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
                    whichPortAmI: whichPortfolio,
                    whoAmI: whoDidIt,
                    elementId: clickedId,
                    elementInfo: styles
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            alert("parei");
            fetch('http://localhost:3000/elementsById')
                .then(response => response.json())
                .then(data => {
                    for (let element of data) {
                        if (element.userId === localStorage.getItem("userId")) {
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
                    }
                })
                .catch(error => console.log('Não foi possível puxar item do banco de dados', error));
        }
    };

    function applyStoredChanges(frameContent) {
        const latestClickedElement = localStorage.getItem("clickedElement");
        const storedInputs = localStorage.getItem('formInputs');
        if (storedInputs) {
            const storedData = JSON.parse(storedInputs);
            const styles = [
                { className: 'text-color-change', style: 'color', value: storedData['colorpicker'] },
                { className: 'background-color-change', style: 'backgroundColor', value: storedData['colorpicker'] },
                { className: 'opacity-change', style: 'opacity', value: storedData['opacitypicker'] },
                { className: 'padding-change', style: 'padding', value: storedData['paddingPick'] + "px" },
                { className: 'text-decoration-change', style: 'textDecoration', value: storedData['textdecorationpicker'] },
                { className: 'text-font-change', style: 'fontFamily', value: storedData['textfontpicker'] },
                { className: 'text-size-change', style: 'fontSize', value: storedData['textsizepicker'] },
                { className: 'text-weight-change', style: 'fontWeight', value: storedData['textweightpicker'] },
                { className: 'text-content', value: storedData['textcontentpick'] },
                { className: 'border-change', style: 'border', value: storedData['borderPick'] },
                { className: 'img-edit', style: 'src', value: dataArray['imageurlpick']},
            ];

            const edits = frameContent.getElementsByClassName('edit');
            Array.from(edits).forEach(element => {
                styles.forEach(style => {
                    if (element.classList.contains(style.className)) {
                        if (style.style) {
                            element.style[style.style] = style.value;
                        } else if (style.className === 'text-content') {
                            element.textContent = style.value;
                        }


                    }
                });
            });
        }
    }
});

