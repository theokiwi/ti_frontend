
function read_forumdata(callback) {

    let strDados = localStorage.getItem('ArtsyForum');
    var Dados = {};

    var forum_JSON_setup = null;

    if (strDados) {
        Dados = JSON.parse(strDados);
        //console.log("1", Dados);
        callback(Dados)
    }
    else {
        forum_JSON_setup = {
            'async': false,
            "dataType": "json",
            "url": "http://localhost:3000/forum",
            "method": "GET",
            "headers": {
                "Accept": "*/*"
            }
        };

        $.ajax(forum_JSON_setup).done(function (forum_JSON) {
            Dados = forum_JSON;
            //console.log("2", Dados);
            callback(Dados)
        });

        $.ajax(forum_JSON_setup).fail(function () {
            $.getJSON("../allJsAuth/db.json", function (forum_JSON) {
                Dados = forum_JSON.forum;
                //console.log("3", Dados);
                callback(Dados)
            })
        });
    }
}

function read_page_ID() { // Tem que aplicar isso no restante do codigo
    let url = new URL(window.location.href);

    let getquestionID = new URLSearchParams(url.search);
    let questionID = getquestionID.get('forumID');
    if (questionID == 0 || questionID == null) { questionID = 1; }

    return (questionID);
}

function insert_forum() {


    read_forumdata(function (Dados) {
        //console.log(JSON.stringify(Dados));
        let questionID = read_page_ID();


        if (Dados[questionID - 1].post.edit == false) {
            $(".post_answers").append(' <div class="post"> \
    <div class="post_data"> \
        <img src="./assets/img/perfil.png" alt="Autor" class="post_owner"> \
        <div class="post_replies"> \
            <i class="post_replies_icon fa-solid fa-reply"></i> \
            <span class="post_replies_number">01</span> \
        </div> \
        <div class="post_views"> \
            <i class="post_views_icon fa-solid fa-eye"></i> \
            <span class="post_views_number">03</span> \
        </div> \
    </div> \
\
    <div class="post_text"> \
        <p class="pergunta">Pergunta Placeholder</p> \
    </div> \
\
    <div class="post_rating"> \
        <div class="post_likes"> \
            <button><i class="post_likes_icon fa-solid fa-angle-up"></i></button> \
            <input type="checkbox" class="post_likes_checkbox"> \
            <span class="post_likes_number">01</span> \
        </div> \
        <div class="post_dislikes"> \
            <button><i class="post_dislikes_icon fa-solid fa-angle-down"></i></button> \
            <input type="checkbox" class="post_dislikes_checkbox"> \
            <span class="post_dislikes_number">02</span> \
        </div> \
    </div> ');
        }
        else {
            $(".post_answers").append(' <div class="post"> \
    <div class="post_data"> \
        <img src="./assets/img/perfil.png" alt="Autor" class="post_owner"> \
        <div class="post_replies"> \
            <i class="post_replies_icon fa-solid fa-reply"></i> \
            <span class="post_replies_number">01</span> \
        </div> \
        <div class="post_views"> \
            <i class="post_views_icon fa-solid fa-eye"></i> \
            <span class="post_views_number">03</span> \
        </div> \
        <button id="edit_question" class="edit_button"> \
            <i class="fa-solid fa-square-pen"></i></button> \
    </div> \
        \
    <div class="post_text"> \
        <p class="pergunta">Pergunta Placeholder</p> \
        <div class="edit_post_forms"> \
            <form class="edit_title"> \
                <label for="edit_post_title">Titulo do Post</label> \
                <textarea id="edit_post_title" placeholder="Título do post"></textarea> \
            </form> \
                \
            <form class="edit_post"> \
                <label for="edit_post_text">Descrição</label> \
                <textarea id="edit_post_text" name="post_text" \
                    placeholder="Problema/Tópico de discussão"></textarea> \
            </form> \
                \
            <form class="edit_tag_selection"> \
                <label for="edit_tag">Tag</label> \
                <select class="tag_list" name="tag_list" id="edit_tag"> \
                    <option value="Criação de Portfólio" selected>Criação de Portfólio</option> \
                    <option value="Serviços do Site">Serviços do Site</option> \
                    <option value="Customização do Perfil">Customização do Perfil</option> \
                    <option value="Outros">Outros</option> \
                </select> \
            </form> \
            <form class="edit_post_status"> \
                <label for="edit_status">Status</label> \
                <select class="status_list" name="status_list" id="edit_status"> \
                    <option value="false" selected>Não Respondido</option> \
                    <option value="true">Respondido</option> \
                </select> \
            </form> \
                \
            <div class="submit"> \
                <button form="edit_title edit_post edit_tag_selection edit_post_status"\
                    class="submit_post" type="submit"> \
                        Confirmar mudanças \
                </button> \
            </div> \
            <button class="delete_post"> <i class="fa-solid fa-trash-can"></i>\
                </button> \
        </div> \
    </div> \
        \
    <div class="post_rating"> \
        <div class="post_likes"> \
            <button><i class="post_likes_icon fa-solid fa-angle-up"></i></button> \
            <input type="checkbox" class="post_likes_checkbox"> \
            <span class="post_likes_number">01</span> \
        </div> \
        <div class="post_dislikes"> \
            <button><i class="post_dislikes_icon fa-solid fa-angle-down"></i></button> \
            <input type="checkbox" class="post_dislikes_checkbox"> \
            <span class="post_dislikes_number">02</span> \
        </div> \
    </div> ');
        }



        $(".question_tag").text(Dados[questionID - 1].post.tag);
        $(".question_title").text(Dados[questionID - 1].post.titulo);

        $(".post_replies_number").text(Dados[questionID - 1].post.respostas);
        $(".post_views_number").text(Dados[questionID - 1].post.views);

        // Botão de like e dislike
        $(".post_likes_number").text(Dados[questionID - 1].post.likes);
        $(".post_dislikes_number").text(Dados[questionID - 1].post.dislikes);

        $(".pergunta").text(Dados[questionID - 1].post.pergunta);

        if (Dados[questionID - 1].post.foto == "perfil.png" || Dados[questionID - 1].post.foto == "pesoa_M.jpg" ||
            Dados[questionID - 1].post.foto == "pessoa_P.jpg" || Dados[questionID - 1].post.foto == "pfpExpl.jpg") { $(".post_owner").attr("src", "./assets/img/".concat(Dados[questionID - 1].post.foto)); }
        else { $(".post_owner").attr("src", Dados[questionID - 1].post.foto) }


        for (x = 0; x < Dados[questionID - 1].respostas.length; x++) {

            if (Dados[questionID - 1].respostas[x].edit == false) {
                $(".post_answers").append(`<div class="answer"> \
                <div class="answer_data"> \
                    <img src="./assets/img/perfil.png" alt="Respondedor" class="answer_owner"> \
                    <button class="edit_answer edit_button" value="0" style="display: none;"> \
                        <i class="fa-solid fa-square-pen"></i></button> </div>\
                <div class="answer_text"> \
                    <p class="resposta">Placeholder</p> \
                    <div class="edit_answer_forms" style="display: none;">\
                        <form class="edit_answer"> \
                            <label for="edit_answer_text">Descrição</label> \
                            <textarea class="edit_answer_text" name="answer_text" \
                                placeholder="Problema/Tópico de discussão"></textarea> \
                        </form> \
                        <div class="submit"> \
                            <button value="0" form="edit_answer" class="submit_answer" type="submit"> \
                                Confirmar mudanças \
                            </button> \
                        </div> \
                        <button class="delete_answer" value="0"> <i class="fa-solid fa-trash-can"></i>\
                            </button> \
                    </div> \
                </div> \
                <div class="answer_rating" data-id="${x}"> \
                    <div class="answer_likes"> \
                        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                        </i></button> <span class="answer_likes_number">10</span> \
                        <input type="checkbox" class="answer_likes_checkbox"> \
                    </div>\
                    <div class="answer_dislikes"> \
                        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                        </i></button> <span class="answer_dislikes_number">0</span>\
                        <input type="checkbox" class="answer_dislikes_checkbox"> \
                    </div>\
                \ </div> `);
            }
            else {
                $(".post_answers").append(`<div class="answer"> \
                <div class="answer_data"> \
                    <img src="./assets/img/perfil.png" alt="Respondedor" class="answer_owner"> \
                    <button class="edit_answer edit_button"> \
                        <i class="fa-solid fa-square-pen"></i></button> </div>\
                <div class="answer_text"> \
                    <p class="resposta">Placeholder</p> \
                    <div class="edit_answer_forms">\
                        <form class="edit_answer"> \
                            <label for="edit_answer_text">Descrição</label> \
                            <textarea class="edit_answer_text" name="answer_text" \
                                placeholder="Problema/Tópico de discussão"></textarea> \
                        </form> \
                        <div class="submit"> \
                            <button value="0" form="edit_answer" class="submit_answer" type="submit"> \
                                Confirmar mudanças \
                            </button> \
                        </div> \
                        <button class="delete_answer" value="0"> <i class="fa-solid fa-trash-can"></i>\
                            </button> \
                    </div>    \
                </div> \
                <div class="answer_rating" data-id="${x}"> \
                    <div class="answer_likes"> \
                        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                        </i></button> <span class="answer_likes_number">10</span> \
                        <input type="checkbox" class="answer_likes_checkbox"> \
                    </div>\
                    <div class="answer_dislikes"> \
                        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                        </i></button> <span class="answer_dislikes_number">0</span>\
                        <input type="checkbox" class="answer_dislikes_checkbox"> \
                    </div>\
                \ </div> `);
            }
            $('.answer .answer_data button').eq(x).attr("value", x);
            $('.answer .answer_text .edit_answer_forms .submit button').eq(x).attr("value", x);
            $('.delete_answer').eq(x).attr("value", x);
        }

        for (x = 0; x < Dados[questionID - 1].respostas.length; x++) {
            // Botão de like e dislike
            $(".answer_likes_number").eq(x).text(Dados[questionID - 1].respostas[x].likes);
            $(".answer_dislikes_number").eq(x).text(Dados[questionID - 1].respostas[x].dislikes); ~
                $(".answer_likes button").eq(x).attr('value', x);
            $(".answer_dislikes button").eq(x).attr('value', x);


            $(".resposta").eq(x).text(Dados[questionID - 1].respostas[x].resposta);

            if (Dados[questionID - 1].respostas[x].foto == "perfil.png" || Dados[questionID - 1].respostas[x].foto == "pessoa_M.jpg" ||
                Dados[questionID - 1].respostas[x].foto == "pessoa_P.jpg" || Dados[questionID - 1].respostas[x].foto == "pfpExpl.jpg") { $(".answer_owner").eq(x).attr("src", "./assets/img/".concat(Dados[questionID - 1].respostas[x].foto)); }
            else { $(".answer_owner").eq(x).attr("src", Dados[questionID - 1].respostas[x].foto) }
        }

    });
}


