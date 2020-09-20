var obstacleGroup, foodGroup;
var backImg, bananaImg, obstacleImg, player_running;
var bg, ground, player, score;

function preload(){
  
  backImg = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",  "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg =  createSprite(200, 380, 400, 20);
  bg.addImg("background", backImg);
  
  player = createSprite(100, 350);
  player.addImg("player", player_running);
  player.scale = 0.1;
  
  ground = createSprite(200,360,400,10);
  ground.x = ground.width/2;
  ground.visibile = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
   
  stroke("white");
  textSize(20);
  fill("white");
}

function draw() {
  background(220);
  
  score = 0;
  
  text("Score: " + score, 500, 50);
  
    if (ground.x < 0){
        ground.x = ground.width/2;
    }

    if(foodGroup.isTouching(player_running)){
       score = score+2;
       foodGroup.destroyEach();
    }
     
    spawnBananas();
    spawnObstacles();
    
    switch(score){
      case 10: player.scale = 0.12;
        break;
      case 20: player.scale = 0.14;
        break;
      case 30: player.scale = 0.16;
        break;
      case 40: player.scale = 0.18;
        break;
      case 50: player.scale = 0.20;
        break;
        default: break;
    }

    if(obstacleGroup.isTouching(player)){
       player.scale = 0.1;  
    }
  
  drawSprites();
}

function spawnBananas() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,365,10,40);
    banana.velocityX = -6;
  
    //creates bananas at random positions
    banana.y = random(120,200);
    
    banana.addImage("Banana", bananaImg);
    
    //assign scale and lifetime to the banana         
    banana.scale = 0.05;
    banana.lifetime = 70;
    
    //add each obstacle to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,335,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage("Stone", obstacleImg);
    
    //assign scale and lifetime to the banana         
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}