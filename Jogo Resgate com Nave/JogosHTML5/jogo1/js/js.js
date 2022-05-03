function start() 
{ 
        $("#inicio").hide();
                
        $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
        $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
        $("#fundoGame").append("<div id='inimigo2'></div>");
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

        var jogo = {};
        var velocidade=5;
        var posicaoY = parseInt(Math.random() * 334);
        var tecla = {
                W: 87,
                S: 83,
                D: 68
        };
        
	jogo.pressionou = [];

        $(document).keydown(function(e){
                jogo.pressionou[e.which] = true;
                });
        
                $(document).keyup(function(e){
                jogo.pressionou[e.which] = false;
                });
	
        jogo.timer = setInterval(loop,30);

        function loop() {

                movefundo();
                moveJogador()
                moveInimigo1();
        }  

        function movefundo() {
	
                esquerda = parseInt($("#fundoGame").css("background-position"));
                $("#fundoGame").css("background-position",esquerda-5);
        }     

        function moveJogador() {
	
                if (jogo.pressionou[tecla.W]) {
                        var topo = parseInt($("#jogador").css("top"));
                        $("#jogador").css("top",topo-10);

                        if (topo<=0) {
		
                                $("#jogador").css("top",topo+10);
                        }
                }
                
                if (jogo.pressionou[tecla.S]) {
                        
                        var topo = parseInt($("#jogador").css("top"));
                        $("#jogador").css("top",topo+10);	

                        if (topo>=434) {	
                                $("#jogador").css("top",topo-10);          
                        }
                }
                
                if (jogo.pressionou[tecla.D]) {
                        
                        //Chama fun��o Disparo	
                }
        
        } // fim da fun��o movejogador()
        
        function moveInimigo1() {

                posicaoX = parseInt($("#inimigo1").css("left"));
                $("#inimigo1").css("left",posicaoX-velocidade);
                $("#inimigo1").css("top",posicaoY);
                        
                        if (posicaoX<=0) {
                        posicaoY = parseInt(Math.random() * 334);
                        $("#inimigo1").css("left",694);
                        $("#inimigo1").css("top",posicaoY);
                                
                        }
        } //Fim da fun��o moveinimigo1()
}

	
