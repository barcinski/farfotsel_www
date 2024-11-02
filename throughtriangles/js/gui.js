var BgColors = function() {

  this.color0 = "#85aca8";
  this.color1 = "#d4c3bf"; 
  this.color2 = "#dc9a8c";
  this.color3 = "#8dc3b6"; 
  this.imageSize = 100;

  this.change = function (value){
  	//document.body.style.backgroundColor = value;
    _engine.render.options.background = value;
  }

};

function initGUI() {
	
	var colors = new BgColors();
  	var gui = new dat.GUI();

  	gui.addColor(colors, 'color0').onChange(colors.change).__input.onfocus = function(){colors.change(this.value)};
  	gui.addColor(colors, 'color1').onChange(colors.change).__input.onfocus = function(){colors.change(this.value)};
  	gui.addColor(colors, 'color2').onChange(colors.change).__input.onfocus = function(){colors.change(this.value)};
  	gui.addColor(colors, 'color3').onChange(colors.change).__input.onfocus = function(){colors.change(this.value)};

  	gui.add(colors, "imageSize", 50, 120, 0.01).onChange(function(value) {
		//imgWidth = value;
		//createPattern(value, value);
		
	});
	
	
}

initGUI();