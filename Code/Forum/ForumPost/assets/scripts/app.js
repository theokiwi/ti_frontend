function read_forumdata() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {

            
            "pergunta": {
                "usuario": "Pablo Picasso", foto: "assets/images/perfil.png",
                "respostas": "01", views: "03", likes: "01", dislikes: "02",
                "tag": "Tag 1", titulo: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
                "pergunta": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, aperiam commodi quibusdam officiis officia unde, corrupti corporis esse magnam, natus sunt! Excepturi porro eius dolore sequi corrupti aliquid ipsa saepe dolor ad? Earum neque minus iusto numquam illo tempora iste ab blanditiis doloribus eaque, odit illum adipisci nobis amet, rem quis. Temporibus odio esse qui quae iste vero unde voluptatibus iure excepturi, ipsum accusantium velit eius totam nobis, non obcaecati aperiam maiores at, tenetur deserunt molestias! Impedit earum veniam quaerat, sint voluptas et consequuntur magni dolores pariatur vero animi fugit assumenda sunt esse adipisci aspernatur cumque blanditiis?"
            },
            "respostas": [
                {
                    "usuario": "Mauricio de Sousa", foto: "assets/images/perfil.png",
                    "likes": "01", dislikes: "00",
                    "resposta": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint perferendis commodi aspernatur repudiandae suscipit quis incidunt. Ad sed doloribus officiis sunt quae. Dignissimos earum libero id nobis nostrum minus, aperiam debitis voluptate pariatur minima accusantium sint enim saepe reiciendis incidunt modi consequatur ut."
                }
            ]
        }
    }

    return objDados;
}

function insert_forum() {

    let objDados = read_forumdata();

    $(".question_tag").text(objDados.pergunta.tag);
    $(".question_title").text(objDados.pergunta.titulo);
    $(".post_replies_number").text(objDados.pergunta.respostas);
    $(".post_views_number").text(objDados.pergunta.views);
    $(".post_likes_number").text(objDados.pergunta.likes);
    $(".post_dislikes_number").text(objDados.pergunta.dislikes);
    $(".post_text").text(objDados.pergunta.pergunta);
    $(".post_owner").attr("src", objDados.pergunta.foto);


        for (x=0; x < objDados.respostas.length; x++) {
            $(".answer_likes_number").text(objDados.respostas[x].likes);
            $(".answer_dislikes_number").text(objDados.respostas[x].dislikes);
            $(".answer_text").text(objDados.respostas[x].resposta);
            $(".answer_owner").attr("src",objDados.respostas[x].foto);
        }

}

function save_forum() {

}

$(document).ready(function () {

    insert_forum();



})