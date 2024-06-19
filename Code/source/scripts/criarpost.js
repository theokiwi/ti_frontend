function read_forumdata() {
    let strDados = localStorage.getItem('ArtsyForumPosts');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
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

    return objDados;
}

function save_question() {
    // Ler dados do navegador ou os padrões
    let Dados = read_forumdata();

    let strTitulo = $("#post_title").val();
    let strPergunta = $("#post_description").val();
    let strTag = $("#tag").val();

    // Obter informações novas
    if (strTitulo == "" || strPergunta == "" || strTag == "") {
        alert("Erro de envio: Preencha todos os campos de informação.");
    }
    else {
        //let strNome = document.getElementsByClassName('Person').source;

        let ID = Dados.forum.length + 1;

        // Incluir informações novas
        let novaPergunta = {
            "post": {
                "usuario": "Usuario",
                "tag": strTag, "titulo": strTitulo,
                "pergunta": strPergunta,
                "forumID": ID,
                "respostas": 0, "views": 0, "likes": 0, "dislikes": 0,
                "foto": "perfil.png", "status": false, "edit": true
            },
            "respostas": []
        };
        Dados.forum.push(novaPergunta);

        // Salvar os dados no localStorage
        localStorage.setItem('ArtsyForumPosts', JSON.stringify(Dados));
        //console.log(JSON.stringify(Dados));

        alert("Sua pergunta foi salva");

        window.location.href = "../ForumMain/Forum.html";
    }
}


// Botão
$(document).ready(function () {
    //localStorage.clear();
    $('.submit_button').click(save_question);
});