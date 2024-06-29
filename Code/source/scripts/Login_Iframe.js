
function hide_iframe() {
    $("#the_login_iframe").css("display", "none");
}

function show_iframe() {
    $("#the_login_iframe").css("display", "block");
}



function check_login_status() {
    var login = localStorage.getItem('whoAmI')
    console.log(login)

    if (login) {
        hide_iframe();
    }
}



$(document).ready(function () {
    $("#buttonLogin_Iframe").click(function () {
        if ($("#the_login_iframe").css("display") == "block") {
            hide_iframe();
        }
        else {
            $("#login_iframe").attr("src", "login.html");
            show_iframe();
        }
    })

    $("#buttonCriar_Iframe").click(function () {
        if ($("#the_login_iframe").css("display") == "block") {
            hide_iframe();
        }
        else {
            $("#login_iframe").attr("src", "registro.html");
            show_iframe();
        }
    })

    $("#the_login_iframe button").click(function () {
        hide_iframe();
    })


    $('#login_iframe').on("load", function () {
        $(this).contents().on('click', '.input-group input.loginbutton', function () {
            if ($('#login_iframe').contents().find('#username').val() == "" || $('#login_iframe').contents().find('#password').val() == "") { }
            else {
                setTimeout(function () { check_login_status() }, 150);
            }
        });
        $(this).contents().on('click', '.input-group button.registerbutton', function () {
            if ($('#login_iframe').contents().find('#username').val() == "" || $('#login_iframe').contents().find('#password').val() == "") { }
            else {
                setTimeout(function () { check_login_status() }, 150);
            }
        });
    })

})