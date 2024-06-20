
$(document).ready(function () {
    $("#buttonLogin_Iframe").click(function () {
        if ($("#the_login_iframe").css("display") == "block") {
            $("#the_login_iframe").css("display", "none");
        }
        else {
            $("#login_iframe").attr("src", "login.html");
            $("#the_login_iframe").css("display", "block");
        }
    })

    $("#buttonCriar_Iframe").click(function () {
        if ($("#the_login_iframe").css("display") == "block") {
            $("#the_login_iframe").css("display", "none");
        }
        else {
            $("#login_iframe").attr("src", "registro.html");
            $("#the_login_iframe").css("display", "block");
        }
    })

    $("#the_login_iframe button").click(function () {
        $("#the_login_iframe").css("display", "none");
    })
})