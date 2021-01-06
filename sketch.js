var PLAY=1;
var END =0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(600,500);
  
  monkey = createSprite(50,460,20,50);
  monkey.addAnimation("running", monkey_running);
  //monkey.addAnimation("collided", monkey_collided);
  

  monkey.scale = 0.15;
  
  ground = createSprite(600,495,1200,10);
 // ground.addImage("ground",groundImage);
  ground.shapeColor ="Peru"
  ground.x = ground.width /2;

  invisibleGround = createSprite(200,490,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = new Group();
  bananaGroup = new Group();

  
   monkey.setCollider("circle",0,120,150);
   //monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background("DeepSkyBlue");
  //displaying score
  text("Score: "+ score, 450,50);
  
  console.log(gameState)
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
//     if(score>0 && score%100 === 0){
    
//     }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
  spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
     
     //change the trex animation
      //monkey.changeAnimation("collided", monkey_collided);
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
 
  //stop monkey from falling down
  monkey.collide(ground);
  drawSprites();
}



function reset(){
  

}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,465,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
 
     obstacle.addImage(obstacleImage);
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,420,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

