var timerId = null;//variavel que armazena a chamada da funcão settimeout
function iniciaGame() {
    var url = window.location.search;

    var level_game = url.replace("?", "");

    var tempo_segundos = 0;


    if (level_game == 1) { //1 fácil --> 120 segundos
        tempo_segundos = 120;
    }

    if (level_game == 2) { //2 Médio --> 60 segundos
        tempo_segundos = 60;
    }

    if (level_game == 3) { //1 Difícil --> 30 segundos
        tempo_segundos = 30;
    }

    // inserindo segundos no span

    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //quantidade de balões

    var quantidade_baloes = 60;
    cria_baloes(quantidade_baloes);
    
    //imprimir baloes inteiros
    
    document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes;
    
    //imprimir baloes estourados
    
    document.getElementById('baloes_estourados').innerHTML = 0;
    
    contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos){
    segundos = segundos - 1;
    
    if(segundos == -1){
        clearTimeout(timerId);//para a função do settimeout
        document.getElementById('cronometro').innerHTML = 'Game Over';
        s = document.getElementById('cronometro');
        s.style.fontSize = '50px';
        return false;
    }
    
    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function cria_baloes(quantidade_baloes){
    for(var i = 1; i <= quantidade_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/skull_low.png';
        balao.style.margin = '12px';
        balao.style.marginTop = '19px';
        balao.id = 'b' + i;
        balao.onclick = function(){estourar(this);}
        
        document.getElementById('cenario').appendChild(balao);
    }
}
function estourar(e){
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/skull_low_bullet.png';
    pontuacao(-1);
   // alert(id_balao)
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    baloes_inteiros = parseInt(baloes_inteiros);
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    baloes_estourados = parseInt(baloes_estourados);
    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;
    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    
    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    
    if(baloes_inteiros == 0){
        contagem_tempo(false);
        document.getElementById('cronometro').innerHTML = 'YOU WIN';
    }
    
}