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
                                            <button value="0"><i class="fa-solid fa-thumbs-down"></i></button>\
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

        console.log("Expo init", Dados_Explore);

        for (let x = 0; x < Dados_Explore.length; x = x + 1) {

            // Mudar link para sua versão no visualizar
            $('.col-md-9 a').eq(x).attr('href', './visualizar.html?userId='.concat(Dados_Explore[x].userId));


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

            // Aplicar valor no botão
            $('.port_likes .reaction_icon button').eq(x).attr('value', x);
            $('.port_dislikes .reaction_icon button').eq(x).attr('value', x);

            // Registrar se o botão estiver clicado
            if (Dados_Explore[x].liked == true) {
                mark_like_button(x);
            }
            else if (Dados_Explore[x].disliked == true) {
                mark_dislike_button(x)
            }
        }

    });
}

function valorOrganizado(Dados) {

    for (let x = 0; x < Dados.length; x = x + 1) {

        // Mudar link para sua versão no visualizar
        $('.col-md-9 a').eq(x).attr('href', './visualizar.html?userId='.concat(Dados[x].userId));

        // Mudar imagem para uma aleatória
        var number = 1 + Math.floor(Math.random() * 6);
        if (number == 1) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img1.png'); }
        if (number == 2) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img2.png'); }
        if (number == 3) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/img5.png'); }
        if (number == 4) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/PortfolioPreview.png'); }
        if (number == 5) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/Port_Explo1.jpg'); }
        if (number == 6) { $('.col-md-9 a img').eq(x).attr('src', './assets/img/Port_Explo2.jpg'); }


        // Mudar nome do usuário
        $('.user_name').eq(x).text(Dados[x].username);

        // Adicionar valores de like e dislike
        $('.port_likes_number').eq(x).text(Dados[x].likes)
        $('.port_dislikes_number').eq(x).text(Dados[x].dislikes)

        // Aplicar valor no botão
        $('.port_likes .reaction_icon button').eq(x).attr('value', x);
        $('.port_dislikes .reaction_icon button').eq(x).attr('value', x);

    }

}

