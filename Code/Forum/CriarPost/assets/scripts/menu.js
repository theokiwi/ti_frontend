

function menu() {
    // menuItems = document.getElementById("menuItems");

    // alert ("Olá");

    if ($('#menuItems').css("display") == "block") {
        $('#menuItems').css("display", "none");
    }
    else {
        $('#menuItems').css("display", "block");
    }
}

$(document).ready(function () {

    //localStorage.clear();
    $('.menu_icon').click(menu);

    $( window ).on( "resize", function() {
        if ($(window).width() > 800) {
            $('#menuItems').css("display", "block");
        }
    } )

})