function update_forum() {

    read_forumdata(function (Dados) {
        let questionID = read_page_ID();

        let tamanho = Dados[questionID - 1].respostas.length;

        $(".post_answers").append('<div class="answer"> \
        <div class="answer_data"> \
            <img src="./assets/img/perfil.png" alt="Respondedor" class="answer_owner"> \
            <button class="edit_answer edit_button"> \
                <i class="fa-solid fa-square-pen"></i></button> </div>\
        <div class="answer_text"> \
            <p class="resposta">Placeholder</p> \
            <div class="edit_answer_forms">\
                <form class="edit_answer"> \
                    <label for="edit_answer_text">Descrição</label> \
                    <textarea class="edit_answer_text" name="answer_text" \
                        placeholder="Problema/Tópico de discussão"></textarea> \
                </form> \
                <div class="submit"> \
                    <button value="0" form="edit_answer" class="submit_answer" type="submit"> \
                        Confirmar mudanças \
                    </button> \
                </div> \
                <button class="delete_answer" value="0"> <i class="fa-solid fa-trash-can"></i>\
                        </button> \
            </div>    \
        </div> \
        <div class="answer_rating" data-id="2"> \
            <div class="answer_likes"> \
                <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                </i></button> <span class="answer_likes_number">10</span> \
                        <input type="checkbox" class="answer_likes_checkbox"> \
                    </div>\
            <div class="answer_dislikes"> \
                <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                </i></button> <span class="answer_dislikes_number">0</span> \
                        <input type="checkbox" class="answer_dislikes_checkbox"> \
                    </div>\
        \ </div> ');
        $('.answer .answer_data button').eq(tamanho - 1).attr("value", tamanho - 1);
        $('.answer .answer_text .edit_answer_forms .submit button').eq(tamanho - 1).attr("value", tamanho - 1);
        $('.delete_answer').eq(tamanho - 1).attr("value", tamanho - 1);
        $('.edit_answer_forms').eq(tamanho - 1).css("display", "none");

        // Botão de like e dislike
        $(".answer_likes_number").eq(tamanho - 1).text(Dados[questionID - 1].respostas[tamanho - 1].likes);
        $(".answer_dislikes_number").eq(tamanho - 1).text(Dados[questionID - 1].respostas[tamanho - 1].dislikes);
        $(".answer_likes button").eq(tamanho - 1).attr('value', tamanho - 1);
        $(".answer_dislikes button").eq(tamanho - 1).attr('value', tamanho - 1);


        $(".resposta").eq(tamanho - 1).text(Dados[questionID - 1].respostas[tamanho - 1].resposta);

        // Obter foto do perfil
        let foto = localStorage.getItem('profileImage');
        if (foto) { strFoto = foto; }
        else { strFoto = "perfil.png"; }
        $(".answer_owner").eq(tamanho - 1).attr("src", "./assets/img/".concat(Dados[questionID - 1].respostas[tamanho - 1].foto));

        if (Dados[questionID - 1].respostas[tamanho - 1].foto == "perfil.png" || Dados[questionID - 1].respostas[tamanho - 1].foto == "pessoa_M.jpg" ||
            Dados[questionID - 1].respostas[tamanho - 1].foto == "pessoa_P.jpg" || Dados[questionID - 1].respostas[tamanho - 1].foto == "pfpExpl.jpg") { $(".answer_owner").eq(tamanho - 1).attr("src", "./assets/img/".concat(Dados[questionID - 1].respostas[tamanho - 1].foto)); }
        else { $(".answer_owner").eq(tamanho - 1).attr("src", Dados[questionID - 1].respostas[tamanho - 1].foto) }


        $(".post_replies_number").text(Dados[questionID - 1].post.respostas);
    });
}


