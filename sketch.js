var balloon,backgroundImg;
var database,baloonImg, position;
function preload(){
 backgroundImg=loadImage("images/Hot Air Ballon-01.png");
baloonImg=loadImage("images/Hot Air Ballon-02.png");
}
function setup() {
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon=addAnimation(baloonImg);
  database=firebase.database();
  position=database.ref("balloon/position");
  position.on("value",readPosition,showError);
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.x=position.y;
}
function showError(){
  console.log("error");
}
function writePosition(x,y){
  database.ref("balloon/position").set({
    "x":position.x+x,
    "y":position.y+y
  })
}
function draw() {
  background(backgroundImg);  
  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10)
  }
  else if (keyDown(DOWN_ARROW)){
    writePosition(0,10)
  }
  drawSprites();
}