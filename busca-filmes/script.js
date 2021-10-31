function pegarId(){
    const pegarNomeId = location.search.substr(4)
    $.ajax({
        "url" : `https://www.omdbapi.com/?apikey=b1d50f7f&i=${pegarNomeId}&plot=full`, 
        "success" : function(result){
            let filmes = new Filmes(result);
            filmes.mostrarFilmes()
            
        },
        'error':function(erro){
        }
      });
}
if(location.search)
pegarId()

$('.botao').click(function(event){
    event.preventDefault()
    let resposta = $('.resposta').val().split(" ")
    let conversao = resposta.join(`+`)
    $.ajax({
        "url" : `https://www.omdbapi.com/?apikey=708a483d&S=${conversao}`,
        "success" : (req)=>{
            console.log(req)
                let recebe = req.Search
                console.log(recebe)
                let contador = 0;
                if(req.Response == 'False'){
                    $('#posicao-filmes').html('<h1 class="erro">Filme indisponível</h1>')
                    throw new Error ("filme não encontrado")
                }else
                for(let i = 0; i < recebe.length; i++){
                    if(recebe[i].Type == 'movie' || recebe[i].Type == 'series'|| recebe[i].Type == 'documentary'){   
                        contador++
                        let filmes = new Filmes(recebe[i]);
                        filmes.contador = contador
                        

            $.ajax({

            "url" : `https://www.omdbapi.com/?apikey=708a483d&t=${recebe[i].Title}&plot=full`,
            "success" : (req)=>{
                filmes.pegaInfo(req.Plot)

             
                },
            
            'error':function(erro){
                $('#posicao-filmes').html('<h1>FILME NÃO ENCONTRADO!</h1>')
            }
            });
                filmes.mostrarFilmes()
            }}

            
            
        },
        'error':function(erro){
       console.log('deu erro')      
        }
      });
});


class Filmes{
    constructor(results){
        this.contador = 0;
        this.img = results.Poster;
        this.nome = results.Title;
        this.descricao = results.Plot;
        this.ano = results.Year;
        this.lancamento = results.Released;
        this.duracao = results.Runtime;
        this.genero = results.Genre;
        this.diretor = results.Director;

    }

     pegaInfo(descricao, genero, duracao){
        this.descricao = descricao;
        this.genero = genero;
        this.duracao = duracao;
    }    


    mostrarFilmes(){
        $(`#posicao-filmes`).html(`<div id="posicao-filmes"></div>`)

        setTimeout(() => {
            
             $(`#posicao-filmes`).append(`
           <div class="filmes">
            <h1 class='titulo'>${this.nome}</h1>
            <button type="button" class="btn" data-toggle="modal" data-target="#exampleModal${this.contador}"><img src = ${this.img}></button>
            
            <div class="modal fade" id="exampleModal${this.contador}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div id="modalTeste" class="modal-content ">
                        <div class="modal-header">
                            <h1  class="modal-title titulo texto" id="exampleModalLabel">${this.nome}</h1>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src = ${this.img}>
                            <p class='texto descricao'>${this.descricao}</p>
                            <p class='texto'>${this.ano}</p><p>||</p><p class='texto'>${this.genero}</p><p>||</p><p class='texto'>${this.duracao}</p>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
            
            `)
        }, 500);              
    }

   
}


