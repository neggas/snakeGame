
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const scale = 10;
let speedFlow = 100;
const nombrePosX = canvasWidth/scale; //nombre de position en x que pourais occuper la tete du serpent
const nombrePosY = canvasHeight/scale;//nombre de position en x que pourais occuper la tete du serpent


function levelUp(total)
{
	if(total%5 === 0)
		return true;
	else
		return false;
}

var d = "right"; //la direction global
 	


//creation de  du serpent
const serpent = {
	x:canvas.width/2,
	y:canvas.height/2,
	xVitess:1*scale,
	yVitess:0,
	total:0,
	queu:[],

	draw:function(){

		//on dessine toutes les tete presentes dans le corps du serpent
		ctx.fillStyle="blue";

		//dessinne toute les queu du serpent
		for (let i=0; i<this.queu.length; i++) {
      		ctx.fillRect(this.queu[i].x, this.queu[i].y, scale, scale);
    	}
		ctx.fillRect(this.x,this.y,scale,scale);
		
	},
	
	gameOver:function(){
		let isOver = false; 
		for(var q =0 ; q<this.queu.length;q++){
			if(this.x == this.queu[q].x && this.y == this.queu[q].y){
				isOver = true;	
				break;
						
			}
		}
		return isOver;
	},

	seDeplacer:function(){

		//on ajoute une queu a chaque raffaichiseement
		for (let i=0; i<this.queu.length - 1; i++) {
      		this.queu[i] = this.queu[i+1];
    	}

    	this.queu[this.total - 1] = { x: this.x, y: this.y };
    	

		this.x += this.xVitess;
		this.y += this.yVitess;

		if(this.x+scale > canvasWidth)
		{
			this.x = 0;

		}

		else if(this.x < 0)
		{
			this.x = canvasWidth;
		}

		if(this.y + scale > canvasHeight)
		{
			this.y = 0;

		}
		else if(this.y < 0)
		{
			this.y = canvasHeight;
		}
	},

	//la fonction qui permet  l'nteraction de l'utilisateur
	changeDirection:function(direction){

		switch (direction)
		{
				
			case "down":
				if(d != "up"){
					serpent.xVitess = 0;
					serpent.yVitess = 1*scale;
					d = direction ;				
				}
				break;
			case "up":
				if(d != "down"){
					serpent.xVitess = 0;
					serpent.yVitess = -1*scale;	
					d = direction ;			
				}
				
				break;
			case "right":
				if(d != "left"){
					serpent.yVitess = 0;
					serpent.xVitess = 1*scale;
					d = direction ;				
				}
				
				break;

			case "left":
				if(d != "right"){
					serpent.yVitess = 0;
					serpent.xVitess = -1*scale;
					d = direction ;				
				}
				
				break;
			default:
				// statements_def
				break;
		}
		//on donne la direction temporaire à la direction global pour pouvoir verifier;
	},
	mange:function(pomme){
		if(this.x == pomme.x && this.y == pomme.y){
			document.getElementById("eat").play();
			this.total++;
			return true;
		}
			
		else
			return false;
	}

}

//creation de la pomme

const pomme = {
	x:(Math.floor(Math.random()*nombrePosX-1)+1)*scale, 
	y:(Math.floor(Math.random()*nombrePosY-1)+1)*scale,

	draw:function(){
		ctx.fillStyle="red";
		ctx.fillRect(this.x,this.y,10,10);
	},

	changePosition:function(){
		this.x = (Math.floor(Math.random()*nombrePosX-1)+1)*scale;
		this.y = (Math.floor(Math.random()*nombrePosY-1)+1)*scale;
	},
	
	conflictWithSnake:function(snake){
		for(var qs =0;qs<snake.queu.length;qs++){
			if(this.x == snake.queu[qs].x && this.y == snake.queu[qs].y){
				this.changePosition();
				break;
			}
		}
	}
}




//creation du jeux lui meme

function gameSetUp(){


	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	pomme.conflictWithSnake(serpent);
	pomme.draw();
	serpent.draw();
	if(serpent.gameOver()){
		return ;	
	}
	serpent.seDeplacer();

	if(serpent.mange(pomme))
		pomme.changePosition();	
	window.setTimeout(gameSetUp,100);	
}


//controle par le clavier
window
.addEventListener("keydown", (event)=>{
	let direction = event.key.replace("Arrow","").toLowerCase();
	serpent.changeDirection(direction);
}, false)


gameSetUp();








