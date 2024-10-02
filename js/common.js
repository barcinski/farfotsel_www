function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function isTouchDevice(){
  try{
    document.createEvent("TouchEvent");
    return true;
  }catch(e){
    return false;
  }
}


var state;
var STOPPED = "STOPPED";
var STARTED = "STARTED";
function stop(){
  if(state != STOPPED){
    state = STOPPED;
    console.log("stop " + location.href);
  }
}

function start() {
  if(state != STARTED){
    state = STARTED
    console.log("start "+ location.href);
  }
}

var DEBUG_ANIMATE = false;