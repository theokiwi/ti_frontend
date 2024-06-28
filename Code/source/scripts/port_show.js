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

function insert_port() {

    read_explorar_data(function (Dados_Explore) {
        read_port_data(function (Dados_Port) {

            for (let x = 0; x < Dados_Port.length; x++) {

                // Inserir port na página
                $('.portfolio_showcase div').append('\
                <div class="card mb-3">\
                    <div class="row g-0">\
                        <div class="col-md-9">\
                            <a href="./visualizar.html"><img src="./assets/img/img1.png" class="img-fluid rounded-start"\
                                    alt="..."></a>\
                        </div>\
                        <div class="col-md-3">\
                            <div class="card-body">\
                                <h2 class="user_name">Nome do usuário</h2>\
                                <div class="port_rating">\
                                    <div class="port_likes">\
                                        <label class="reaction_icon">\
                                            <input type="checkbox" class="likes_checkbox">\
                                            <button><i class="fa-solid fa-thumbs-up"></i></button>\
                                        </label>\
                                        <span class="port_likes_number">0</span>\
                                    </div>\
                                    <div class="port_dislikes">\
                                        <label class="reaction_icon">\
                                            <input type="checkbox" class="dislikes_checkbox">\
                                            <button><i class="fa-solid fa-thumbs-down"></i></button>\
                                        </label>\
                                        <span class="port_dislikes_number">0</span>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>');

                // Mudar link para sua versão no visualizar
                $('.col-md-9 a').eq(x).attr('href', './visualizar.html?id='
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
const valoriniciallikes="http://localhost:3000/explorar";
function valorInicial(){
    fetch(valoriniciallikes)
    .then (res=>res.json())
    .then(dados=>{
        console.log(dados);
        document.getElementById('plikes').innerText=dados[0].likes
        document.getElementById('pdislikes').innerText=dados[0].dislikes
    })
}
/*const updatelikes="http://localhost:3000/explorar";
function update(){
    fetch(updatelikes)
    .then (res=>res.json())
    .then(dados=>{
        let valor=dados[0].likes
    })
}*/
function save_explorar_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyExplorar', JSON.stringify(Dados));
}

$(document).ready(function () {

    //insert_port();
    valorInicial();
    $('portfolio_showcase').on('click', '.row .card .row .col-md-3 .card-body .port_rating .port_likes label button', function () {

    })
 
})