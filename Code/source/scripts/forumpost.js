function read_forumdata() {
    let strDados = localStorage.getItem('ArtsyForumPosts');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {

            "forum": [
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 1,
                        "respostas": 2, "views": 3, "likes": 7, "dislikes": 1,
                        "tag": "Tag 1", "titulo": "Primeiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "1Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": false, "edit": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": 1, "dislikes": 0,
                            "resposta": "Lorem ai1 ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png", "edit": false
                        },
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": 2, "dislikes": 0,
                            "resposta": "Lorem ai2 ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png", "edit": false
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 2,
                        "respostas": 1, "views": 4, "likes": 2, "dislikes": 2,
                        "tag": "Tag 2", "titulo": "Segundo Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "2Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": true, "edit": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": 1, "dislikes": 0,
                            "resposta": "Lorem ei ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png", "edit": false
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 3,
                        "respostas": 1, "views": 5, "likes": 6, "dislikes": 1,
                        "tag": "Tag 3", "titulo": "Terceiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "3Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": true, "edit": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": 1, "dislikes": 0,
                            "resposta": "Lorem ii ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png", "edit": false
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 4,
                        "respostas": 1, "views": 6, "likes": 3, "dislikes": 2,
                        "tag": "Tag 4", "titulo": "Quarto Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "4Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": false, "edit": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": 1, "dislikes": 0,
                            "resposta": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png", "edit": false
                        }]
                }
            ]
        }
    }

    //console.log(JSON.stringify(objDados));
    return objDados;
}

function read_page_ID() { // Tem que aplicar isso no restante do codigo
    let url = new URL(window.location.href);

    let getquestionID = new URLSearchParams(url.search);
    let questionID = getquestionID.get('forumID');
    if (questionID == 0 || questionID == null) { questionID = 1; }

    return (questionID);
}

function insert_forum() {


    let Dados = read_forumdata();
    //console.log(JSON.stringify(Dados));
    let questionID = read_page_ID();


    if (Dados.forum[questionID - 1].post.edit == false) {
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
            <span class="post_likes_number">01</span> \
        </div> \
        <div class="post_dislikes"> \
            <button><i class="post_dislikes_icon fa-solid fa-angle-down"></i></button> \
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
                    <option value="Tag 1" selected>Tag 1</option> \
                    <option value="Tag 2">Tag 2</option> \
                    <option value="Tag 3">Tag 3</option> \
                    <option value="Tag 4">Tag 4</option> \
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
            <span class="post_likes_number">01</span> \
        </div> \
        <div class="post_dislikes"> \
            <button><i class="post_dislikes_icon fa-solid fa-angle-down"></i></button> \
            <span class="post_dislikes_number">02</span> \
        </div> \
    </div> ');
    }



    $(".question_tag").text(Dados.forum[questionID - 1].post.tag);
    $(".question_title").text(Dados.forum[questionID - 1].post.titulo);

    $(".post_replies_number").text(Dados.forum[questionID - 1].post.respostas);
    $(".post_views_number").text(Dados.forum[questionID - 1].post.views);

    $(".post_likes_number").text(Dados.forum[questionID - 1].post.likes);
    $(".post_dislikes_number").text(Dados.forum[questionID - 1].post.dislikes);

    $(".pergunta").text(Dados.forum[questionID - 1].post.pergunta);

    $(".post_owner").attr("src", "./assets/img/".concat(Dados.forum[questionID - 1].post.foto));

    for (x = 0; x < Dados.forum[questionID - 1].respostas.length; x++) {

        if (Dados.forum[questionID - 1].respostas[x].edit == false) {
            $(".post_answers").append('<div class="answer"> \
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
                <div class="answer_rating"> \
                    <div class="answer_likes"> \
                        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                        </i></button> <span class="answer_likes_number">10</span> </div>\
                    <div class="answer_dislikes"> \
                        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                        </i></button> <span class="answer_dislikes_number">0</span> </div>\
                \ </div> ');
        }
        else {
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
                <div class="answer_rating"> \
                    <div class="answer_likes"> \
                        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                        </i></button> <span class="answer_likes_number">10</span> </div>\
                    <div class="answer_dislikes"> \
                        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                        </i></button> <span class="answer_dislikes_number">0</span> </div>\
                \ </div> ');
        }
        $('.answer .answer_data button').eq(x).attr("value", x);
        $('.answer .answer_text .edit_answer_forms .submit button').eq(x).attr("value", x);
        $('.delete_answer').eq(x).attr("value", x);
    }

    for (x = 0; x < Dados.forum[questionID - 1].respostas.length; x++) {
        $(".answer_likes_number").eq(x).text(Dados.forum[questionID - 1].respostas[x].likes);
        $(".answer_dislikes_number").eq(x).text(Dados.forum[questionID - 1].respostas[x].dislikes);
        $(".resposta").eq(x).text(Dados.forum[questionID - 1].respostas[x].resposta);
        $(".answer_owner").eq(x).attr("src", "./assets/img/".concat(Dados.forum[questionID - 1].respostas[x].foto));
    }

}


function update_forum() {

    let Dados = read_forumdata();
    let questionID = read_page_ID();

    let tamanho = Dados.forum[questionID - 1].respostas.length;

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
        <div class="answer_rating"> \
            <div class="answer_likes"> \
                <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
                </i></button> <span class="answer_likes_number">10</span> </div>\
            <div class="answer_dislikes"> \
                <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
                </i></button> <span class="answer_dislikes_number">0</span> </div>\
        \ </div> ');
    $('.answer .answer_data button').eq(tamanho - 1).attr("value", tamanho - 1);
    $('.answer .answer_text .edit_answer_forms .submit button').eq(tamanho - 1).attr("value", tamanho - 1);
    $('.delete_answer').eq(tamanho - 1).attr("value", tamanho - 1);
    $('.edit_answer_forms').eq(tamanho - 1).css("display", "none");

    $(".answer_likes_number").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].likes);
    $(".answer_dislikes_number").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].dislikes);
    $(".resposta").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].resposta);
    $(".answer_owner").eq(tamanho - 1).attr("src", "./assets/img/".concat(Dados.forum[questionID - 1].respostas[tamanho - 1].foto));

    $(".post_replies_number").text(Dados.forum[questionID - 1].post.respostas);
}


