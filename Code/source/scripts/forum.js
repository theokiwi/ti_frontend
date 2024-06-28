


function read_forumdata(callback) {

    let strDados = localStorage.getItem('ArtsyForum');
    var Dados = {};

    var forum_JSON_setup = null;

    if (strDados) {
        Dados = JSON.parse(strDados);
        console.log("1", Dados);
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
            console.log("2", Dados);
            callback(Dados)
        });

        $.ajax(forum_JSON_setup).fail(function () {
            $.getJSON("../allJsAuth/db.json", function (forum_JSON) {
                Dados = forum_JSON.forum;
                console.log("3", Dados);
                callback(Dados)
            })
        });
    }
}


function insert_forum() {

    read_forumdata(function (Dados) {

        for (x = 0; x < Dados.length; x++) {

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

        for (x = 0; x < Dados.length; x++) {

            $(".tag_title").eq(x).text(Dados[x].post.tag);
            $(".post_title").eq(x).text(Dados[x].post.titulo);
            $(".post_link").eq(x).attr("href", "./forumpost.html?forumID=".concat(Dados[x].post.forum_ID))
            $(".reply_count").eq(x).text(Dados[x].post.respostas);
            $(".view_count").eq(x).text(Dados[x].post.views);
            if (Dados[x].post.status == false) { $(".post_status").eq(x).attr("class", "fa-solid fa-clock clock_icon post_status"); }

        }

    });

}


function save_forum() {

}

$(document).ready(function () {

    //localStorage.clear();
    insert_forum();


})
