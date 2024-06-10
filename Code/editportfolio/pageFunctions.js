document.addEventListener('DOMContentLoaded', function () {
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
        let frameContent = frameObj.contentWindow.document;

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
            var classNames = clickedElement.classList;

            var styles = [
                { className: 'text-color-change', style: 'color', value: dataArray['colorpicker'] },
                { className: 'background-color-change', style: 'backgroundColor', value: dataArray['colorpicker'] },
                { className: 'opacity-change', style: 'opacity', value: dataArray['opacitypicker'] },
                { className: 'padding-change', style: 'padding', value: dataArray['paddingPick'] + "px"},
                { className: 'text-decoration-change', style: 'textDecoration', value: dataArray['textdecorationpicker'] },
                { className: 'text-font-change', style: 'fontFamily', value: dataArray['textfontpicker'] },
                { className: 'text-size-change', style: 'fontSize', value: dataArray['textsizepicker'] },
                { className: 'text-weight-change', style: 'fontWeight', value: dataArray['textweightpicker'] },
                { className: 'text-content', value: dataArray['textcontentpick'] },
                { className: 'border-change', style: 'border', value: dataArray['borderPick']},
            ];

            styles.forEach(function(item){
                if(classNames.contains(item.className)){
                    if (item.className === "text-font-change") {
                        const selectedFont = item.value;
                        const link = frameContent.createElement('link');
                        link.href = `https://fonts.googleapis.com/css2?family=${selectedFont}&display=swap`;
                        link.rel = 'stylesheet';
                        frameContent.head.appendChild(link);
                    }
                    if (item.className === "text-content"){
                        const textElements = frameContent.getElementsByClassName("text-content");
                        for (let i = 0; i < textElements.length; i++) {
                            textElements[i].addEventListener('click', function() {
                                this.textContent = item.value;
                                textElements[i].textContent = item.value;
                            });
                        }
                    }
                    clickedElement.style[item.style] = item.value;
                }
                console.log(`Applied ${item.style}: ${item.value}`);
            });
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

function openHelp(){
    window.open('help.html');
}
