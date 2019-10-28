
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// variables
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var gameover = new Image();
var ghost = new Image();
var crash = false;

bird.src = "assets/bird.png";
bg.src = "assets/bg.png";
fg.src = "assets/fg.png";
pipeNorth.src = "assets/pipeNorth.png";
pipeSouth.src = "assets/pipeSouth.png";
gameover.src = "assets/gameoverred.png";
ghost.src = "assets/ghostbig1.png";

// the bird X and Y positions.
var bX = 10;
var bY = 150;

// gap: is the gap in pixels between the south Pipe and North Pipe.
var gap = 95;

// the constant is the south Pipe position, and it is calculating by adding the gap to the north Pipe.
var constant = pipeNorth.height + gap;

// the bird falls by 1.0 pixels at a time.
var gravity = 1;

// we initiate the players score
var score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();
var endgame = new Audio();
var startgame = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
endgame.src = "sounds/gameover.mp3";
startgame.src = "sounds/game.mp3";

// methods JavaScript
document.addEventListener("keydown", moveUp);
document.addEventListener("keyup", changeBird);
document.addEventListener("click", start);

// functions
function start(){
  startgame.play();
}

function moveUp() {
  bY -= 25;
  fly.play();
  bird.src = "assets/birdup.png";
}

function changeBird() {
  bird.src = "assets/bird.png";
}

// Pipe coordinates
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// Draw images
function draw() {

  if (!crash) {
    
    // create images
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);
  
    // positions of the pipes
    for (var i = 0; i < pipe.length; i++) {
  
      ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
  
      pipe[i].x--;
  
      if (pipe[i].x == cvs.width - 238) {
        pipe.push({
          x: cvs.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
      }
  
      // detect collision
      if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
        && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
        ctx.drawImage(gameover, -50, 50);
        endgame.play();
        ctx.drawImage(ghost, bX, bY);
        //location.reload();  
        crash = true;  
      }

      //set time to reload
      if (crash) { setTimeout(() => {
        location.reload(); //reload the page 

      }, 2000)}
      
     
      // score increment
      if (pipe[i].x == 5) {
        score++;
        scor.play();
      }
    }
  
    // score style
    ctx.fillStyle = "#fe0016";
    ctx.font = "28px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20)
    
    bY += gravity;
   
    requestAnimationFrame(draw);
  }
}

draw();
