


function read_forumdata() {
    let strDados = localStorage.getItem('db');
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

    return Dados;
}


function insert_forum() {

    let Dados = read_forumdata();

    for (x = 0; x < Dados.forum.length; x++) {

        $("section").append('<div class="tag">\
        <div class="tag-header">\
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 448 512"><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>\
            </svg>\
            <h3 class="tag-title">TAG 1</h3> </div>\
        <div class="tag-content">\
            <p class="tag-content-paragraph">Teste</p> </div>\
        <div class="tag-info">\
            <div class="replies">\
                <svg class="reply-icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path fill="#00b2ff" d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"/>\
                </svg>\
                <span class="reply-count">Teste</span> </div>\
            <div class="viewers">\
                <svg class="view-icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512"><path fill="#2f184b" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>\
                </svg>\
                <span class="view-count">Teste</span> </div> </div>\
        </div>');

    }

    for (x = 0; x < Dados.forum.length; x++) {

        $(".tag-title").eq(x).text(Dados.forum[x].post.tag);
        $(".tag-content-paragraph").eq(x).text(Dados.forum[x].post.titulo);
        $(".reply-count").eq(x).text(Dados.forum[x].post.respostas);
        $(".view-count").eq(x).text(Dados.forum[x].post.views);

    }

}


function save_forum() {

}

$(document).ready(function () {


    insert_forum();


})
