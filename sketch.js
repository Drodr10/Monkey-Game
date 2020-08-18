//Creates all of the global variables
var monkey, monkeyAnimation, bananaImage, bananaGroup, obstacleImage, obstacleGroup, ground;
var score = 0;
var back, backImage;

function preload(){
  //Loads all animations and images
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  backImage = loadImage("jungle.png");
}  

function setup() {
  createCanvas(400, 270);
  
  //Creates the background sprite and adds the image
  back = createSprite(200,140);
  back.addImage("background", backImage);
  back.scale = 1.4;
  //I didn't add velocity because the background image is too small
  
  //Creates and adds the monkey sprite and animation
  monkey = createSprite(50,200);
  monkey.addAnimation("monkey_running", monkeyAnimation);
  monkey.scale = 0.08;
  
  //Creates an invisible ground
  ground = createSprite(200,230,400,10);
  ground.visible = false;
  
  //Creates the banana and obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup(); 
}

function draw() {
  background(255);
  
  //Creates gravity and invisible floor to collide
  monkey.velocityY = monkey.velocityY + 0.7
  monkey.collide(ground);
  
  //Makes the monkey jump when space is pressed
  if(keyDown("space")&&monkey.y>190){
    monkey.velocityY = -12;
  }
  
  //Adds the score when the monkey touches a banana
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }  
  
  //Resets the score when the monkey touches a rock
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    score = 0;
  }  
  
  //Makes the monkey bigger the higher the score
  switch(score){
    case 0: monkey.scale = 0.08; break;
    case 10: monkey.scale = 0.09; break;
    case 20: monkey.scale = 0.10; break;
    case 30: monkey.scale = 0.11; break;
    default: break;
  }    
  
  //Calls the spawn banana and spawn obstacles function
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  
  //Adds the text to show the score
  fill("white")
  textSize(15);
  text("Score: "+ score, 300,40);
  
}

//Creates a banana sprite every 80 frames
function spawnBanana() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(400,random(80,200),10,40);
    banana.addImage(bananaImage);
    
    //Assigns velocity to the banana
    banana.velocityX = -7;
    
    //assign scale and lifetime to the banana           
    banana.scale = 0.05;
    banana.lifetime = 70;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

//Creates a obstacle sprite every 300 frames
function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,200,10,40);
    obstacle.addImage(obstacleImage);
    
    //Assigns velocity to the obstacle
    obstacle.velocityX = -9;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 50;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
