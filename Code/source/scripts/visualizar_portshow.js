function read_explorar_data(callback) {

    let strDados = localStorage.getItem('ArtsyExplorar');
    let Dados = {};

    var explorar_JSON_setup = null;

    if (strDados) {
        Dados = JSON.parse(strDados);
        console.log("1", Dados);
        callback(Dados)
    }
    else {
        explorar_JSON_setup = {
            'async': false,
            "dataType": "json",
            "url": "http://localhost:3000/explorar",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(explorar_JSON_setup).done(function (explorar_JSON) {
            Dados = explorar_JSON;
            console.log("2", Dados, Dados.length);
            callback(Dados)
        });

        $.ajax(explorar_JSON_setup).fail(function () {
            $.getJSON("../allJsAuth/db.json", function (explorar_JSON) {
                Dados = explorar_JSON.explorar;
                console.log("3", Dados);
                callback(Dados)
            })
        });
    }
}

function read_port_data(callback) {

    let strDados = localStorage.getItem('ArtsyPortfolios');
    let Dados = {};

    var port_JSON_setup = null;

    if (strDados) {
        Dados = JSON.parse(strDados);
        console.log("1", Dados);
        callback(Dados)
    }
    else {
        port_JSON_setup = {
            'async': false,
            "dataType": "json",
            "url": "http://localhost:3000/elementsById",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(port_JSON_setup).done(function (port_JSON) {
            Dados = port_JSON;
            console.log("2", Dados);
            callback(Dados)
        });

        $.ajax(port_JSON_setup).fail(function () {
            $.getJSON('../allJsAuth/db.json', function (port_JSON) {
                Dados = port_JSON.elementsById;
                console.log("3", Dados);
                callback(Dados)
            })
        });
    }
}

function read_user_ID() { // Tem que aplicar isso no restante do codigo
    let url = new URL(window.location.href);

    let getuserID = new URLSearchParams(url.search);
    let userID = getuserID.get('userId');
    if (userID == 0 || userID == null) { userID = 1; }

    return (userID);
}



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
    };





    function applyStoredChanges(frameContent) {
        read_port_data(function (Dados) {
            var ID = read_user_ID();


            for (let x = 0; x < Dados.length; x++) {
                if (Dados[x].userId == ID) {
                    //console.log ("Bom dia", x)

                    let elemento = Dados[x].elementId;
                    let styles = Dados[x].elementInfo;


                    let editavel = frameContent.getElementById(elemento);

                    styles.forEach(style => {

                        if (editavel.classList.contains(style.className)) {
                            if (style.style) {
                                if (style.className == 'img-edit')
                                    { editavel.src = style.value  }
                                else
                                    { editavel.style[style.style] = style.value; }
                            } else if (style.className === 'text-content') {
                                editavel.textContent = style.value;
                            }


                        }

                    });


                }
            }

        });
    }





});