function update_views() {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID();


        let views = Dados[questionID - 1].post.views;
        Dados[questionID - 1].post.views = views + 1;

        $(".post_views_number").text(Dados[questionID - 1].post.views);

        save_data(Dados);
    });
}


function save_answer() {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID();

        let strResposta = $("#new_answer").val();

        if (strResposta == "") {
            alert("Erro de envio: Preencha o campo de informação.");
        }
        else {
            let strFoto = "perfil.png";
            let strUser = "Usuario";

            // Obter nome do usuário
            let usuario = localStorage.getItem('whoAmI');
            if (usuario) { strUser = usuario; }
            else { strUser = "Usuario"; }


            // Obter foto do perfil
            let foto = localStorage.getItem('profileImage');
            if (foto) { strFoto = foto; }
            else { strFoto = "perfil.png"; }


            // Incluir informações novas
            let novaResposta = {
                "usuario": strUser,
                "likes": 0, "liked": false,
                "dislikes": 0, "disliked": false,
                "resposta": strResposta,
                "foto": strFoto, "edit": true
            };
            Dados[questionID - 1].respostas.push(novaResposta);

            let perguntas = Dados[questionID - 1].post.respostas;
            Dados[questionID - 1].post.respostas = perguntas + 1;

            $('#display_form').prop('checked', false);

            save_forum(Dados);
        }

        return (Dados);
    });
}