function update_views() {
    let Dados = read_forumdata();
    let questionID = read_page_ID();


    let views = Dados.forum[questionID - 1].post.views;
    //console.log(JSON.stringify(views));
    Dados.forum[questionID - 1].post.views = views + 1;

    $(".post_views_number").text(Dados.forum[questionID - 1].post.views);

    save_data(Dados);
}


function save_answer() {
    let Dados = read_forumdata();
    let questionID = read_page_ID();

    let strResposta = $("#new_answer").val();

    if (strResposta == "") {
        alert("Erro de envio: Preencha o campo de informação.");
    }
    else {
        // Incluir informações novas
        let novaResposta = {
            "usuario": "Usuario",
            "likes": 0, "dislikes": 0,
            "resposta": strResposta,
            "foto": "perfil.png", "edit": true
        };
        Dados.forum[questionID - 1].respostas.push(novaResposta);

        let perguntas = Dados.forum[questionID - 1].post.respostas;
        Dados.forum[questionID - 1].post.respostas = perguntas + 1;

        $('#display_form').prop('checked', false);

        save_forum(Dados);
    }

    return (Dados);
}

function save_forum(Dados) {
    save_data(Dados);

    alert("Sua resposta foi salva");
}

function save_data(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyForumPosts', JSON.stringify(Dados));
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
    $('#edit_post_title').text(Dados.forum[questionID - 1].post.titulo);
    $('#edit_post_text').text(Dados.forum[questionID - 1].post.pergunta)
}

