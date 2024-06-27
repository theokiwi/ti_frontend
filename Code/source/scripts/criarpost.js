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
            "url": "/forum",
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

function save_question() {
    // Ler dados do navegador ou os padrões
    read_forumdata(function (Dados) {

        let strTitulo = $("#post_title").val();
        let strPergunta = $("#post_description").val();
        let strTag = $("#tag").val();
        

        // Obter informações novas
        if (strTitulo == "" || strPergunta == "" || strTag == "") {
            alert("Erro de envio: Preencha todos os campos de informação.");
        }
        else {
            let strFoto; let strUser;

            // Obter nome do usuário
            
            let usuario = localStorage.getItem('whoAmI');
            if (usuario)
            { strUser = usuario; }
            else
            { strUser = "Usuario"; }
            

            // Obter foto do perfil
            let foto = localStorage.getItem('profileImage');
            if (foto)
                { strFoto = foto;  }
            else
                { strFoto = "perfil.png"; }



            let ID = Dados.length + 1;

            // Incluir informações novas
            let novaPergunta = {
                "post": {
                    "usuario": "Usuario",
                    "forum_ID": ID,
                    "respostas": 0, "views": 0, "likes": 0, "dislikes": 0,
                    "tag": strTag, "titulo": strTitulo,
                    "pergunta": strPergunta,
                    "foto": foto, "status": false, "edit": true
                },
                "respostas": []
            };
            Dados.push(novaPergunta);

            // Salvar os dados no localStorage
            localStorage.setItem('ArtsyForum', JSON.stringify(Dados));
            //console.log(JSON.stringify(Dados));

            alert("Sua pergunta foi salva");

            window.location.href = "./forum.html";
        }

    })
}


// Botão
$(document).ready(function () {
    //localStorage.clear();
    $('.submit_button').click(save_question);
});