function save_forum(Dados) {
    save_data(Dados);

    alert("Sua resposta foi salva");
}

function save_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyForum', JSON.stringify(Dados));
}



function hide_edit() {
    $('.pergunta').css("display", "block");
    $('.edit_post_forms').css("display", "none");

    $('.resposta').css("display", "block");
    $('.edit_answer_forms').css("display", "none");
}

function edit_post(Dados) {
    let questionID = read_page_ID();


    $('.pergunta').css("display", "none");
    $('.edit_post_forms').css("display", "block");

    //console.log(JSON.stringify(Dados.forum[questionID - 1].post.titulo));
    $('#edit_post_title').text(Dados[questionID - 1].post.titulo);
    $('#edit_post_text').text(Dados[questionID - 1].post.pergunta)
}

function save_edit_post() {
    // Ler dados do navegador ou os padrões
    read_forumdata(function (Dados) {
        let questionID = read_page_ID();
        let boolStatus;

        let strTitulo = $("#edit_post_title").val();
        let strPergunta = $("#edit_post_text").val();
        let strTag = $("#edit_tag").val();
        if ($('#edit_status').val() == "true") {
            boolStatus = true;
        }
        else if ($('#edit_status').val() == "false") {
            boolStatus = false;
        }

        // Obter informações novas
        if (strTitulo == "" || strPergunta == "" || strTag == "") {
            alert("Erro de envio: Preencha todos os campos de informação.");
        }
        else {
            Dados[questionID - 1].post.tag = strTag;
            Dados[questionID - 1].post.titulo = strTitulo;
            Dados[questionID - 1].post.pergunta = strPergunta;
            Dados[questionID - 1].post.status = boolStatus;

            // Salvar os dados no localStorage
            save_data(Dados);
            //console.log(JSON.stringify(Dados));

            alert("Alterações salvas");

            // Aplicar alterações
            $(".question_tag").text(Dados[questionID - 1].post.tag);
            $(".question_title").text(Dados[questionID - 1].post.titulo);
            $(".pergunta").text(Dados[questionID - 1].post.pergunta);
        }

        hide_edit();

    });
}

