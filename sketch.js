var hx = 0;
var hy = 0;
var snakeC = [];
//var snakeP = [];
var prepos = [];
var dead = false;
var points = 0;
var fx = 725, fy = 525;
var dir = "D";
var speed = 50;
var keys = [];
var hpx = 0;
var hpy = 0;

function setup(){
  hx = 425;
  hy = 525;
  //snakeP.push([375,525,hx,hy]);
  createCanvas(1050,1050);
  frameRate(144);
  speed = 5;
  snakeC.push([425,525,"D"]);
  prepos.push([hx,hy]);
  keys.push(["D","D"]);
}

function gridlines(){
  stroke(255,255,255,150)
  for(var h = 0; h < 1050/50; h++){
    line(0,h*50,1500,h*50);
  }
  for(var v = 0; v < 1050/50; v++){
    line(v*50,0,v*50,1050);
  }
}
/*h=0,v=0
  h=0,v=50
*/
function showItems(){
  for(var v = 0; v < 1050/50; v++){
    for(var h = 0; h < 1050/50; h++){
      for(var i = 0; i < snakeC.length; i++){
        if(snakeC[i][0] >= v*50 && snakeC[i][0] < (v*50)+50){
          if(snakeC[i][1] >= h*50 && snakeC[i][1] < (h*50)+50){
            if(i === 0){
              fill("white");
            }else{
              fill(200);
            }
            rect(v*50,h*50,50,50);
          }
        }
      }
      if(fx >= v*50 && fx < (v*50)+50){
        if(fy >= h*50 && fy < (h*50)+50){
          fill("lightgreen");
          rect(v*50,h*50,50,50);
        }
      }
    }
  }
  //rect(snakeC[0][0],snakeC[0][1],50,50);
}

async function gridPos(sprite){
  return 25+floor(sprite/50)*50;
}

function eat(){
  if(hx === fx){
    if(hy === fy){
  //if(gridPos(snakeC[i][0]) >= fx && gridPos(snakeC[i][0]) < (fx)+50){
    //if(gridPos(snakeC[i][1]) >= fy && gridPos(snakeC[i][1]) < (fy)+50){
      fx = 0;
      fy = 0;
      points += 1;
      var last = snakeC.length - 1;
      snakeC.push([0,0,keys[last][0]]);
      keys.push([
        keys[snakeC.length-2][0],keys[snakeC.length-2][0]
      ]);
      /*if(snakeC.length === 2){
        snakeP.push([hx,hy,hx,hy]);
      }else{
        snakeP.push([snakeC[i][0],snakeC[i][1],snakeC[i][0],snakeC[i][1]]);
      }*/
    }
  }
}