function insert_new_data() {
    read_explorar_data(function (Dados_Explore) {
        read_port_data(function (Dados_Port) {

            console.log("Port new", Dados_Port);
            console.log("Expo new", Dados_Explore);

            for (let x = 0; x < Dados_Port.length; x = x + 1) {

                // Conferir se há ou não um respectivo par nos dados do Explorar
                let user_found = false; let y = 0;
                while (!user_found && y < Dados_Explore.length) {
                    if (Dados_Explore[y].userId == Dados_Port[x].userId) { user_found = true; }
                    y++;
                }

                // Se não houver, adicionar
                if (y == Dados_Explore.length && user_found == false) {

                    let new_port = {
                        "userId": Dados_Port[x].userId,
                        "username": Dados_Port[x].whoAmI,
                        "likes": 0, "liked": false,
                        "dislikes": 0, "disliked": false
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

function ordenar_por_like() {

    // Dar toggle na checkbox
    $('#ordenar_check').prop('checked', true);

    // Mudar texto do botão
    $('#btnordenar').text("Ordenar por data de criação");

    read_explorar_data(function (Dados_Explore) {

        // Criar cópia do JSON
        let Dados_Copy = Dados_Explore;

        // Por meio de while e for, repetir até organizar a cópia
        let organizado = false;
        while (organizado == false) {
            organizado = true;
            for (let x = 0; x < Dados_Copy.length - 1; x++) {
                if (Dados_Copy[x].likes < Dados_Copy[x + 1].likes) {
                    organizado = false;

                    // Change likes
                    var tempo_storage = Dados_Copy[x].likes;
                    Dados_Copy[x].likes = Dados_Copy[x + 1].likes;
                    Dados_Copy[x + 1].likes = tempo_storage;

                    // Change dislikes
                    tempo_storage = Dados_Copy[x].dislikes;
                    Dados_Copy[x].dislikes = Dados_Copy[x + 1].dislikes;
                    Dados_Copy[x + 1].dislikes = tempo_storage;

                    // Change username
                    tempo_storage = Dados_Copy[x].username;
                    Dados_Copy[x].username = Dados_Copy[x + 1].username;
                    Dados_Copy[x + 1].username = tempo_storage;

                    // Change (port)id
                    tempo_storage = Dados_Copy[x].id;
                    Dados_Copy[x].id = Dados_Copy[x + 1].id;
                    Dados_Copy[x + 1].id = tempo_storage;

                    // Change userid
                    tempo_storage = Dados_Copy[x].userId;
                    Dados_Copy[x].userId = Dados_Copy[x + 1].userId;
                    Dados_Copy[x + 1].userId = tempo_storage;
                }
            }
        }

        //if (Dados_Copy == Dados_Explore) {alert("Nós somos o Breaking Bad")}

        // Aplicar o novo JSON
        valorOrganizado(Dados_Copy);

        // Vai haver conflito com a funcionalidade de like e dislike, arrumar isso


    });
}



function desordenar_por_like() {

    //alert("Eu sou o Jujutsu Kaisen");

    // Untoggle na checkbox
    $('#ordenar_check').prop('checked', false);

    // Mudar texto do botão
    $('#btnordenar').text("Ordenação por like");

    // Aplicar o JSON / Local Storage
    valorInicial();

}


// Funcionalidades do botão de like
function mark_like_button(button) {
    $('.likes_checkbox').eq(button).prop('checked', true);

    $('.port_likes button').eq(button).css("color", "var(--green-icon)");
}

function unmark_like_button(button) {
    $('.likes_checkbox').eq(button).prop('checked', false);

    $('.port_likes button').eq(button).css("color", "var(--dark-purple)");
}

function like_button(button_clicked) {
    read_explorar_data(function (Dados_Explore) {


        var current_like_value = Dados_Explore[button_clicked].likes;
        var current_dislike_value = Dados_Explore[button_clicked].dislikes;

        if ($('.likes_checkbox').eq(button_clicked).is(":checked")) {

            unmark_like_button(button_clicked)

            $('.port_likes_number').eq(button_clicked).text(current_like_value - 1);
            current_like_value--;

            Dados_Explore[button_clicked].liked = false;
        }
        else {
            if ($('.dislikes_checkbox').eq(button_clicked).is(":checked")) {

                unmark_dislike_button(button_clicked);

                $('.port_dislikes_number').eq(button_clicked).text(current_dislike_value - 1)
                current_dislike_value--

                Dados_Explore[button_clicked].disliked = false;


                mark_like_button(button_clicked);

                $('.port_likes_number').eq(button_clicked).text(current_like_value + 1)
                current_like_value++

                Dados_Explore[button_clicked].liked = true;
            }
            else {

                mark_like_button(button_clicked);

                $('.port_likes_number').eq(button_clicked).text(current_like_value + 1)
                current_like_value++

                Dados_Explore[button_clicked].liked = true;
            }
        }

        Dados_Explore[button_clicked].likes = current_like_value;
        Dados_Explore[button_clicked].dislikes = current_dislike_value;

        save_explorar_data(Dados_Explore);
    });
}

// Funcionalidades do botão de dislike
function mark_dislike_button(button) {
    $('.dislikes_checkbox').eq(button).prop('checked', true);

    $('.port_dislikes button').eq(button).css("color", "var(--red-icon)");
}

function unmark_dislike_button(button) {
    $('.dislikes_checkbox').eq(button).prop('checked', false);

    $('.port_dislikes button').eq(button).css("color", "var(--dark-purple)");
}

function dislike_button(button_clicked) {
    read_explorar_data(function (Dados_Explore) {

        var current_like_value = Dados_Explore[button_clicked].likes;
        var current_dislike_value = Dados_Explore[button_clicked].dislikes;

        if ($('.dislikes_checkbox').eq(button_clicked).is(":checked")) {

            unmark_dislike_button(button_clicked);

            $('.port_dislikes_number').eq(button_clicked).text(current_dislike_value - 1);
            current_dislike_value--;

            Dados_Explore[button_clicked].disliked = false;
        }
        else {
            if ($('.likes_checkbox').eq(button_clicked).is(":checked")) {

                unmark_like_button(button_clicked);

                $('.port_likes_number').eq(button_clicked).text(current_like_value - 1);
                current_like_value--;

                Dados_Explore[button_clicked].liked = false;


                mark_dislike_button(button_clicked);

                $('.port_dislikes_number').eq(button_clicked).text(current_dislike_value + 1);
                current_dislike_value++;

                Dados_Explore[button_clicked].disliked = true;

            }
            else {

                mark_dislike_button(button_clicked);

                $('.port_dislikes_number').eq(button_clicked).text(current_dislike_value + 1);
                current_dislike_value++

                Dados_Explore[button_clicked].disliked = true;
            }
        }

        Dados_Explore[button_clicked].likes = current_like_value;
        Dados_Explore[button_clicked].dislikes = current_dislike_value;

        save_explorar_data(Dados_Explore);

    });
}

function save_explorar_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyExplorar', JSON.stringify(Dados));
}

$(document).ready(function () {

    //localStorage.clear()



    insert_new_data();
    insert_port();
    valorInicial();




    // Like
    $('.portfolio_showcase').on('click', '.row .card .row .col-md-3 .card-body .port_rating .port_likes label button', function () {

        var button_clicked = $(this).attr("value");
        like_button(button_clicked);

    });
    // Dislike
    $('.portfolio_showcase').on('click', '.row .card .row .col-md-3 .card-body .port_rating .port_dislikes label button', function () {

        var button_clicked = $(this).attr("value");

        dislike_button(button_clicked);

    });




    $('#btnordenar').click(function () {
        if ($('#ordenar_check').is(":checked")) {
            desordenar_por_like();
        }
        else {
            ordenar_por_like();
        }

    });

})