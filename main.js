// variáveis
const canvas = document.getElementById('Snake-Canvas');
const ctx = canvas.getContext('2d');
const box = 20;
let Snake = [{x: 10, y: 10}];
let food = {};
let direction = 'up';
let consumido = 0;
let speed = 150;

// desenhando a cobra 
function drawSnake() { 
    ctx.fillStyle = 'rgba(98, 172, 38, 1)';
    Snake.forEach( segment =>  {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = 'rgba(24, 77, 19, 1)';
        ctx.strokeRect(segment.x * box, segment.y * box,box,box);
  })
}

// funcão de se mover

  function MoveSnake(){
    const head = { x: Snake[0].x, y: Snake[0].y};
    switch(direction){
      case 'up':
        head.y --;
        break;

      case 'down':
        head.y ++;
        break;

      case 'left':
        head.x --;
        break;

      case 'right':
        head.x ++;
        break;
    } 

    if ( head.x < 0 || head.x >= canvas.width / box || head.y < 0 || head.y >= canvas.height / box) {

    clearInterval(game);
    alert('Perdeu! Deu de cara com a parede.');
    return;

  }

  if( Snake.some(segment => segment.x === head.x && segment.y === head.y)){

    clearInterval(game);
    alert('Perdeu! Se tocou!');
    return;

  }

    if ( head.x === food.x && head.y === food.y){
      food = randomFood();
      consumido ++;

      if ( consumido % 5 === 0){
        speed *= 0.3;
        clearInterval(game);
        game = setInterval(gameLoop,speed);
      }
    } else{
      Snake.pop();
    }
    Snake.unshift(head);
    

  }
  // desenhar o cenário
  function drawboard(){
    ctx.clearRect( 0 , 0 , canvas.width, canvas.height);

    for ( let i = 0; i < canvas.width / box; i++){
        for( let j = 0; j < canvas.height / box; j++ ){
          ctx.fillStyle = (i+j) % 2 === 0 ? '#ffffff': '#1D1D1D';
          ctx.fillRect( i * box, j * box, box,box);
        }
    }
  }



//Direção da cobrinha

document.addEventListener('keydown', e => {
  switch(e.key){
    
    case 'w':
      if(direction !=='down') direction = 'up';
      
      break;


    case 'a':
     if(direction !=='right') direction = 'left';
      
      break;

    case 's':
      if(direction !=='up') direction = 'down';
     
      break;


    case 'd':
      if(direction !=='left') direction = 'right';
      
      break;

  }

}) 



// comida em posição aleatória e desenha

function drawFood (){
  ctx.fillStyle = 'rgba(243, 51, 51, 1)';
  ctx.fillRect( food.x * box, food.y * box, box, box);
}

function randomFood (){
  let newfoodx, newfoody;
  do {
    newfoodx = Math.floor(Math.random() * (canvas.width / box));
    newfoody = Math.floor(Math.random() * (canvas.height / box));
  } while (Snake.some(segment => segment.x === newfoodx && segment.y === newfoody)); 
  return{ x: newfoodx, y: newfoody};
}

// Texto da pontuação

function textscore(){

  ctx.fillStyle = 'rgba(243, 51, 51, 1)';
  ctx.font = '30px Arial';
  ctx.fillText( `Score: ${consumido}`,10,30);

}



function gameLoop (){
  drawboard();
  MoveSnake();
  drawSnake();
  drawFood();
  textscore();
}
food = randomFood();
let game = setInterval( gameLoop, speed);