function save_edit_post() {
    // Ler dados do navegador ou os padrões
    let Dados = read_forumdata();
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

    console.log(JSON.stringify(boolStatus));
    console.log(typeof (boolStatus));

    // Obter informações novas
    if (strTitulo == "" || strPergunta == "" || strTag == "") {
        alert("Erro de envio: Preencha todos os campos de informação.");
    }
    else {
        Dados.forum[questionID - 1].post.tag = strTag;
        Dados.forum[questionID - 1].post.titulo = strTitulo;
        Dados.forum[questionID - 1].post.pergunta = strPergunta;
        Dados.forum[questionID - 1].post.status = boolStatus;

        // Salvar os dados no localStorage
        save_data(Dados);
        //console.log(JSON.stringify(Dados));

        alert("Alterações salvas");

        // Aplicar alterações
        $(".question_tag").text(Dados.forum[questionID - 1].post.tag);
        $(".question_title").text(Dados.forum[questionID - 1].post.titulo);
        $(".pergunta").text(Dados.forum[questionID - 1].post.pergunta);
    }

    hide_edit();
}

function edit_answer(value, Dados) {
    questionID = read_page_ID();

    $('.resposta').eq(value).css("display", "none");
    $('.edit_answer_forms').eq(value).css("display", "block");

    $('.edit_answer_text').eq(value).text(Dados.forum[questionID - 1].respostas[value].resposta);
}

function save_edit_answer(value) {
    // Ler dados do navegador ou os padrões
    let Dados = read_forumdata();
    let questionID = read_page_ID();

    let strPergunta = $(".edit_answer_text").eq(value).val();

    // Obter informações novas
    if (strPergunta == "") {
        alert("Erro de envio: Preencha o campo de informação.");
    }
    else {
        Dados.forum[questionID - 1].respostas[value].resposta = strPergunta;

        // Salvar os dados no localStorage
        save_data(Dados);
        //console.log(JSON.stringify(Dados));

        alert("Alteração salva");

        // Aplicar alteração
        $(".resposta").eq(value).text(Dados.forum[questionID - 1].respostas[value].resposta);

        hide_edit();
    }
}



function delete_post() {
    if (confirm("Deseja deletar a pergunta?")) {
        let Dados = read_forumdata();
        let questionID = read_page_ID();
        //console.log(JSON.stringify(Dados.forum[questionID - 1]));

        Dados.forum.splice(questionID - 1, 1);

        for (let x = questionID - 1; x < Dados.forum.length; x = x + 1) {

            Dados.forum[x].post.forumID = Dados.forum[x].post.forumID - 1;

        }

        save_data(Dados);
        window.location.href = "../ForumMain/Forum.html";
    }
    else {

    }
}

function delete_answer(value) {
    if (confirm("Deseja deletar a resposta?")) {
        let Dados = read_forumdata();
        let questionID = read_page_ID();
        //console.log(JSON.stringify(Dados.forum[questionID - 1]));

        Dados.forum[questionID - 1].respostas.splice(value, 1);
        Dados.forum[questionID - 1].post.respostas = Dados.forum[questionID - 1].post.respostas - 1;

        save_data(Dados);

        $('.answer').eq(value).remove();
        $('.post_replies_number').text(Dados.forum[questionID - 1].post.respostas);

        //console.log(JSON.stringify(Dados.forum[questionID - 1].respostas.length));
        
        for (let x = value; x < Dados.forum[questionID - 1].respostas.length; x = x + 1) {
            $('.edit_answer_forms .submit button').eq(x).attr("value", x);
            $('.answer .answer_data button').eq(x).attr("value", x);
            $('.delete_answer ').eq(x).attr("value", x);
        }
        
    }
    else {

    }
}


$(document).ready(function () {

    //localStorage.clear();

    insert_forum();
    update_views();
    hide_edit();



    $('#submit_new_answer').click(function () {
        let DadosComparacao = read_forumdata();
        let DadosObtidos = read_forumdata();

        DadosObtidos = save_answer();
        if (DadosObtidos != DadosComparacao) {
            update_forum();
        }
    });


    // Isso está delegando a função para poder realizar mesmo que o elemento seja adicionado depois de carregar a página
    $('.post_answers').on('click', '.answer .answer_data .edit_answer', function () {
        let pergunta = parseInt($(this).attr("value"), 10);
        if ($('.edit_answer_forms').eq(pergunta).css("display") == "none") {
            let Dados = read_forumdata();
            edit_answer(pergunta, Dados);
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
            let Dados = read_forumdata();
            edit_post(Dados);
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