function edit_answer(value, Dados) {
    questionID = read_page_ID();

    $('.resposta').eq(value).css("display", "none");
    $('.edit_answer_forms').eq(value).css("display", "block");

    $('.edit_answer_text').eq(value).text(Dados[questionID - 1].respostas[value].resposta);
}

function save_edit_answer(value) {
    // Ler dados do navegador ou os padrões
    read_forumdata(function (Dados) {
        let questionID = read_page_ID();

        let strPergunta = $(".edit_answer_text").eq(value).val();

        // Obter informações novas
        if (strPergunta == "") {
            alert("Erro de envio: Preencha o campo de informação.");
        }
        else {
            Dados[questionID - 1].respostas[value].resposta = strPergunta;

            // Salvar os dados no localStorage
            save_data(Dados);
            //console.log(JSON.stringify(Dados));

            alert("Alteração salva");

            // Aplicar alteração
            $(".resposta").eq(value).text(Dados[questionID - 1].respostas[value].resposta);

            hide_edit();
        }

    });
}



function delete_post() {
    read_forumdata(function (Dados) {
        if (confirm("Deseja deletar a pergunta?")) {
            let questionID = read_page_ID();
            //console.log(JSON.stringify(Dados[questionID - 1]));

            Dados.splice(questionID - 1, 1);

            for (let x = questionID - 1; x < Dados.length; x = x + 1) {

                Dados[x].post.forum_ID = Dados[x].post.forum_ID - 1;

            }

            save_data(Dados);
            window.location.href = "../ForumMain/Forum.html";
        }
        else {

        }
    });
}

function delete_answer(value) {
    read_forumdata(function (Dados) {
        if (confirm("Deseja deletar a resposta?")) {
            let questionID = read_page_ID();
            //console.log(JSON.stringify(Dados.forum[questionID - 1]));

            Dados[questionID - 1].respostas.splice(value, 1);
            Dados[questionID - 1].post.respostas = Dados[questionID - 1].post.respostas - 1;

            save_data(Dados);

            $('.answer').eq(value).remove();
            $('.post_replies_number').text(Dados[questionID - 1].post.respostas);

            //console.log(JSON.stringify(Dados[questionID - 1].respostas.length));

            for (let x = value; x < Dados[questionID - 1].respostas.length; x = x + 1) {
                $('.edit_answer_forms .submit button').eq(x).attr("value", x);
                $('.answer .answer_data button').eq(x).attr("value", x);
                $('.delete_answer ').eq(x).attr("value", x);
            }

        }
        else {

        }
    });
}




// Funções like e deslike

function insert_likes() {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID();

        if (Dados[questionID - 1].post.liked == true) {
            toggle_like_post()
        }
        else if (Dados[questionID - 1].post.disliked == true) {
            toggle_dislike_post()
        }

        for (let x = 0; x < Dados[questionID - 1].respostas.length; x = x + 1) {
            if (Dados[questionID - 1].respostas[x].liked == true) {
                toggle_like_answer(x);
            }
            else if (Dados[questionID - 1].respostas[x].disliked == true) {
                toggle_dislike_answer(x);
            }
        }

    });
}

function toggle_like_post() {
    $('.post_likes input').prop('checked', true);

    $('.post_likes button').css("color", "var(--green-icon)");
}

function toggle_like_answer(n_answer) {
    $('.answer_likes input').eq(n_answer).prop('checked', true);

    $('.answer_likes button').eq(n_answer).css("color", "var(--green-icon)");
}