function move(){
  /*if(keys.length>2){
    keys.shift();
  }
  if(keys.length>2){
    keys.shift();
  }*/
  /*for(var i = 0; i < keys.length; i++){
    if(keys[i].length>2){
      keys[i].shift();
    }
    if(keys[i].length>2){
      keys[i].shift();
    }
  }*/
  for(var i = 0; i < snakeC.length; i++){
    /*if(i = 0){
      if(!snakeP[i]){
        snakeP.push([hx,hy,hx,hy]);
      }else{
        if(snakeP[i][2] !== hx || snakeP[i][3] !== hy){
          snakeP[i].push(hx,hy);
        }
      }
      if(snakeP[i].length>4){
        snakeP[i].shift();
      }
      if(snakeP[i].length>4){
        snakeP[i].shift();
      }
    }else{
      if(!snakeP[i]){
        snakeP.push([snakeC[i][0],snakeC[i][1],snakeC[i][0],snakeC[i][1]]);
      }else{
        if(snakeP[i][2] !== snakeC[i][0] || snakeP[i][3] !== snakeC[i][1]){
          snakeP[i].push(snakeC[i][0],snakeC[i][1]);
        }
      }
      if(snakeP[i].length>4){
        snakeP[i].shift();
      }
      if(snakeP[i].length>4){
        snakeP[i].shift();
      }
    }
    console.log(
      "snakeC["+i+"]\nx: "+gridPos(snakeC[i][0])+"\ny: "+gridPos(snakeC[i][1])+
      "\nhx: "+hx+"\nhy: "+hy+"\n\n"+
      "snakeP["+i+"]\npx: "+snakeP[i][0]+"\npy: "+snakeP[i][1]+
      "\nx: "+snakeP[i][2]+"\ny: "+snakeP[i][3]
      );
    snakeC[i][0] = snakeP[i][0];
    snakeC[i][1] = snakeP[i][1];*/
    if(!prepos[i]){
      prepos.push([gridPos(snakeC[i][0]),gridPos(snakeC[i][1])]);
    }else{
      if(i === 0){
        if(prepos[i][0] !== gridPos(hx) || prepos[i][1] !== gridPos(hy)){
          prepos[i].push(gridPos(hx),gridPos(hy));
          if(prepos[i].length > 4){
            prepos[i].shift();
          }
          if(prepos[i].length > 4){
            prepos[i].shift();
          }
        }
      }else{
        if(prepos[i][0] !== snakeC[i][0] || prepos[i][1] !== snakeC[i][1]){
          prepos[i].push(prepos[i-1][2],prepos[i-1][3]);
          if(prepos[i].length > 4){
            prepos[i].shift();
          }
          
        }
      }
    }
  }
  console.log(prepos[2],hx,hy)
  if((keyDown('UP') || keyDown('W'))&& dir !== "S"){
    dir = "W";
    /*if(keys[0][1] !== dir){
      keys[0].push(dir);
    }
    for(var i = 1; i < keys.length; i++){
      if(keys[i][1] !== keys[i-1][0]){
        keys[i].push(keys[i-1][0]);
      }
    }*/
  }else if((keyDown('DOWN') || keyDown('S'))&& dir !== "W"){
    dir = "S";
    /*if(keys[0][1] !== dir){
      keys[0].push(dir);
    }
    for(var i = 1; i < keys.length; i++){
      if(keys[i][1] !== keys[i-1][0]){
        keys[i].push(keys[i-1][0]);
      }
    }*/
  }
  if((keyDown('RIGHT') || keyDown('D'))&& dir !== "A"){
    dir = "D";
    /*if(keys[0][1] !== dir){
      keys[0].push(dir);
    }
    for(var i = 1; i < keys.length; i++){
      if(keys[i][1] !== keys[i-1][0]){
        keys[i].push(keys[i-1][0]);
      }
    }*/
  }else if((keyDown('LEFT') || keyDown('A'))&& dir !== "D"){
    dir = "A";
    /*if(keys[0][1] !== dir){
      keys[0].push(dir);
    }
    for(var i = 1; i < keys.length; i++){
      if(keys[i][1] !== keys[i-1][0]){
        keys[i].push(keys[i-1][0]);
      }
    }*/
  }
  /*console.log(keys[0],keys[1]);
  for(var i = 0; i < keys.length; i++){
    if(keys[i].length>2){
      keys[i].shift();
    }
    if(keys[i].length>2){
      keys[i].shift();
    }
  }*/
  if(dir === "A"){
    snakeC[0][0] -= speed;
  }else if(dir === "D"){
    snakeC[0][0] += speed;
  }else if(dir === "W"){
    snakeC[0][1] -= speed;
  }else if(dir === "S"){
    snakeC[0][1] += speed;
  }
  for(var i = 1; i < snakeC.length; i++){
    /*if(keys[i-1][1] == "W"){
      snakeC[i][0] = snakeC[i-1][0];
      snakeC[i][1] = snakeC[i-1][1]-50;
      //snakeC[i][2] = keys[i-1][0];
    }
    if(keys[i-1][1] == "A"){
      snakeC[i][0] = snakeC[i-1][0]-50;
      snakeC[i][1] = snakeC[i-1][1];
      //snakeC[i][2] = keys[i-1][0];
    }
    if(keys[i-1][1] == "S"){
      snakeC[i][0] = snakeC[i-1][0];
      snakeC[i][1] = snakeC[i-1][1]+50;
      //snakeC[i][2] = keys[i-1][0];
    }
    if(keys[i-1][1] == "D"){
      snakeC[i][0] = snakeC[i-1][0]+50;
      snakeC[i][1] = snakeC[i-1][1];
      //snakeC[i][2] = keys[i-1][0];
    }*/
    snakeC[i][0] = prepos[i-1][0];
  snakeC[i][1] = prepos[i-1][1];
  snakeC[0][2] = dir;
  }
  
}

function checkFP(){
  var r = false;
  for(var i = 0; i < snakeC.length; i++){
    if(snakeC[i][0] >= fx*50 && snakeC[i][0] < (fx*50)+50){
      fx = 25+floor(random(0,20))*50;
      console.log("error placing food (for x)");
      r = true;
    }
    if(snakeC[i][1] >= fy*50 && snakeC[i][1] < (fy*50)+50){
      console.log("error placing food (for y)");
      fy = 25+floor(random(0,20))*50;
      r = true;
    }
  }
  if(r){
    r = false;
    checkFP();
  }
}

async function draw(){
  if(fx === 0 && fy === 0){
    fx = 25+floor(random(0,20))*50;
    fy = 25+floor(random(0,20))*50;
    checkFP();
  }
  hx = await gridPos(snakeC[0][0]);
  hy = await gridPos(snakeC[0][1]);
  background(0);
  textSize(200);
  textAlign(CENTER);
  text(points,500,145);
  eat();
  showItems();
  move();
  gridlines();
}