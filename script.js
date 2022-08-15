

var arr = new Array(9);
for (var i = 0; i < 9; i++) {
    arr[i] = new Array(9);
}
var flag=0;
document.addEventListener('reload',(event)=>{
    event.preventDefault();
})

document.querySelectorAll(".button_edit")[0].addEventListener('click',(event)=>{
    document.location.reload();
})

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        var element=document.querySelectorAll("table")[0].rows[i].cells[j].querySelectorAll("input")[0];
        element.autocomplete="off";
    }
}


// changing color on input
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        var element=document.querySelectorAll("table")[0].rows[i].cells[j].querySelectorAll("input")[0];
        element.addEventListener("change",function(event){
               event.target.style.backgroundColor="green";
        })
    }
}

//changing color on backtracking
function changecolor(x,y,store,color){
   var speed=document.querySelector("input[type=range]").value;
   speed=(100-speed)*10;
   return new Promise((resolve, reject) => {
    setTimeout(()=>{
        document.querySelectorAll("table")[0].rows[x].cells[y].querySelectorAll("input")[0].style.backgroundColor=color;
        document.querySelectorAll("table")[0].rows[x].cells[y].querySelectorAll("input")[0].value=store;    
        resolve("done");
    }, speed)
       
   });
  
}

function validate(){
    // console.log("ave che");
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if((arr[i][j]<=9 && arr[i][j]>=1 && isvalid(i,j)) || (arr[i][j]==-1)){
                continue;
            }
            else{
                console.log(arr[i][j]);
                
                return false;
            }
        }
    }
    return true;
}
document.querySelectorAll(".closebutton")[0].addEventListener(".click", function () {
      document.location.reload();
      flag=0;
});

function handledialogbox(){
    flag=1;
    var dialogpage=document.querySelectorAll("#dialogpage")[0];
    dialogpage.style.display="block";
    var sudoku=document.querySelectorAll(".flex-container")[0];
    sudoku.style.opacity=0.1;
    var canvas=document.querySelectorAll("#canvas")[0];
    canvas.style.opacity=0.1;
}

document.querySelectorAll("button")[1].addEventListener("click", function () {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j] = parseInt(
                document.querySelectorAll("table")[0].rows[i].cells[j].querySelectorAll("input")[0].value
            );
            if (isNaN(arr[i][j])) arr[i][j] = -1;
        }
    }
    if(!validate()){
       handledialogbox();
    }
    else{
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
               if(arr[i][j]== -1) arr[i][j] = 0;
            }
        }
        backtracking(0, 0);
    }
    
});


//backtracking code
function isvalid(row,col) {

        var x = new Array(10);
        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var j = 0; j < 9; j++) {
            x[arr[row][j]]++;
            if (x[arr[row][j]] > 1 && arr[row][j] != 0) {
                return false;
            }
        }

        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var j = 0; j < 9; j++) {
            x[arr[j][col]]++;
            if (x[arr[j][col]] > 1 && arr[j][col] != 0) {
                return false;
            }
        }
        var rows=row-row%3;
        var cols=col-col%3;
        for (var j = 0; j <= 9; j++) {
            x[j] = 0;
        }
        for (var i = rows; i < rows+3; i++) {
                for (var j = cols; j < cols+3; j++) {
                    x[arr[i][j]]++;
                    if (x[arr[i][j]] > 1 && arr[i][j] != 0) {
                        return false;
                    }
                }
        }
    return true;
}


async function backtracking(x, y) {
    // alert(x);
    var ok = false;
    if (arr[x][y] != 0) {
        if (y + 1 < 9) {
            ok = backtracking(x, y + 1);
        } else if (x + 1 < 9) {
            ok = backtracking(x + 1, 0);
        } else {
            display();
            return true;
        }
    } 
    else {
        for (var i = 1; i <= 9; i++) {
            arr[x][y]=i;
            // console.log("x="+x);
            // console.log("y="+y);
            // console.log("value="+i);
            await changecolor(x, y, i, "orange");
            if (isvalid(x,y)) {
                if (y + 1 < 9) {
                    ok = await backtracking(x, y + 1);
                    console.log(ok);
                }
                 else if (x + 1 < 9) {
                    ok = await backtracking(x + 1, 0);
                }
                 else {
                    // display();
                    return true;
                }
                if (ok) return true;
                else{
                    arr[x][y]=0;
                }
            }
            else{
               await changecolor(x,y,-1,"red");
            }
        }
        if (!ok){
            arr[x][y] = 0;
            await changecolor(x,y,0,"white");
            return false;
        }
    }
    return ok;
}


//canvas

function randomnumbers(x,y){
     var result=Math.floor(Math.random()*x+y)+1;
     return result;
}

allevils=[];

class evil{
     constructor(x,y){
        this.ufo=document.createElement('img');
        this.x=x;
        this.y=y;
        this.died=0;
        this.ufo.src="assets/evil.png";
        allevils.push(this);
     }
    //  animate(){
    //   ctx.clearRect(0,0,canvas.height,canvas.width);
    //   ctx.drawImage(this.ufo,this.x,this.y,120,100);
    //   this.x+=2;
    //   this.y+=2;
    //   if(this.x>=canvas.width)this.x=0;
    //   else if(this.x>=0)this.x=this.width;
    //   if(this.y>=canvas.height)this.y=0;
    //   else if(this.y>=0)this.x=0;      
    //   window.requestAnimationFrame(this.animate);
    // }
}



