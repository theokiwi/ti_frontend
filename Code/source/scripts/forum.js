


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

    return Dados;
}


function insert_forum() {

    let Dados = read_forumdata();

    for (x = 0; x < Dados.forum.length; x++) {

        $("section.forum_posts").append('<div class="post">\
        <div class="post_header">\
            <i class="fa-solid fa-circle-check check_icon post_status"></i>\
            <h3 class="tag_title">TAG 1</h3> </div>\
        <div class="post_content">\
            <a class="post_link" href=#><p class="post_title">Teste</p></a> </div>\
        <div class="post_info">\
            <div class="replies">\
                <i class="fa-solid fa-reply reply_icon"></i>\
                <span class="reply_count">Teste</span> </div>\
            <div class="viewers">\
                <i class="fa-solid fa-eye view_icon"></i>\
                <span class="view_count">Teste</span> </div> </div>\
        </div>');

    }

    for (x = 0; x < Dados.forum.length; x++) {

        $(".tag_title").eq(x).text(Dados.forum[x].post.tag);
        $(".post_title").eq(x).text(Dados.forum[x].post.titulo);
        $(".post_link").eq(x).attr("href", "./forumpost.html?forumID=".concat(Dados.forum[x].post.forumID))
        $(".reply_count").eq(x).text(Dados.forum[x].post.respostas);
        $(".view_count").eq(x).text(Dados.forum[x].post.views);
        if (Dados.forum[x].post.status == false) { $(".post_status").eq(x).attr("class", "fa-solid fa-clock clock_icon post_status"); }

    }

}


function save_forum() {

}

$(document).ready(function () {

    //localStorage.clear();
    insert_forum();


})
