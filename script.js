
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const scale = 10;
const nombrePosX = canvasWidth/scale; //nombre de position en x que pourais occuper la tete du serpent
const nombrePosY = canvasHeight/scale;//nombre de position en x que pourais occuper la tete du serpent



//creation de  du serpent
const serpent = {
	x:0,
	y:0,
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
				serpent.xVitess = 0;
				serpent.yVitess = 1*scale;
				break;
			case "up":
				serpent.xVitess = 0;
				serpent.yVitess = -1*scale;
				break;
			case "right":
				serpent.yVitess = 0;
				serpent.xVitess = 1*scale;
				break;

			case "left":
				serpent.yVitess = 0;
				serpent.xVitess = -1*scale;
				break;
			default:
				// statements_def
				break;
		}
	},
	mange:function(pomme){
		if(this.x == pomme.x && this.y == pomme.y){
			this.total++;
			return true;
		}
			
		else
			return false;
	}

}

//creation de la pomme

const pomme = {
	x:0, 
	y:0,

	draw:function(){
		ctx.fillStyle="red";
		ctx.fillRect(this.x,this.y,10,10);
	},

	changePosition:function(){
		this.x = (Math.floor(Math.random()*nombrePosX-1)+1)*scale;
		this.y = (Math.floor(Math.random()*nombrePosY-1)+1)*scale;
	}
}




//creation du jeux lui meme

function gameSetUp(){


	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	
	pomme.draw();
	serpent.draw();
	serpent.seDeplacer();

	if(serpent.mange(pomme)){
		pomme.changePosition();
	}	

	
	window.setTimeout(gameSetUp,200);
}


//controle par le clavier
window.addEventListener("keydown", (event)=>{
	let direction = event.key.replace("Arrow","").toLowerCase();
	serpent.changeDirection(direction);
}, false)

gameSetUp();








