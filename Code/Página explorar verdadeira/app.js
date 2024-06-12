
//função le dados

function read_portfoliodata() {
    let strDados = localStorage.getItem('ArtsyPages');
    let Dados = {};

    if (strDados) {
        Dados = JSON.parse(strDados);
    }
    else {
        Dados = {
            "portfolios": [
                { "id": 1, "likes": 4, "image": "img/img1.png" },
                { "id": 2, "likes": 5, "image": "img/img2.png" },
                { "id": 3, "likes": 2, "image": "img/img3.png" },
                { "id": 4, "likes": 3, "image": "img/img4.png" },
                { "id": 5, "likes": 1, "image": "img/img5.png" }
            ]
        }
    }
    console.log(JSON.stringify(Dados));
    return Dados;
}
function salvaDados(dados) {
    localStorage.setItem('ArtsyPages', JSON.stringify(dados));
}
//Isso é para o botão mudar o layout quando for clicado
function muda_layout() {
   let section = document.querySelector("section[class='secao2']");
    let layout = document.querySelector(".layout_ordenar");
    //let button=document.getElementById('btnordenar');
    section.style.display = "none";
    layout.style.display = "grid";
}



function ordenacao() {
    let Dados = read_portfoliodata();
    let x = 0;
    let valor = 0;
    let em_ordem = 0;
    //Isso ordena o json de acordo com o numero de likes, do maior pro menor
    while (em_ordem != 1) {
        // o em ordem controle pra reptição seguir
        em_ordem = 1;
        
        for (x = 0; x < Dados.portfolios.length - 1; x = x + 1) {
            //faz a ordenção do JSON de acordo com o número de likes
            if (Dados.portfolios[x].likes < Dados.portfolios[x + 1].likes) {
                //bubble sort pra ordernar o json tanto pros likes, tanto pros outros objetos do json
                valor = Dados.portfolios[x].likes;
                Dados.portfolios[x].likes = Dados.portfolios[x + 1].likes;
                Dados.portfolios[x + 1].likes = valor;

                valor = Dados.portfolios[x].id;
                Dados.portfolios[x].id = Dados.portfolios[x + 1].id;
                Dados.portfolios[x + 1].id = valor;

                valor = Dados.portfolios[x].image;
                Dados.portfolios[x].image = Dados.portfolios[x + 1].image;
                Dados.portfolios[x + 1].image = valor;
                //faz o loop acabar
                em_ordem = 0;
            }
        }
        //Agora que o json foi ordenado, exibimos a imagem de cada posição na tela
        document.getElementById('portfolio1').src=Dados.portfolios[0].image
        document.getElementById('portfolio2').src=Dados.portfolios[1].image
        document.getElementById('portfolio3').src=Dados.portfolios[2].image
        document.getElementById('portfolio4').src=Dados.portfolios[3].image
        document.getElementById('portfolio5').src=Dados.portfolios[4].image
    }

    //é mais um teste que comprova que o json foi ordenado
    console.log(JSON.stringify(Dados));
    

}
//chama as funções quando o botão for clicado
$(document).ready(function () { 
    document.getElementById('btnordenar').addEventListener('click', ordenacao);
    document.getElementById('btnordenar').addEventListener('click', muda_layout);
} )




