(function() {

    // Matter aliases
    var Engine = Matter.Engine,
        Gui = Matter.Gui,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        Events = Matter.Events,
        MouseConstraint = Matter.MouseConstraint;


    var Demo = {};

    //var _engine,
    var    _sceneName = 'sprites',
        _sceneEvents = [],
        _sceneWidth,
        _sceneHeight;

    Demo.init = function() {
        var canvasContainer = document.getElementById('canvas-container'),
            demoStart = document.getElementById('demo-start');
            demoStart.style.display = 'none';


            // call init when the page has loaded fully

    
     // window.addEventListener('load', function() {
      //demoStart.addEventListener('click', function() {
            
            
            _engine = Engine.create(canvasContainer, {
                render: {
                    options: {
                        wireframes: false,
                        showAngleIndicator: false,
                        showDebug: false,
                        background: 'white'
                    }
                }
            });

            //_engine.render.options.background = value;

            //Demo.fullscreen();

           // setTimeout(function() {
                
                //Engine.run(_engine);
                start();
                Demo.updateScene();

           // }, 800);
       // });
        
        //window.addEventListener('deviceorientation', Demo.updateGravity, true);
        //window.addEventListener('touchstart', Demo.fullscreen);
        /*window.addEventListener('orientationchange', function() {
            //Demo.updateGravity();
            Demo.updateScene();
            Demo.fullscreen();
        }, false);*/

        window.addEventListener('resize' , Demo.updateScene);
    };

    window.addEventListener('load', Demo.init);

    Demo.mixed = function() {
        var _world = _engine.world;
        
        Demo.reset();

        World.add(_world, MouseConstraint.create(_engine));
        
        var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y, column, row) {
            switch (Math.round(Common.random(0, 1))) {
                
            case 0:
                if (Math.random() < 0.8) {
                    return Bodies.rectangle(x, y, Common.random(20, 40), Common.random(20, 40), { friction: 0.01, restitution: 0.4 });
                } else {
                    return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), { friction: 0.01, restitution: 0.4 });
                }
                break;
            case 1:
                return Bodies.polygon(x, y, Math.round(Common.random(4, 6)), Common.random(20, 40), { friction: 0.01, restitution: 0.4 });
            
            }
        });
        
        World.add(_world, stack);
    };

    Demo.sprites = function() {
        var _world = _engine.world,
            offset = 10,
            options = { 
                isStatic: true,
                render: {
                    visible: false
                }
            };

        Demo.reset();
        World.add(_world, MouseConstraint.create(_engine));

        var imgWidth = 64;
        var scale = imgWidth/128;
        var amounth = 4;
        var xx = (_sceneWidth - amounth * imgWidth) * 0.5 ; 

        var stack = Composites.stack(xx, - 100, amounth , 1, 0, 0, function(x, y, column, row) {
            //256/369/2;//Common.random(1 , 1.6);
            return Bodies.circle(x, y, imgWidth/2 , {
                density: 0.0015,
                frictionAir: 0.001,
                restitution: 0.5,
                friction: 1,
                render: {
                    sprite: {
                        texture: './img/farfotseltje2_128.png' , xScale: scale , yScale : scale
                    }
                }
            });
            
        });

        World.add(_world, stack);

        var trispace = 140;
        var ixmax = _sceneWidth / trispace  ;
        var iymax = Math.floor(_sceneHeight / trispace) + 1 ;

        for(var ix = 0 ; ix < ixmax ; ix++){
            for(var iy = 0; iy < iymax ; iy++){
                var offsetx = 0;
                if(iy % 2)offsetx = 50;
                if( Math.random() > 0.2 ) {
                    var b = Bodies.polygon(ix * trispace + offsetx + Common.random(-25, 25), iy * trispace + Common.random(-25, 25), 3, 40, {
                        isStatic : true, 
                        angle:Math.PI/2,
                        render: {
                             fillStyle: 'black',
                             strokeStyle: 'none',
                             
                        }
                        
                    });
                    World.add(_world, b);
                }
            }
           
        }



        var renderOptions = _engine.render.options;
        //renderOptions.background = './img/wall-bg.jpg';
        renderOptions.showAngleIndicator = false;
        renderOptions.wireframes = false;

         var shakeScene = function(engine) {
            var bodies = Composite.allBodies(engine.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];

                if (!body.isStatic && body.speed < 1) {
                    var forceMagnitude = 0.01 * body.mass;

                    Body.applyForce(body, { x: 0, y: 0 }, { 
                        x: (forceMagnitude + Math.random() * forceMagnitude) * Common.choose([1, -1]), 
                        y: -forceMagnitude + Math.random() * -forceMagnitude
                    });
                }
            }
        };

        var addFafotsel = function(engine) {
           
            var f = Bodies.circle(Common.random( 50 , _sceneWidth - 50), -100, imgWidth/2 , {
                density: 0.0015,
                frictionAir: 0.001,
                restitution: 0.5,
                friction: 1,
                render: {
                    sprite: {
                        texture: './img/farfotseltje2_128.png' , xScale: scale , yScale : scale
                    }
                }
            });

            World.add(_world, f);
        }

        var lastTimeStamp = 0;

        _sceneEvents.push(

            // an example of using beforeUpdate event on an engine
            Events.on(_engine, 'beforeUpdate', function(event) {
                var engine = event.source;

                if(event.timestamp - lastTimeStamp > 5000){
                    //console.log(lastTimeStamp);
                    shakeScene(engine);
                    addFafotsel(engine);
                    lastTimeStamp = event.timestamp;
                }
                
                // apply random forces every 5 secs
                if (event.timestamp % 5000 < 10){
                    
                }
            })

        );

        _sceneEvents.push(

            // an example of using collisionStart event on an engine
            Events.on(_engine, 'collisionStart', function(event) {
                var pairs = event.pairs;

                // change object colours to show those starting a collision
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    if(Math.random() > 0.2){
                        pair.bodyA.render.fillStyle = '#85aca8';
                        pair.bodyB.render.fillStyle = '#85aca8';

                    }else{
                        pair.bodyA.render.fillStyle = 'yellow';
                        pair.bodyB.render.fillStyle = 'yellow';
                    }
                    
                }
            })

        );

        /*_sceneEvents.push(

            // an example of using collisionActive event on an engine
            Events.on(_engine, 'collisionActive', function(event) {
                var pairs = event.pairs;

                // change object colours to show those in an active collision (e.g. resting contact)
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    pair.bodyA.render.fillStyle = '#85aca8';
                    pair.bodyB.render.fillStyle = '#85aca8';
                }
            })

        );*/

        _sceneEvents.push(

            // an example of using collisionEnd event on an engine
            Events.on(_engine, 'collisionEnd', function(event) {
                var pairs = event.pairs;

                // change object colours to show those ending a collision
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    pair.bodyA.render.fillStyle = 'black';
                    pair.bodyB.render.fillStyle = 'black';
                }
            })

        );

         _sceneEvents.push(

            // an example of using collisionStart event on an engine
            Events.on(_engine, 'collisionStart', function(event) {
                var pairs = event.pairs;

                // change object colours to show those starting a collision
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i];
                    if (!(pair.bodyA.label === 'bottom' || pair.bodyB.label === 'bottom')) {
                      continue;
                    }

                    if(pair.bodyA.label === 'bottom'){

                        World.remove(_world, pair.bodyB , true);
                        pair.bodyB.render.fillStyle = '#bbbbbb';
                    }
                    if(pair.bodyB.label === 'bottom'){
                        console.log(World);
                        World.remove(_world, pair.bodyA , true);
                        pair.bodyA.render.fillStyle = '#bbbbbb';
                    }
                    
                }
            })

        );
    };
    
    Demo.updateScene = function() {
        if (!_engine)
            return;

        _sceneWidth = window.innerWidth;
        _sceneHeight = window.innerHeight;
        
        //_sceneWidth = document.documentElement.clientWidth;
        //_sceneHeight = document.documentElement.clientHeight;

        var boundsMax = _engine.world.bounds.max,
            renderOptions = _engine.render.options,
            canvas = _engine.render.canvas;

        boundsMax.x = _sceneWidth;
        boundsMax.y = _sceneHeight;

        canvas.width = renderOptions.width = _sceneWidth;
        canvas.height = renderOptions.height = _sceneHeight;

        Demo[_sceneName]();
    };
    
    Demo.updateGravity = function () {
        if (!_engine)
            return;
        
        var orientation = window.orientation,
            gravity = _engine.world.gravity;

        if (orientation === 0) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
            gravity.x = Common.clamp(event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
            gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
    };
    
    Demo.fullscreen = function(){
        return;
        var _fullscreenElement = _engine.render.canvas;
        
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (_fullscreenElement.requestFullscreen) {
                _fullscreenElement.requestFullscreen();
            } else if (_fullscreenElement.mozRequestFullScreen) {
                _fullscreenElement.mozRequestFullScreen();
            } else if (_fullscreenElement.webkitRequestFullscreen) {
                _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    };
    
    Demo.reset = function() {
        var _world = _engine.world;
        
        World.clear(_world);
        Engine.clear(_engine);

        // clear all scene events
        for (var i = 0; i < _sceneEvents.length; i++)
            Events.off(_engine, _sceneEvents[i]);
        _sceneEvents = [];

        // reset id pool
        Common._nextId = 0;
        
        var offset = 25;
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, -offset-_sceneHeight, _sceneWidth + 0.5, 50.5, { isStatic: true }));//top
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight + offset + 200, _sceneWidth + 0.5, 50.5, { isStatic: true , label:'bottom' }));//bottom
        World.addBody(_world, Bodies.rectangle(_sceneWidth + offset, _sceneHeight * 0.5, 50.5, _sceneHeight*2 + 0.5, { isStatic: true }));//right
        World.addBody(_world, Bodies.rectangle(-offset, _sceneHeight * 0.5, 50.5, _sceneHeight*2 + 0.5, { isStatic: true }));//left
    };

})();