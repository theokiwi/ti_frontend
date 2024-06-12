function read_forumdata() {
    let strDados = localStorage.getItem('ArtsyForumPosts');
    let Dados = {};

    if (strDados) {
        Dados = JSON.parse(strDados);
    }
    else {
        Dados = {

            "forum": [
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 1,
                        "respostas": 1, "views": 3, "likes": 7, "dislikes": 1,
                        "tag": "Tag 1", "titulo": "Primeiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "1Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": "01", "dislikes": "00",
                            "resposta": "Lorem ai1 ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png"
                        },
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": "02", "dislikes": "00",
                            "resposta": "Lorem ai2 ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png"
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 2,
                        "respostas": 2, "views": 4, "likes": 2, "dislikes": 2,
                        "tag": "Tag 2", "titulo": "Segundo Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "2Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": true
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": "01", "dislikes": "00",
                            "resposta": "Lorem ei ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png"
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 3,
                        "respostas": 3, "views": 5, "likes": 6, "dislikes": 1,
                        "tag": "Tag 3", "titulo": "Terceiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "3Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": true
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": "01", "dislikes": "00",
                            "resposta": "Lorem ii ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png"
                        }]
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 4,
                        "respostas": 4, "views": 6, "likes": 3, "dislikes": 2,
                        "tag": "Tag 4", "titulo": "Quarto Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "4Adipisci aspernatur cumque blanditiis?",
                        "foto": "perfil.png", "status": false
                    },
                    "respostas": [
                        {
                            "usuario": "Mauricio de Sousa",
                            "likes": "01", "dislikes": "00",
                            "resposta": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut.",
                            "foto": "perfil.png"
                        }]
                }
            ]
        }
    }

    //console.log(JSON.stringify(Dados));
    return Dados;
}

function insert_forum() {


    let Dados = read_forumdata();
    let url = new URL(window.location.href);

    let getquestionID = new URLSearchParams(url.search);
    let questionID = getquestionID.get('forumID');
    if (questionID == 0) { questionID = 1;}
    //questionID = 1;


    $(".post_answers").append(' <div class="post"> \
    <div class="post_data"> \
        <img src="assets/images/perfil.png" alt="Autor" class="post_owner"> \
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
        <p>Pergunta Placeholder</p> \
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

    // currentquestion = forum.find (function (Elemento) {Elemento.forumID == questionID})
    $(".question_tag").text(Dados.forum[questionID - 1].post.tag);
    $(".question_title").text(Dados.forum[questionID - 1].post.titulo);
    $(".post_replies_number").text(Dados.forum[questionID - 1].post.respostas);
    $(".post_views_number").text(Dados.forum[questionID - 1].post.views);
    $(".post_likes_number").text(Dados.forum[questionID - 1].post.likes);
    $(".post_dislikes_number").text(Dados.forum[questionID - 1].post.dislikes);
    $(".post_text").text(Dados.forum[questionID - 1].post.pergunta);
    $(".post_owner").attr("src", "assets/images/".concat(Dados.forum[questionID - 1].post.foto));


    for (x = 0; x < Dados.forum[questionID - 1].respostas.length; x++) {
        $(".post_answers").append('<div class="answer"> \
        <div class="answer_data"> \
        <img src="assets/images/perfil.png" alt="Respondedor" class="answer_owner"> </div> \
        <div class="answer_text"> \
        <p>Placeholder</p> </div> \
        <div class="answer_rating"> \
        <div class="answer_likes"> \
        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
        </i></button> <span class="answer_likes_number">10</span> </div>\
        <div class="answer_dislikes"> \
        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
        </i></button> <span class="answer_dislikes_number">0</span> </div>\
        \ </div> ');
    }

    for (x = 0; x < Dados.forum[questionID - 1].respostas.length; x++) {
        $(".answer_likes_number").eq(x).text(Dados.forum[questionID - 1].respostas[x].likes);
        $(".answer_dislikes_number").eq(x).text(Dados.forum[questionID - 1].respostas[x].dislikes);
        $(".answer_text").eq(x).text(Dados.forum[questionID - 1].respostas[x].resposta);
        $(".answer_owner").eq(x).attr("src", "assets/images/".concat(Dados.forum[questionID - 1].respostas[x].foto));
    }

}

function update_forum() {

    let Dados = read_forumdata();
    let url = new URL(window.location.href);

    let getquestionID = new URLSearchParams(url.search);
    let questionID = getquestionID.get('forumID');
    if (questionID == 0) { questionID = 1;}
    //questionID = 1;

    let tamanho = Dados.forum[questionID - 1].respostas.length;

    $(".post_answers").append('<div class="answer"> \
        <div class="answer_data"> \
        <img src="assets/images/perfil.png" alt="Respondedor" class="answer_owner"> </div> \
        <div class="answer_text"> \
        <p>Placeholder</p> </div> \
        <div class="answer_rating"> \
        <div class="answer_likes"> \
        <button><i class="answer_likes_icon fa-solid fa-angle-up"> \
        </i></button> <span class="answer_likes_number">10</span> </div>\
        <div class="answer_dislikes"> \
        <button><i class="answer_dislikes_icon fa-solid fa-angle-down"> \
        </i></button> <span class="answer_dislikes_number">0</span> </div>\
        \ </div> ');

    $(".answer_likes_number").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].likes);
    $(".answer_dislikes_number").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].dislikes);
    $(".answer_text").eq(tamanho - 1).text(Dados.forum[questionID - 1].respostas[tamanho - 1].resposta);
    $(".answer_owner").eq(tamanho - 1).attr("src", "assets/images/".concat(Dados.forum[questionID - 1].respostas[tamanho - 1].foto));
}

function save_answer() {
    let Dados = read_forumdata();
    let url = new URL(window.location.href);

    let getquestionID = new URLSearchParams(url.search);
    let questionID = getquestionID.get('forumID');
    if (questionID == 0 || questionID == null) { questionID = 1;}
    console.log(JSON.stringify(questionID));
    //questionID = 1;

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
            "foto": "perfil.png"
        };
        Dados.forum[questionID - 1].respostas.push(novaResposta);

        save_forum(Dados);
    }

    return (Dados);
}

function save_forum(Dados) {
    // Salvar os dados no localStorage
    localStorage.setItem('ArtsyForumPosts', JSON.stringify(Dados));
    //console.log(JSON.stringify(Dados));

    alert("Sua pergunta foi salva");
}


$(document).ready(function () {

    //localStorage.clear();

    insert_forum();

    $('#submit_answer').click(function () {
        let DadosComparacao = read_forumdata();
        let DadosObtidos = read_forumdata();

        DadosObtidos = save_answer();
        if (DadosObtidos != DadosComparacao) {
            update_forum();
        }
    });

})