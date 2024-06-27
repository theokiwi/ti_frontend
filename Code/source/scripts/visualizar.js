
document.addEventListener('DOMContentLoaded', function () {
    //função le dados
    function read_portfoliodata() {
        let strDados = localStorage.getItem('ArtsyCurtida');
        let Dados = {};

        if (strDados) {
            Dados = JSON.parse(strDados);
        }
        else {
            Dados = {
                "portfolios": [
                    { "id": 1, "likes": 4, "dislikes": 1 },
                    { "id": 2, "likes": 1, "dislikes": 7 },
                    { "id": 3, "likes": 7, "dislikes": 1 }
                ]
            }
        }
        console.log(JSON.stringify(Dados));
        return Dados;
    }
    
    function valorInicial(){
        let Dados=read_portfoliodata();
        //let valor = (Dados.portfolios[1].likes); 
        $('#contador').text(Dados.portfolios[1].likes);
        $('#contador2').text(Dados.portfolios[1].dislikes);
    }
    //salva os dados
    function salvaDados(dados) {
        localStorage.setItem('ArtsyCurtida', JSON.stringify(dados));
    }
    function atualizaLike() {
        //le dados
        let Dados = read_portfoliodata();
        //atualizar o numero de likes
        let strAtualizador = $("#contador").text();
        let dadosAtualizados = {
            "likes": strAtualizador
        };
        
        salvaDados(Dados);
        alert("Like salvo");
    }
    

    //Muda o like e o dislike
    function update_like() {
        let Dados=read_portfoliodata();
        let valor = Dados.portfolios[1].likes;  //parseInt($('#contador').text());
         
        //quando clicamos nele, a classe é ativada ou desativada
        $("#like").toggleClass('liked');
        //Se o usuario clicar no botão enquanto a classe tá ativada, o contador diminui em 1
        if ($("#like").hasClass('liked')) {
            $('#contador').text(valor +  1);
            Dados.portfolios[1].likes=valor+1;
        } else {
            $('#contador').text(valor - 1);
            Dados.portfolios[1].likes=valor-1; 
        }
        //impede que cliquemos em dislike enquanto o like estiver ativado;

        if ($("#like").hasClass('liked')) {
            $('#dislike').prop('disabled', true);
        } else {
            $('#dislike').prop('disabled', false);
        }
        salvaDados(Dados);
    };
    function update_dislike () {
        let Dados=read_portfoliodata();
        let valor = Dados.portfolios[1].dislikes; 
        //quando clicamos nele, a classe é ativada ou desativada
        $("#dislike").toggleClass('disliked');
        //Se o usuario clicar no botão enquanto a classe tá ativada, o contador diminui em 1
        if ($("#dislike").hasClass('disliked')) {
            $('#contador2').text(valor + 1);
            Dados.portfolios[1].dislikes=valor+1;
        } else {
            $('#contador2').text(valor - 1);
            Dados.portfolios[1].dislikes=valor-1; 
        }
        //impede que cliquemos em like enquanto o dislike estiver ativado;
        if ($("#dislike").hasClass('disliked')) {
            $('#like').prop('disabled', true);
        } else {
            $('#like').prop('disabled', false);
        }
        salvaDados(Dados)
    };
    $(document).ready(function(){
        //localStorage.clear();
        valorInicial();
        $("#dislike").click( update_dislike ); 
        $("#like").click(update_like ); 
        $('#atualizaLike').click(atualizaLike);
    });

 
});
   