var whale,whaleImg,kid1,kid2,kid3,alien1,alien2,alien3;
var kid=[];
var kidlength=2;
var alienLength=4;
var bg;
var background1;
var alien=[];
var kidsGroup;
var kids;
var aliensGroup;
var gameState="form";
var start;          
var lvl=0;                    
var restart,restartImg;
var count=0;

var win,lose;
var loser,winner;

function preload(){

 
  bg=loadImage("beeach.png");
whaleImg=loadImage("whale.png")
alien1=loadImage("alien.png");
alien2=loadImage("alien2.png");
alien3=loadImage("alien_.png");
kid1=loadImage("kid.png");
kid2=loadImage("kid1.png");
kid3=loadImage("kid2.png");
restartImg=loadImage("redo.png");
lose = loadImage("lose.jpg");
win = loadImage("Win.png");
loser = loadImage("loseWhale.png");
winner = loadImage("winWhale.png");
}




function setup() {
  createCanvas(displayWidth,displayHeight);
  //background1 = createSprite(displayWidth/2,displayHeight/2,1000,2000);
//background1.addImage(bg);
//background1.scale=1.75; 

  whale = createSprite(width/2,height-100);
whale.addImage(whaleImg);
whale.scale=0.325;
  start=createSprite(width/2,height-28,displayWidth,1)
  start.shapeColor="black";
  restart=createSprite(displayWidth-100,50);
  restart.scale=0.35
  restart.addImage(restartImg);
  
  kidsGroup=new Group();
  aliensGroup=new Group();

   if(gameState==="form"){
     input=createInput("Name");
   input.position(displayWidth/2,displayHeight/2);
   
 button=createButton("Play");
 button.position(displayWidth/2+160,displayHeight/2);
 }
}

function draw() {
  
background(bg);
console.log();
button.mousePressed(formEnd);
play();
createAliens();
createKids();
moveWhale();
end();
fill("black");
text(""+input.value(),whale.x+100,whale.y);
console.log(whale.y);
if(frameCount%2000==0){
  kidsGroup.destroyEach();
}
if(frameCount%2000==0){
  aliensGroup.destroyEach();
}
if(whale.isTouching(kidsGroup)){
  count=1;
  
  if(count===1){
  var x=Math.round(random(1,3))
  console.log(x);
  switch(x){
    case 1:{
      whale.y=whale.y-2;
      count=0;
      break
    }
    case 2:{
      whale.x=whale.x+2
      count=0;
      break
    }
    case 3:{
      whale.x=whale.x-2;
      count=0;
      break
   }
  }
 }
}
if(whale.isTouching(aliensGroup)){
  whale.y=whale.y+2;
}

  drawSprites();
}


function createKids(){
  
  if(gameState==="play"){
  if(frameCount%300===0){
    var y=Math.round(random(1,3));
    for(var i=0;i<=kidlength;i++){
      kids=createSprite(10,10,20,20);
      kids.x=Math.round(random(10,width-100));
      kids.y=Math.round(random(100,height-100));
      kidsGroup.add(kids);
      
     
      
      switch(y){
        case 1:{
          kids.addImage(kid1);
          kids.scale=0.25;
          break
        }
        case 2:{
          kids.addImage(kid2);
          kids.scale=0.25;
          break
        }
        case 3:{
          kids.addImage(kid3);
          console.log(kid3);
          kids.scale=0.25;
          break
     }
    }
   }
  }
 }
}

function moveWhale(){
if(gameState==="play"){
  if(keyDown(UP_ARROW)){
    whale.y=whale.y-0.075;
  }
  if(keyDown(DOWN_ARROW)){
    whale.y=whale.y+0.075;
  }
  if(keyDown(LEFT_ARROW)){
    whale.x=whale.x-0.8;
  }
  if(keyDown(RIGHT_ARROW)){
    whale.x=whale.x+0.8;
  }
 }
}

function createAliens(){
if(gameState==="play"){
  if(frameCount%300===0){
    var r=Math.round(random(1,3));
    for(var i=0;i<=alienLength;i++){
      aliens=createSprite(10,10,20,20);
      aliens.x=Math.round(random(10,width-100));
      aliens.y=Math.round(random(100,height-100));
      aliensGroup.add(aliens);
     
     
      
      switch(r){
        case 1:{
          aliens.addImage(alien1);
          aliens.scale=0.25;
          break
        }
        case 2:{
          aliens.addImage(alien2);
          aliens.scale=0.25;
          break
        }
        case 3:{
          aliens.addImage(alien3);
          aliens.scale=0.25;
          break
     }
    } 
   }
  }
 }
}

function play(){
  if(gameState==="play"){
    restart.visible=false;
 }
}

function end(){
  if(whale.y>980){
    gameState="end";
    whale.addImage(loser);
    background(lose);
    textSize(100);
    fill("red");
    stroke("black");
    text("You Lost Click To Restart!",displayWidth/4,displayHeight/2);
    restart.visible=true;
    aliensGroup.destroyEach();
    kidsGroup.destroyEach();
    whale.velocityY=0;
  }
  else if(whale.y<50){
    whale.addImage(winner);
    gameState="end";
    background(win);
    textSize(100);
    fill("Green");
    stroke("black");
    text("You Won Click To Restart!",displayWidth/4,displayHeight/2);
    restart.visible=true;
    aliensGroup.destroyEach();
    kidsGroup.destroyEach();
    whale.velocityY=0;
  }
  if(mousePressedOver(restart)&&gameState==="end"){
    gameState="play";
    whale.addImage(whaleImg);
    whale.x=displayWidth/2;
    whale.y=displayHeight-100;
    restart.visible=false;
    background(bg);
    
 }
}


function formEnd(){
  gameState="play";
  input.hide();
  button.hide();
}
