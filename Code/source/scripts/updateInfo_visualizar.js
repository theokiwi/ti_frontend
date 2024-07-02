function read_explorar_data(callback) {

    let strDados = localStorage.getItem('ArtsyExplorar');
    let Dados = {};

    var explorar_JSON_setup = null;

    if (strDados) {
        Dados = JSON.parse(strDados);
        console.log("1_E", Dados);
        callback(Dados)
    }
    else {
        explorar_JSON_setup = {
            'async': false,
            "dataType": "json",
            "url": "/explorar",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(explorar_JSON_setup).done(function (explorar_JSON) {
            Dados = explorar_JSON;
            console.log("2_E", Dados);
            callback(Dados)
        });

        $.ajax(explorar_JSON_setup).fail(function () {
            $.getJSON("../allJsAuth/db.json", function (explorar_JSON) {
                Dados = explorar_JSON.explorar;
                console.log("3_E", Dados);
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
        console.log("1_P", Dados);
        callback(Dados)
    }
    else {
        port_JSON_setup = {
            'async': false,
            "dataType": "json",
            "url": "/elementsById",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(port_JSON_setup).done(function (port_JSON) {
            Dados = port_JSON;
            console.log("2_P", Dados);
            callback(Dados)
        });

        $.ajax(port_JSON_setup).fail(function () {
            $.getJSON('../allJsAuth/db.json', function (port_JSON) {
                Dados = port_JSON.elementsById;
                console.log("3_P", Dados);
                callback(Dados)
            })
        });
    }
}

/*
function read_page_userID() {
    let url = new URL(window.location.href);

    let getuserID = new URLSearchParams(url.search);
    let userID = getuserID.get('userId');
    if (userID == 0 || userID == null) { userID = "00a5"; }

    return (userID);
}


function read_page_portID() {
    let url = new URL(window.location.href);

    let getportID = new URLSearchParams(url.search);
    let portID = getportID.get('id');
    if (portID == 0 || portID == null) { portID = "89fe"; }

    return (portID);
}
*/

function read_page_ID() {

    read_explorar_data(function (Dados_Explore) {

        let url = new URL(window.location.href);

        let getuserID = new URLSearchParams(url.search);
        let userID = getuserID.get('userId');
        if (userID == 0 || userID == null) { userID = "00a5"; }

        let getportID = new URLSearchParams(url.search);
        let portID = getportID.get('id');
        if (portID == 0 || portID == null) { portID = "89fe"; }

        let user_found = false; let id_found = false; let x = 0;
        while (!user_found || !id_found) {
            user_found = false; id_found = false;
            if (Dados_Explore[x].id == portID) { id_found = true; }
            if (Dados_Explore[x].userId == userID) { user_found = true; }
            x++;
        }

        localStorage.setItem('ArtsyVisualizarID', x-1);
    });
}

function applyStoredChanges(frameContent) {
    
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
            { className: 'img-edit', style: 'src', value: dataArray['imageurlpick'] },
        ];
    }
    

    read_port_data(function (Dados_Port) {
        

        // Achar qual portfolio é o atual
        read_page_ID();
        let currentPort = localStorage.getItem('ArtsyVisualizarID');
        let things_to_apply = Dados_Port[currentPort].elementInfo;

        console.log(things_to_apply);

        // Aplicar edições
        const edits = frameContent.getElementsByClassName('edit');
        Array.from(edits).forEach(element => {
            things_to_apply.forEach(style => {
                if (element.classList.contains(style.className)) {
                    if (style.style) {
                        element.style[style.style] = style.value;
                    } else if (style.className === 'text-content') {
                        element.textContent = style.value;
                    }
                }
            });
        });

    });
}

document.addEventListener('DOMContentLoaded', () => { // Felipe
    read_explorar_data((Dados_Explore) => {
        console.log("TEST: -> ", Dados_Explore)
        let user = {};
        const url = new URL(location);
        const params = new URLSearchParams(url.search);
        for(let element of Dados_Explore){
            if(element.id == params.get('userId')){
                user = element;
                break;
            }
        }
        document.querySelector("#user-name").innerHTML = user.username;
        read_port_data((Dados_Port) => {
            console.log(Dados_Port)
        })
    })

});

/*
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
});
*/