function untoggle_like_post() {
    $('.post_likes input').prop('checked', false);

    $('.post_likes button').css("color", "var(--dark-purple)");
}

function untoggle_like_answer(n_answer) {
    $('.answer_likes input').eq(n_answer).prop('checked', false);

    $('.answer_likes button').eq(n_answer).css("color", "var(--dark-purple)");
}

function toggle_dislike_post() {
    $('.post_dislikes input').prop('checked', true);

    $('.post_dislikes button').css("color", "var(--red-icon)");
}

function toggle_dislike_answer(n_answer) {
    $('.answer_dislikes input').eq(n_answer).prop('checked', true);

    $('.answer_dislikes button').eq(n_answer).css("color", "var(--red-icon)");
}

function untoggle_dislike_post() {
    $('.post_dislikes input').prop('checked', false);

    $('.post_dislikes button').css("color", "var(--dark-purple)");
}

function untoggle_dislike_answer(n_answer) {
    $('.answer_dislikes input').eq(n_answer).prop('checked', false);

    $('.answer_dislikes button').eq(n_answer).css("color", "var(--dark-purple)");
}



function like_post_button() {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID ();


        var current_like_value = Dados[questionID - 1].post.likes;
        var current_dislike_value= Dados[questionID - 1].post.dislikes;

        if ($('.post_likes input').is(":checked")) {

            untoggle_like_post();

            $('.post_likes_number').text(current_like_value - 1);
            current_like_value--;

            Dados[questionID - 1].post.liked = false;
        }
        else {
            if ($('.post_dislikes input').is(":checked")) {

                untoggle_dislike_post();

                $('.post_dislikes_number').text(current_dislike_value - 1);
                current_dislike_value--;

                Dados[questionID - 1].post.disliked = false;


                toggle_like_post();

                $('.post_likes_number').text(current_like_value + 1);
                current_like_value++;

                Dados[questionID - 1].post.liked = true;

            }
            else {

                toggle_like_post();

                $('.post_likes_number').text(current_like_value + 1);
                current_like_value++

                Dados[questionID - 1].post.liked = true;
            }
        }

        Dados[questionID - 1].post.likes = current_like_value;
        Dados[questionID - 1].post.dislikes = current_dislike_value;

        save_data(Dados);

    })
}

function like_answer_button(n_answer) {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID ();


        var current_like_value = Dados[questionID - 1].respostas[n_answer].likes;
        var current_dislike_value= Dados[questionID - 1].respostas[n_answer].dislikes;

        if ($('.answer_likes input').eq(n_answer).is(":checked")) {

            untoggle_like_answer(n_answer);

            $('.answer_likes_number').eq(n_answer).text(current_like_value - 1);
            current_like_value--;

            Dados[questionID - 1].respostas[n_answer].liked = false;
        }
        else {
            if ($('.answer_dislikes input').eq(n_answer).is(":checked")) {

                untoggle_dislike_answer(n_answer);

                $('.answer_dislikes_number').eq(n_answer).text(current_dislike_value - 1);
                current_dislike_value--;

                Dados[questionID - 1].respostas[n_answer].disliked = false;


                toggle_like_answer(n_answer);

                $('.answer_likes_number').eq(n_answer).text(current_like_value + 1);
                current_like_value++;

                Dados[questionID - 1].respostas[n_answer].liked = true;

            }
            else {

                toggle_like_answer(n_answer);

                $('.answer_likes_number').eq(n_answer).text(current_like_value + 1);
                current_like_value++

                Dados[questionID - 1].respostas[n_answer].liked = true;
            }
        }

        Dados[questionID - 1].respostas[n_answer].likes = current_like_value;
        Dados[questionID - 1].respostas[n_answer].dislikes = current_dislike_value;

        
        save_data(Dados);

    })
}

function dislike_post_button() {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID ();


        var current_like_value = Dados[questionID - 1].post.likes;
        var current_dislike_value= Dados[questionID - 1].post.dislikes;

        if ($('.post_dislikes input').is(":checked")) {

            untoggle_dislike_post();

            $('.post_dislikes_number').text(current_dislike_value - 1);
            current_dislike_value--;

            Dados[questionID - 1].post.disliked = false;
        }
        else {
            if ($('.post_likes input').is(":checked")) {

                untoggle_like_post();

                $('.post_likes_number').text(current_like_value - 1);
                current_like_value--;

                Dados[questionID - 1].post.liked = false;


                toggle_dislike_post();

                $('.post_dislikes_number').text(current_dislike_value + 1);
                current_dislike_value++;

                Dados[questionID - 1].post.disliked = true;

            }
            else {

                toggle_dislike_post();

                $('.post_dislikes_number').text(current_dislike_value + 1);
                current_dislike_value++

                Dados[questionID - 1].post.disliked = true;
            }
        }

        Dados[questionID - 1].post.likes = current_like_value;
        Dados[questionID - 1].post.dislikes = current_dislike_value;

        save_data(Dados);

    })
}