//planets
allplanets=[];

class planet{
    constructor(x,y,i){
        this.x=x;
        this.y=y;
        this.planet=document.createElement('img');
        this.planet.src='assets/planet'+i+'.png'; 
        this.check=0;
       
        allplanets.push(this); 
    }
}

planatepositions=[];
var planet1={
   x:100,
   y:50
}
var planet2={
  x:200,
  y:350
}
var planet3={
  x:1000,
  y:30
}
var planet4={
  x:1200,
  y:450
}


planatepositions.push(planet1);
planatepositions.push(planet2);
planatepositions.push(planet3);
planatepositions.push(planet4);
var canvas=document.getElementById("canvas");
canvas.height=document.documentElement.scrollHeight;
canvas.width=document.documentElement.scrollWidth;

var ctx=canvas.getContext("2d");
function createevil(){
    var evilobj=new evil(Math.random()*canvas.width, Math.random()*canvas.height)  
}
for(var i=0; i<10; i++){
    createevil();
}
var start=Math.ceil(Math.random()*5);
for(var i=0; i<4; i++){
    var newplanet=new planet(planatepositions[i].x,planatepositions[i].y,start+i);
}

var hero=document.createElement('img');
hero.src='assets/spaceship.png';
var currx=100
var curry=100;
var prevx=100;
var prevy=100;
ctx.drawImage(hero,currx,curry,100,100)
canvas.addEventListener('mousemove',(event)=>{
      prevy=curry;
      prevx=currx;
      currx=event.clientX;
      curry=event.clientY;

});

var bullets=[];
var bullets_capacity=100;
class bullet{
   constructor(x,y){
      this.x=x+50;
      this.y=y;
      bullets.push(this);
   }
}


canvas.addEventListener('click',(event)=>{
     if(bullets_capacity){
      var newullet=new bullet(prevx,prevy);
      bullets_capacity--;
     }
})

function animateevil(evilobj){
  // console.log(evilobj.x);
  ctx.drawImage(evilobj.ufo,evilobj.x,evilobj.y,50,30);
  var choice=Math.floor(Math.random(0,1)*2);
  if(choice==1){
    evilobj.x+=randomnumbers(0,2);
    evilobj.x+=randomnumbers(-2,0);
  }
  else{
    evilobj.y+=randomnumbers(0,2);
    evilobj.y+=randomnumbers(-2,0);
  }
  if(evilobj.x>=canvas.width)evilobj.x=0;
  else if(evilobj.x<0)evilobj.x=canvas.width;
  if(evilobj.y>=canvas.height)evilobj.y=0;
  else if(evilobj.y<0)evilobj.y=canvas.height;  

}

function animateplanet(planetobj){
  // console.log(planetobj);
  
  ctx.drawImage(planetobj.planet,planetobj.x,planetobj.y,200,200);
  if(flag){
    if(planetobj.check){
        planetobj.x+=10;
        planetobj.check=0;
      }
      else{
        planetobj.x-=10;
        planetobj.check=1;
      } 
  }
   
 
}
allblasts=[];
class blast{
    constructor(x,y){
         this.x=x;
         this.y=y;
         this.frame=1;
         allblasts.push(this);
    }
}

function animateblast(blastobj){
    if(blastobj.frame<7){
      var blastimg=document.createElement("img");
      blastimg.src='assets/blast'+blastobj.frame+'.png';
      ctx.drawImage(blastimg, blastobj.x, blastobj.y,100,100);
      blastobj.frame++;
    }
   
}

function animatebullet(bulletobj){
  bulletobj.y-=10;
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.fillRect(bulletobj.x, bulletobj.y, 5, 10);
  for(var i=0; i<allevils.length; i++){
      if(!allevils[i].died && bulletobj.x>=allevils[i].x-10 && bulletobj.x<=allevils[i].x+60 && bulletobj.y>=allevils[i].y-10 && bulletobj.y<=allevils[i].y+40 ){
            var newblast=new blast(bulletobj.x-30,bulletobj.y-80);
            allevils[i].died=1;
            createevil();
            break;
      }
 }
}

function startanimations(){
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
//   if(flag){
    for(var i=0; i<allplanets.length; i++){
      animateplanet(allplanets[i]);
   }
//   }
   
   for(var i=0; i<allevils.length; i++){
    if(!allevils[i].died) animateevil(allevils[i]);
   }
  
   for(var i=0; i<bullets.length; i++){
      animatebullet(bullets[i]);
    }
  for(var i=0; i<allblasts.length; i++){
     animateblast(allblasts[i]);
   }
   
   
  
  
   var deg=(Math.abs(curry-prevy)/Math.abs(currx-prevx))*360;
  //  console.log(deg);
   hero.style.transform ='rotate('+10+'deg)';
   ctx.drawImage(hero,currx,curry,100,100);
   window.requestAnimationFrame(startanimations);
}


startanimations();



