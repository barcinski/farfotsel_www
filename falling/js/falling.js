var mx = 0, my = 0;

init()
function init() {
    var el = document;
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchstart', onTouchMove);

}
 
function onMouseMove(e) {
    mx = e.clientX;
    my = e.clientY;

    //e.touches = [{clientX: e.clientX, clientY: e.clientY}];
    //onTouchMove(e);
}
 
function onTouchMove(e) {
    //do something with e.touches[0].clientX or e.touches[0].clientY
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
 
}


function doFalling() {
   var content = document.getElementById("content");
//console.log(content,content.children.length)
  //or(var i = 0 ; i  <content.)
  var p;
  for (var i = 0; i < particles.length;i++){
    p = particles[i];
    


    var dx = p.x - mx;
    var dy = p.y - my;

    var rot = 0;

   // p.x += p.scaleX*-0.05;
    p.y += ( p.scaleY * 0.8);
    



    p.div.style["-webkit-transform"] = "translate("+p.x+"px , "+p.y+"px) rotate("+rot+"rad) scale("+p.scaleX+" , "+p.scaleY+")";
    //console.log(p.div.className);
    if(p.y - 100  > window.innerHeight)resetParticle(p);
    //child.style.transform = "rotate("+rot+"rad)";
  }
}



function animate() {
  requestAnimationFrame( animate );
  //stats.update();

  //console.log("Manyeyes animate()")

  if(!isPaused)doFalling();
  
  //rotateToMouse();
 
}

function Particle(div){
  this.x = 0;
  this.y = 0;
  this.scale = 1;

  this.div = div;

  return this;
}

var particles = [];  

function removeAllParticles(){
  /*for(var i = particles.length ; i >= 0 ; i--){
    var p = particles[i];
  }*/

  particles.length = [];
}

function resetParticle(p){
  p.x = Math.random() * window.innerWidth;
  p.y = -Math.random() * window.innerHeight - 100;
}



function createPattern(){
  var imgWidth = 110;
  var imgHeight = 110;

  var content = document.getElementById("content");
  removeAllParticles();

  while (content.firstChild) {content.removeChild(content.firstChild);}
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    var pMax = Math.sqrt(w*w + h*h) * 0.05;
    
  for (var i = 0; i < pMax; i++ ) {
      
      
      var newDiv = document.createElement("div"); 
      var newChild = document.createElement("div");
      var p = new Particle(newDiv);
      particles[i] = p;

      newDiv.appendChild(newChild);

      newDiv.className = "denise";
     

      
      p.x = Math.random() * window.innerWidth;
      p.y =  (Math.random()*2-1) * window.innerHeight;
      p.scaleX = p.scaleY = Math.random()*1.5 + 0.5;
      if(Math.round( Math.random()))p.scaleX *= -1; 
      //p.scale = Math.random() + 1;
     
      var rot = Math.ceil(Math.random() * 30 - 15);
      newDiv.className += " rot"+ rot;// + (iy * rows + cols)%10 

      content.appendChild(newDiv);
  
  }
   
}

createPattern();

//if(!inIframe())animate();
animate();

window.onresize = createPattern;
