window.onload = function(){
  const c = document.getElementById('canvas');
  c.width = window.innerWidth;
  c.height = 600;

  const ctx = c.getContext('2d');

  const environment = new Environment(c, ctx);
  const bird = new Bird(250, 300, ctx);
  const pipes = [];
  let pipeSet = generateRandomPipes(ctx, c.width, c.height);
  pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(function(){
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
}, 2600);
  gameLoop();


  /*
   MAIN GAME LOOP
  */
  function gameLoop(){
    ctx.fillRect(0,0,c.width,c.height);
    environment.update();
    environment.render();
    pipes.forEach(function(pipe1){
      pipe1.update();
      pipe1.render();
    });
    bird.update(pipes);
    bird.render();
    if (bird.dead){
        console.log("you lose");
        drawGameOver(ctx,c);
        return;
    }

    window.requestAnimationFrame(gameLoop);
  }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
  let lengthTop = Math.round(Math.random()*200+50);
  let lengthBottom = canvasHeight - 300 - lengthTop;
  let returnVal = { };
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 4, ctx);
  return returnVal;
}
function drawGameOver(ctx,c){
    ctx.font = "30px Verdana";
    ctx.fillText("Game Over!!"c.width/2, c.height/2);
}
