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


        for (let x = 0; x < Dados_Explore.length; x++) {

            // Inserir port na página
            $('.row').eq(0).append('\
                    <div class="card mb-3">\
                <div class= "row g-0" >\
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
                                            <button value="0"><i class="fa-solid fa-thumbs-up"></i></button>\
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

            
        }

    });
}

function valorInicial() {
    read_explorar_data(function (Dados_Explore) {

        //console.log ("Expo init", Dados_Explore);

        for (let x = 0; x < Dados_Explore.length; x = x + 1) {

            // Mudar link para sua versão no visualizar
            $('.col-md-9 a').eq(x).attr('href', './visualizar.html?id='
                .concat(Dados_Explore[x].id).concat('?userId=').concat(Dados_Explore[x].userId));


            // Mudar imagem para uma aleatória
            var number = 1 + Math.floor(Math.random() * 6);
            if (number == 1) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img1.png'); }
            if (number == 2) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img2.png'); }
            if (number == 3) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img5.png'); }
            if (number == 4) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/PortfolioPreview.png'); }
            if (number == 5) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/Port_Explo1.jpg'); }
            if (number == 6) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/Port_Explo2.jpg'); }


            // Mudar nome do usuário
            $('.user_name').eq(x).text(Dados_Explore[x].username);

            // Adicionar valores de like e dislike
            $('.port_likes_number').eq(x).text(Dados_Explore[x].likes)
            $('.port_dislikes_number').eq(x).text(Dados_Explore[x].dislikes)

        }

    });
}

function insert_new_data() {
    read_explorar_data(function (Dados_Explore) {
        read_port_data(function (Dados_Port) {

            console.log("Port new", Dados_Port);
            console.log("Expo new", Dados_Explore);

            for (let x = 0; x < Dados_Port.length; x = x + 1) {

                // Conferir se há ou não um respectivo par nos dados do Explorar
                let user_found = false; let id_found = false; let y = 0;
                // Esse é o sistema de busca e confirmação mais correto. Porém tá dando bug, então vai o mais simples
                /* 
                while ((!user_found || !id_found) && y < Dados_Explore.length) {
                    user_found = false; id_found = false;
                    if (Dados_Explore[y].id == Dados_Port[x].id) { id_found = true; }
                    if (Dados_Explore[y].userId == Dados_Port[x].userId) { user_found = true; }
                    y++;
                }   */
                while (!id_found && y < Dados_Explore.length) {
                    if (Dados_Explore[y].id == Dados_Port[x].id) { id_found = true; }
                    y++;
                }

                // Se não houver, adicionar
                if (y == Dados_Explore.length) {
                    let new_port = {
                        "id": Dados_Port[x].id,
                        "userId": Dados_Port[x].userId,
                        "username": Dados_Port[x].whoAmI,
                        "likes": 0, "dislikes": 0
                    }

                    Dados_Explore.push(new_port);
                }
                // Se houver
                else {
                    // Nothing, I guess
                }

            }

            console.log("Expo new after", Dados_Explore);
            save_explorar_data(Dados_Explore);

        });
    });
}




function save_explorar_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyExplorar', JSON.stringify(Dados));
}

$(document).ready(function () {

    localStorage.clear()



    insert_new_data();
    insert_port();
    valorInicial();




    // Like
    $('portfolio_showcase').on('click', '.row .card .row .col-md-3 .card-body .port_rating .port_likes label button', function () {
        
        // If para caso já esteja pressionado essa
          // Se sim
            // Desmarca
            // Atualiza número e ícone
          // Se não
            // Caso o outro esteja selecionado
              // Se sim
                // Desmarca o outro e atualiza seu numero e icone
                // Marca esse e atualiza seu numero e icone
              // Se não
                // Selecionar a checkbox e marcar ela
                // Atualizar o número e o ícone (cor)

    });
    // Dislike
    $('portfolio_showcase').on('click', '.row .card .row .col-md-3 .card-body .port_rating .port_likes label button', function () {

    });




    $('#btnordenar').click(function () {

    });

})