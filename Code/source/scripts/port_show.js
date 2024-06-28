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
            "url": "/explorar",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(explorar_JSON_setup).done(function (explorar_JSON) {
            Dados = explorar_JSON;
            console.log("2", Dados);
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
            "url": "/elementsById",
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

function insert_port() {

    read_explorar_data(function (Dados_Explore) {
        read_port_data(function (Dados_Port) {

            for (let x = 0; x < Dados_Port.length; x++) {

                // Inserir port na página
                $('.layout_ordenar').append('\
                <a href="./visualizar.html"><img class="layout_img" src="./assets/img/img1.png" alt=""></a>');

                // Mudar link para sua versão no visualizar
                $('.layout_ordenar a').eq(x).attr('href', './visualizar.html?id='
                    .concat(Dados_Port[x].id).concat('?userId=').concat(Dados_Port[x].userId));

                // Conferir se há ou não um respectivo par nos dados do Explorar
                let user_found = false; let id_found = false; let y = 0;
                while ((!user_found || !id_found) && y < Dados_Explore.length) {
                    user_found = false; id_found = false;
                    if (Dados_Explore[y].id == Dados_Port[x].id) { id_found = true; }
                    if (Dados_Explore[y].userId == Dados_Port[x].userId) { user_found = true; }
                    y++;
                }
                // Se não houver, adicionar
                if (y == Dados_Explore.length) {
                    let new_port = {
                        "id": Dados_Port[x].id,
                        "userId": Dados_Port[x].userId,
                        "likes": 0, "dislikes": 0
                    }

                    Dados_Explore.push(new_port);
                }
                // Se houver
                else {
                    // Nothing, I guess
                }

                // Adicionar valores de like e dislike
                /*
                $(Insira aqui o local onde estão os likes).text(Dados_Explore[y].likes)
                $(Insira aqui o local onde estão os dislikes).text(Dados_Explore[y].dislikes)
                */
            }



            save_explorar_data(Dados_Explore);
        });
    });
}

function save_explorar_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyExplorar', JSON.stringify(Dados));
}

$(document).ready(function () {
    insert_port();
})