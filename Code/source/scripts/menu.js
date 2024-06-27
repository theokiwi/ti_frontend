

function menu() {
    // menuItems = document.getElementById("menuItems");

    //alert ("Olá");

    if ($('#menuItems').css("display") == "block") {
        $('#menuItems').css("display", "none");
    }
    else {
        $('#menuItems').css("display", "block");
    }
}

function user_show() {
    let strFoto; let strUser;

    // Obter nome do usuário

    let usuario = localStorage.getItem('whoAmI');
    if (usuario) {
        strUser = usuario;

        // Obter foto do perfil
        let foto = localStorage.getItem('profileImage');
        if (foto) { strFoto = foto; }
        else { strFoto = "perfil.png"; }

        if (strFoto == "perfil.png" || strFoto == "pessoa_M.jpg" ||
            strFoto == "pessoa_P.jpg" || strFoto == "pfpExpl.jpg") { $('.navbar .perfil').attr("src", "./assets/img/".concat(strFoto)); }
        else { $('.navbar .perfil').attr('src', strFoto); }

        $('#menuItems li').eq(4).css("display", "none");
        $('#menuItems li').eq(5).css("display", "none");
        
        $('#menuItems').append('<li class="username"><a href="./perfil.html">Nome</a></li>')
        $('#menuItems li.username a').text(strUser)
    }
}

$(document).ready(function () {

    //localStorage.clear();
    $('.menu_icon').click(menu);

    $(window).on("resize", function () {
        if ($(window).width() > 800) {
            $('#menuItems').css("display", "block");
        }
    })

    $(window).on('mouseover', user_show());

})