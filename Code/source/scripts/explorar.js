
//função le dados

/*function read_portfoliodata() {
    let strDados = localStorage.getItem('ArtsyPages');
    let Dados = {};

    if (strDados) {
        Dados = JSON.parse(strDados);
    }
    else {
        Dados = {
            "portfolios": [
                { "id": 1, "likes": 4, "image": "./assets/img/img1.png" },
                { "id": 2, "likes": 5, "image": "./assets/img/img2.png" },
                { "id": 3, "likes": 2, "image": "./assets/img/img3.png" },
                { "id": 4, "likes": 3, "image": "./assets/img/img4.png" },
                { "id": 5, "likes": 1, "image": "./assets/img/img5.png" }
            ]
        }
    }
    console.log(JSON.stringify(Dados));
    return Dados;
}*/
/*
function salvaDados(dados) {
    localStorage.setItem('ArtsyPages', JSON.stringify(dados));
}*/



//Isso é para o botão mudar o layout quando for clicado
var isToggled = false;
function muda_layout() {
   let section = document.querySelector("section[class='secao2']");
    let layout = document.querySelector(".layout_ordenar");
    //let button=document.getElementById('btnordenar');
    isToggled = !isToggled;
    this.classList.toggle('active');
    if(isToggled==true){
        section.style.display = "none";
        layout.style.display = "grid";
    }else{
        section.style.display = "flex";
        layout.style.display = "none";
    }    
}

const ordem="http://localhost:3000/explorar";
function ordenacao(){
    fetch(ordem)
        .then (res=>res.json())
        .then(dados=>{
            console.log(dados);
            let x=0;
            let valor = 0;
            let em_ordem = 0;
            while(em_ordem!=1){
                em_ordem=1;
            }
            for (x = 0; x < dados.portfolios.length - 1; x = x + 1) {
                //faz a ordenção do JSON de acordo com o número de likes
                if (dados.portfolios[x].likes < dados.portfolios[x + 1].likes) {
                    //bubble sort pra ordernar o json tanto pros likes, tanto pros outros objetos do json
                    valor = dados.portfolios[x].likes;
                    dados.portfolios[x].likes = dados.portfolios[x + 1].likes;
                    dados.portfolios[x + 1].likes = valor;

                    valor = dados.portfolios[x].port_id;
                    dados.portfolios[x].port_id = dados.portfolios[x + 1].port_id;
                    dados.portfolios[x + 1].port_id = valor;

                    valor = dados.portfolios[x].image;
                    dados.portfolios[x].image = dados.portfolios[x + 1].image;
                    dados.portfolios[x + 1].image = valor;

                    valor = dados.portfolios[x].author;
                    dados.portfolios[x].author = dados.portfolios[x + 1].author;
                    dados.portfolios[x + 1].author = valor;

                    valor = dados.portfolios[x].user_id;
                    dados.portfolios[x].user_id = dados.portfolios[x + 1].user_id;
                    dados.portfolios[x + 1].user_id = valor;

                    valor = dados.portfolios[x].dislikes;
                    dados.portfolios[x].dislikes = dados.portfolios[x + 1].dislikes;
                    dados.portfolios[x + 1].dislikes = valor;
                    //faz o loop acabar
                    em_ordem = 0;
                }
            }
            //Agora que o json foi ordenado, exibimos a imagem de cada posição na tela
            document.getElementById('portfolio1').src=dados.portfolios[0].image
            document.getElementById('portfolio2').src=dados.portfolios[1].image
            document.getElementById('portfolio3').src=dados.portfolios[2].image
            document.getElementById('portfolio4').src=dados.portfolios[3].image
            document.getElementById('portfolio5').src=dados.portfolios[4].image
            //mostra que a ordem mudou;
            console.log(dados);
        })
}


/*function ordenacao() {
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

    
    

}*/
//chama as funções quando o botão for clicado
$(document).ready(function () { 
    document.getElementById('btnordenar').addEventListener('click', ordenacao);
    document.getElementById('btnordenar').addEventListener('click', muda_layout);
} )