function dislike_answer_button(n_answer) {
    read_forumdata(function (Dados) {
        let questionID = read_page_ID ();


        var current_like_value = Dados[questionID - 1].respostas[n_answer].likes;
        var current_dislike_value= Dados[questionID - 1].respostas[n_answer].dislikes;

        if ($('.answer_dislikes input').eq(n_answer).is(":checked")) {

            untoggle_dislike_answer(n_answer);

            $('.answer_dislikes_number').eq(n_answer).text(current_dislike_value - 1);
            current_dislike_value--;

            Dados[questionID - 1].respostas[n_answer].disliked = false;
        }
        else {
            if ($('.answer_likes input').eq(n_answer).is(":checked")) {

                untoggle_like_answer(n_answer);

                $('.answer_likes_number').eq(n_answer).text(current_like_value - 1);
                current_like_value--;

                Dados[questionID - 1].respostas[n_answer].liked = false;


                toggle_dislike_answer(n_answer);

                $('.answer_dislikes_number').eq(n_answer).text(current_dislike_value + 1);
                current_dislike_value++;

                Dados[questionID - 1].respostas[n_answer].disliked = true;

            }
            else {

                toggle_dislike_answer(n_answer);

                $('.answer_dislikes_number').eq(n_answer).text(current_dislike_value + 1);
                current_dislike_value++

                Dados[questionID - 1].respostas[n_answer].disliked = true;
            }
        }

        Dados[questionID - 1].respostas[n_answer].likes = current_like_value;
        Dados[questionID - 1].respostas[n_answer].dislikes = current_dislike_value;

        save_data(Dados);

    })
}








$(document).ready(function () {

    //localStorage.clear();

    insert_forum();
    update_views();
    hide_edit();
    insert_likes()


    // Botões de like e dislike
    $('.post_answers').on('click', '.post .post_rating .post_likes button', function () {

        like_post_button();

    });
    $('.post_answers').on('click', '.post .post_rating .post_dislikes button', function () {

        dislike_post_button();

    });

    $('.post_answers').on('click', '.answer .answer_rating .answer_likes button', function () {

        var button_clicked = $(this).attr("value");
        like_answer_button(button_clicked);

    });
    $('.post_answers').on('click', '.answer .answer_rating .answer_dislikes button', function () {

        var button_clicked = $(this).attr("value");
        dislike_answer_button(button_clicked);

    });




    $('#submit_new_answer').click(function () {
        read_forumdata(function (DadosComparacao) {
            let DadosObtidos = save_answer();
            if (DadosObtidos != DadosComparacao) {
                update_forum();
            }
        });
    });


    // Isso está delegando a função para poder realizar mesmo que o elemento seja adicionado depois de carregar a página
    $('.post_answers').on('click', '.answer .answer_data .edit_answer', function () {
        let pergunta = parseInt($(this).attr("value"), 10);
        if ($('.edit_answer_forms').eq(pergunta).css("display") == "none") {
            read_forumdata(function (Dados) {
                edit_answer(pergunta, Dados);
            });
        }
        else {
            hide_edit();
        }
    })

    $('.post_answers').on('click', '.submit_answer', function () {
        let pergunta = parseInt($(this).attr("value"), 10);
        save_edit_answer(pergunta);
    })

    // Delegar função
    $('.post_answers').on('click', '.answer .answer_text .edit_answer_forms .delete_answer', function () {
        let pergunta = parseInt($(this).attr("value"), 10);
        delete_answer(pergunta);
    })



    $('#edit_question').click(function () {
        if ($('.edit_post_forms').css("display") == "none") {
            read_forumdata(function (Dados) {
                edit_post(Dados);
            });
        }
        else {
            hide_edit();
        }
    })

    $('.submit_post').click(function () {
        save_edit_post();
    })

    $('.delete_post').click(function () {
        delete_post();
    })

})