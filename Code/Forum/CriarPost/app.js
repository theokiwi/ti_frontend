


function read_forumdata() {
    let strDados = localStorage.getItem('db');
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
                        "respostas": 1, "views": 3, "likes": 7, "dislikes": 1,
                        "tag": "Tag 1", "titulo": "Primeiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "1Adipisci aspernatur cumque blanditiis?",
                    },
                    "respostas": []
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 2,
                        "respostas": 2, "views": 4, "likes": 2, "dislikes": 2,
                        "tag": "Tag 2", "titulo": "Segundo Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "2Adipisci aspernatur cumque blanditiis?"
                    },
                    "respostas": []
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 3,
                        "respostas": 3, "views": 5, "likes": 6, "dislikes": 1,
                        "tag": "Tag 3", "titulo": "Terceiro Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "3Adipisci aspernatur cumque blanditiis?"
                    },
                    "respostas": []
                },
                {
                    "post": {
                        "usuario": "Pablo Picasso", "forumID": 4,
                        "respostas": 4, "views": 6, "likes": 3, "dislikes": 2,
                        "tag": "Tag 4", "titulo": "Quarto Lorem ipsum, dolor sit amet consectetur adipisicing.",
                        "pergunta": "4Adipisci aspernatur cumque blanditiis?"
                    },
                    "respostas": []
                }
            ]
        }
    }

    return objDados;
}

function save_question() {
    // Ler dados do navegador ou os padrões
    let Dados = read_forumdata();

    // Obter informações novas
    //let strNome = document.getElementsByClassName('Person').source;
    let strTitulo = $("#post_title").val();
    let strPergunta = $("#post_description").val();
    let strTag = $("#tag").val();

    let ID = Dados.forum.length + 1;

    // Incluir informações novas
    let novaPergunta = {
        "post": {
            "usuario": "Usuario",
            "tag": strTag, titulo: strTitulo,
            "pergunta": strPergunta,
            "forumID": ID,
            "respostas": 0, views: 0, likes: 0, dislikes: 0,
        },
        "respostas": []
    };
    Dados.forum.push(novaPergunta);

    // Salvar os dados no localStorage
    localStorage.setItem('db', JSON.stringify(Dados));
//console.log(JSON.stringify(Dados));

    alert("Sua pergunta foi salva");

    window.location.href = "../ForumMain/Forum.html";
}


// Botão
$(document).ready(function () {
//localStorage.clear();
    $('.submit_button').click(save_question);
});