var population_size = 20;
var x_you = 375, y_you = 225, distance1, distance2, distance3, distance4, score = [], sigm1, sigm2, act1, act2, dx = 0, dy = 0, aux, mutation, mid, motor1 = 0, motor2 = 0, motor3 = 0, motor4 = 0, novo = [];
var i, j, x, hidden1, hidden2, hidden3, hidden4, count = 0, generation = 0, sum_score, r, soma, escolhido = 0, population = [];
var max_stars = 100, tam_stars = [], x_stars = [], y_stars = [];
var second_count = 0, status_anomalia = 0, position_anomalia, status = 0, score_max = 0;
var tecla_esquerda = false, tecla_cima = false, tecla_direita = false, tecla_baixo = false;
// stars generation
for(i = 0; i < max_stars; i++){
	tam_stars[i] = Math.floor(Math.random()*5);
	x_stars[i] = Math.floor(Math.random()*800);
	y_stars[i] = Math.floor(Math.random()*500);
}
// population inicial
function gerar_population(){
	for(i = 0; i < population_size; i++){
		population[i] = [];
		score[i] = 0;
		for(j = 0; j < 30; j++){
			population[i][j] = (Math.random()*2)-1;
		}
	}
}
gerar_population();
// stars print
window.onload = function(){
	for(i = 0; i < max_stars; i++){
		document.getElementById("stars").innerHTML += ("<div style='position:absolute;height:"+tam_stars[i]+"px;width:"+tam_stars[i]+"px;background-color:#fff;top:"+y_stars[i]+"px;left:"+x_stars[i]+"px;border-radius:50%;'></div>");
	}
	document.getElementById("stars").innerHTML += ("<div style='position:absolute;height:50px;width:800px;background-color:#cccccc;top:500px;left:0px;border-top-left-radius:50%;border-top-right-radius:50%;'></div>");
}
// modo
function manual(){
	status = 1;
	document.getElementById("status").innerHTML = ("<p>Jogando sozinho</p>");
	score_max = 0;
	count = 0;
	dx = 0;
	dy = 0;
	generation = 0;
	score[0] = 0;
	x_you = 375;
	y_you = 225;
}
function automatico(){
	status = 0;
	document.getElementById("status").innerHTML = ("<p>Aprendendo</p>");
	gerar_population();
	x_you = 375;
	y_you = 225;
	dx = 0;
	dy = 0;
	score_max = 0;
	count = 0;
	generation = 0;
}
function aprendido(){
	status = 2;
	document.getElementById("status").innerHTML = ("<p>Melhor geração</p>");
	x_you = 375;
	y_you = 225;
	dx = 0;
	dy = 0;
	score_max = 0;
	count = 0;
	generation = 0;
	score[0] = 0;
}
// captura teclas
window.onkeydown = function(e){
	if(e.keyCode == 87){
		tecla_cima = true;
	}
	if(e.keyCode == 83){
		tecla_baixo = true;
	}
	if(e.keyCode == 65){
		tecla_esquerda = true;
	}
	if(e.keyCode == 68){
		tecla_direita = true;
	}
}
window.onkeyup = function(e){
	if(e.keyCode == 87){
		tecla_cima = false;
	}
	if(e.keyCode == 83){
		tecla_baixo = false;
	}
	if(e.keyCode == 65){
		tecla_esquerda = false;
	}
	if(e.keyCode == 68){
		tecla_direita = false;
	}
}
// loop game
setInterval(function(){
	
	distance1 = x_you;
	distance2 = y_you;
	distance3 = 800-(x_you+50);
	distance4 = 500-(y_you+50);

	if(status == 2){
		// pesos melhor geração

		population[count][0] = -0.7462410798279022;
		population[count][1] = -0.5663956580070195;
		population[count][2] = 0.5472435211819264;
		population[count][3] = 0.44377038780034317;
		population[count][4] = 0.27421482494170735;
		population[count][5] = 0.6629843474436137;
		population[count][6] = -0.9347803206404202;
		population[count][7] = -0.29317308747705684;
		population[count][8] = -0.529776685094224;
		population[count][9] = 0.6351663015874833;
		population[count][10] = -0.7898703633897428;
		population[count][11] = 0.8298407077202485;
		population[count][12] = 0.10375569415767716;
		population[count][13] = 0.11640866268132077;
		population[count][14] = -0.8346849506555445;
		population[count][15] = 0.926066259116344;
		population[count][16] = -0.37407153816324734;
		population[count][17] = -0.9537149513292253;
		population[count][18] = 0.8343582209997291;
		population[count][19] = 0.28574847050731367;
		population[count][20] = 0.7907056707822628;
		population[count][21] = 0.7393178726480698;
		population[count][22] = -0.5305966659741905;
		population[count][23] = 0.08809384653629437;
		population[count][24] = 0.04163900827550937;
		population[count][25] = 0.8229842319332199;
		population[count][26] = -0.940937419465864;
		population[count][27] = 0.40381248326187014;
		population[count][28] = -0.9347803206404202;
		population[count][29] = -0.29317308747705684;
	}
	// 4 hidden neurons
	hidden1 = (population[count][0]*distance1)+(population[count][1]*distance2)+(population[count][2]*distance3)+(population[count][3]*distance4)+population[count][4];
	hidden2 = (population[count][5]*distance1)+(population[count][6]*distance2)+(population[count][7]*distance3)+(population[count][8]*distance4)+population[count][9];
	hidden3 = (population[count][10]*distance1)+(population[count][11]*distance2)+(population[count][12]*distance3)+(population[count][13]*distance4)+population[count][14];
	hidden4 = (population[count][15]*distance1)+(population[count][16]*distance2)+(population[count][17]*distance3)+(population[count][18]*distance4)+population[count][19];
	// outputs
	act1 = (hidden1*population[count][20])+(hidden2*population[count][21])+(hidden3*population[count][22])+(hidden4*population[count][23])+population[count][24];
	act2 = (hidden1*population[count][25])+(hidden2*population[count][26])+(hidden3*population[count][27])+(hidden4*population[count][28])+population[count][29];
	// activation function
	sigm1 = 1/(1+Math.exp(-act1));
	sigm2 = 1/(1+Math.exp(-act2));

	motor1 = 0;
	motor2 = 0;
	motor3 = 0;
	motor4 = 0;

	if(status == 0 || status == 2){
		if(sigm1 < 0.4){
			dy -= 0.01;
			motor2 = 1;
		}
		if(sigm2 < 0.4){
			dx -= 0.01;
			motor4 = 1;
		}
		if(sigm2 > 0.6){
			dx += 0.01;
			motor3 = 1;
		}
		if(sigm1 > 0.6){
			dy += 0.01;
			motor1 = 1;
		}
	}else if(status == 1){
		if(tecla_cima){
			motor2 = 1;
			dy -= 0.01;
		}
		if(tecla_esquerda){
			motor4 = 1;
			dx -= 0.01;
		}
		if(tecla_direita){
			motor3 = 1;
			dx += 0.01;
		}
		if(tecla_baixo){
			motor1 = 1;
			dy += 0.01;
		}
	}

	if(x_you >= 0 && x_you <= 750 && y_you >= 0 && y_you <= 450){
		y_you += dy;
		x_you += dx;
		score[count] += 0.01;
	}else{
		x_you = 375;
		y_you = 225;
		dx = 0;
		dy = 0;
		if(status == 0){
			count++;
			if(count == population_size){
				generation++;
				// selection
				sum_score = 0;
				for(i = 0; i < population_size; i++){
					sum_score += score[i];
				}
				for(i = 0; i < population_size; i++){
					r = Math.floor(Math.random()*sum_score);
					soma = 0;
					for(j = 0; j < population_size; j++){
						soma += score[j];
						if(r < soma){
							escolhido = j;
							break;
						}
					}
					novo[i] = population[escolhido];
				}
				for(i = 0; i < population_size; i++){
					population[i] = novo[i];
				}
				// crossover
				for(i = 0; i < population_size; i+=2){
					if(Math.floor(Math.random()*10) <= 8){
						mid = Math.floor(Math.random()*30);
						novo[i] = population[i].slice(0, mid).concat(population[i+1].slice(mid, 30));
						novo[i+1] = population[i].slice(mid, 30).concat(population[i+1].slice(0, mid));
					}else{
						novo[i] = population[i];
						novo[i+1] = population[i+1];
					}
				}
				for(i = 0; i < population_size; i++){
					population[i] = novo[i];
				}
				// mutation
				for(i = 0; i < population_size; i++){
					for(j = 0; j < 30; j++){
						mutation = Math.floor(Math.random()*100);
						if(mutation == 1){
							population[i][j] = (Math.random()*2)-1;
						}
					}
				}
				for(i = 0; i < population_size; i++){
					score[i] = 0;
				}
				count = 0;
			}
		}
		for(i = 0; i < population_size; i++){
			score[i] = 0;
		}
	}
	dy += 0.005;
	second_count += 0.01;
	if(second_count >= 5){
		status_anomalia = !status_anomalia;
		second_count = 0;
		if(status_anomalia){
			position_anomalia = 650*Math.round(Math.random());
		}
	}
	document.getElementById("canvas").innerHTML = ("");
	if(status_anomalia){
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;height:150px;width:150px;top:175px;left:"+position_anomalia+"px;border-radius:50%;background:radial-gradient(white,black);'></div>");
		if(position_anomalia == 0){
			dx -= 0.005;
		}else{
			dx += 0.005;
		}
	}
	document.getElementById("canvas").innerHTML += ("<div style='position:absolute;height:50px;width:50px;background-color:#3366ff;top:"+y_you+"px;left:"+x_you+"px;z-index:15;'></div>");
	if(motor1){
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:45px solid orange;border-left:25px solid transparent;border-right:25px solid transparent;border-top:10px solid transparent;top:"+(y_you-50)+"px;left:"+x_you+"px;z-index:10;'></div>");
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:25px solid red;border-left:10px solid transparent;border-right:10px solid transparent;border-top:25px solid transparent;top:"+(y_you-50)+"px;left:"+(x_you+15)+"px;z-index:11;'></div>");
	}
	if(motor2){
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:10px solid transparent;border-left:25px solid transparent;border-right:25px solid transparent;border-top:45px solid orange;top:"+(y_you+50)+"px;left:"+x_you+"px;z-index:10;'></div>");
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:25px solid transparent;border-left:10px solid transparent;border-right:10px solid transparent;border-top:25px solid red;top:"+(y_you+50)+"px;left:"+(x_you+15)+"px;z-index:11;'></div>");
	}
	if(motor3){
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:25px solid transparent;border-top:25px solid transparent;border-left:10px solid transparent;border-right:45px solid orange;top:"+y_you+"px;left:"+(x_you-50)+"px;z-index:10;'></div>");
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:10px solid transparent;border-top:10px solid transparent;border-left:25px solid transparent;border-right:25px solid red;top:"+(y_you+15)+"px;left:"+(x_you-50)+"px;z-index:11;'></div>");
	}
	if(motor4){
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:25px solid transparent;border-top:25px solid transparent;border-left:45px solid orange;border-right:10px solid transparent;top:"+y_you+"px;left:"+(x_you+50)+"px;z-index:10;'></div>");
		document.getElementById("canvas").innerHTML += ("<div style='position:absolute;border-bottom:10px solid transparent;border-top:10px solid transparent;border-left:25px solid red;border-right:25px solid transparent;top:"+(y_you+15)+"px;left:"+(x_you+50)+"px;z-index:11;'></div>");
	}
	if(score[count] > score_max){
		score_max = score[count];
	}
	document.getElementById("dados").innerHTML = ("");
	document.getElementById("dados").innerHTML += ("<p>Distância1: "+Math.round(distance1)+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Distância2: "+Math.round(distance2)+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Distância3: "+Math.round(distance3)+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Distância4: "+Math.round(distance4)+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Sigma1: "+Math.round(sigm1*1000000)/1000000+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Sigma2: "+Math.round(sigm2*1000000)/1000000+"</p>");
	document.getElementById("dados").innerHTML += ("<p>População: "+(count+1)+"/20</p>");
	document.getElementById("dados").innerHTML += ("<p>Geração: "+(generation+1)+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Score: "+Math.round(score[count]*100)/100+"</p>");
	document.getElementById("dados").innerHTML += ("<p>Score máximo: "+Math.round(score_max*100)/100+"</p>");
},10);