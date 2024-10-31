"use strict";
/**
 * Created by marbarci1 on 13/01/16.
 */
/**
 * Created by marbarci1 on 12/01/16.
 */
var AbstractControls = (function () {
    function AbstractControls() {
    }
    AbstractControls.prototype.update = function (view) { };
    AbstractControls.prototype.pause = function () { };
    ;
    AbstractControls.prototype.unpause = function () { };
    ;
    return AbstractControls;
})();
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./controls/AbstractControls.ts"/>
var AbstractView = (function () {
    function AbstractView() {
    }
    AbstractView.prototype.init = function () {
        //call this from the heap
    };
    AbstractView.prototype.initControls = function () {
        //call this from the heap
    };
    AbstractView.prototype.initScene = function () {
        //call this from the heap
    };
    AbstractView.prototype.update = function () {
        //call this from the heap
    };
    AbstractView.prototype.render = function () {
    };
    return AbstractView;
})();
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="../AbstractView.ts"/>
/**
 * Created by marbarci1 on 15/01/16.
 */
var Randomizer = (function () {
    function Randomizer() {
        this.geometries = new Array();
        this.materials = new Array();
        this.colors = new Array();
        this.maxColors = Math.floor(Math.random() * 2 + 2);
        this.initColors();
        this.initMaterials();
        this.initGeometries();
    }
    Randomizer.prototype.getObject = function () {
        var geomIndex = Math.floor(this.geometries.length * Math.random());
        var matIndex = Math.floor(this.materials.length * Math.random());
        return new THREE.Mesh(this.geometries[geomIndex], this.materials[matIndex].clone());
    };
    Randomizer.prototype.getGeom = function () {
        var geomIndex = Math.floor(this.geometries.length * Math.random());
        //var matIndex:number = Math.floor(this.materials.length * Math.random());
        return this.geometries[geomIndex];
    };
    Randomizer.prototype.getGeomIndex = function () {
        return Math.floor(this.geometries.length * Math.random());
    };
    Randomizer.prototype.getColor = function () {
        var colorIndex = Math.floor(this.colors.length * Math.random());
        return this.colors[colorIndex];
    };
    Randomizer.prototype.initColors = function () {
        for (var i = 0; i < this.maxColors; i++) {
            this.colors.push(Math.random() * 0xffffff);
        }
    };
    Randomizer.prototype.initGeometries = function () {
        this.geometries.push(new THREE.BoxGeometry(10, 10, 10));
        this.geometries.push(new THREE.SphereGeometry(10, 10, 10));
        this.geometries.push(new THREE.CylinderGeometry(0, 10, 20, 4, 2, false));
    };
    Randomizer.prototype.initMaterials = function () {
        for (var i = 0; i < this.maxColors; i++) {
            this.materials.push(new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
        }
    };
    return Randomizer;
})();
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./IViewScene.ts"/>
///<reference path="./utils/Randomizer.ts"/>
var BasicViewScene = (function () {
    function BasicViewScene() {
    }
    BasicViewScene.prototype.initScene = function (view) {
        this.addLights(view);
        this.randomizer = new Randomizer();
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        //var geometry = new THREE.SphereGeometry(10 , 3 ,1);
        for (var i = 0; i < 2000; i++) {
            //var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            var object = this.randomizer.getObject();
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            var scale = Math.random() + 0.5;
            object.scale.x = scale;
            object.scale.y = scale;
            object.scale.z = scale;
            view.scene.add(object);
        }
    };
    BasicViewScene.prototype.addLights = function (view) {
        view.scene.add(new THREE.AmbientLight(0x555555));
        var light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        view.scene.add(light);
    };
    BasicViewScene.prototype.update = function () { };
    ;
    return BasicViewScene;
})();
/**
 * Created by marbarci1 on 13/01/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TrackballAnimated = (function (_super) {
    __extends(TrackballAnimated, _super);
    function TrackballAnimated(view) {
        _super.call(this);
        this.paused = false;
        this.controls = new THREE.TrackballControls(view.camera);
        this.controls.rotateSpeed = 1;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = false;
        this.controls.dynamicDampingFactor = 0.1;
        //TODO fix in definition file
        this.controls["minimunStaticSpeed"] = 0.001;
        this.controls["autoStart"](Math.random() * 0.0002 - 0.0001, Math.random() * 0.0002 - 0.0001);
        //document.addEventListener("mousedown" , this.onMouseDown.bind(this), true);
    }
    TrackballAnimated.prototype.update = function (view) {
        //console.log("blala");
        //if(!this.paused)
        this.controls.update();
    };
    TrackballAnimated.prototype.onMouseDown = function (event) {
        event.preventDefault();
        //this is probablhy the best way to stop the trackball on interactions
    };
    TrackballAnimated.prototype.pause = function () {
        this.paused = true;
        this.controls.enabled = false;
    };
    TrackballAnimated.prototype.unpause = function () {
        this.paused = false;
        this.controls.enabled = true;
    };
    return TrackballAnimated;
})(AbstractControls);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./AbstractView.ts"/>
///<reference path="./scenes/BasicViewScene.ts"/>
///<reference path="./controls/TrackballAnimated.ts"/>
var BasicView = (function (_super) {
    __extends(BasicView, _super);
    function BasicView() {
        _super.apply(this, arguments);
    }
    BasicView.prototype.init = function () {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 100;
        this.scene = new THREE.Scene();
        var antialias = true;
        //if(window.devicePixelRatio > 1)antialias = false;
        this.renderer = new THREE.WebGLRenderer({ antialias: antialias });
        this.renderer.setClearColor(0xffffff);
        //this.renderer.setClearColor( 0 );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;
        this.container.appendChild(this.renderer.domElement);
        //this.initScene(); //call this from the heap
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    };
    BasicView.prototype.initControls = function () {
        this.controls = new TrackballAnimated(this);
    };
    BasicView.prototype.initScene = function () {
        this.viewScene = new BasicViewScene();
        this.viewScene.initScene(this);
    };
    BasicView.prototype.updateControls = function () {
        this.controls.update(this);
    };
    BasicView.prototype.update = function () {
        this.updateControls();
        this.render();
    };
    BasicView.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    BasicView.prototype.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    return BasicView;
})(AbstractView);
/**
 * Created by marbarci1 on 20/01/16.
 */
var ImageScanner = (function () {
    function ImageScanner(url) {
        this.img = new Image();
        this.pixels = new Array();
        this.img.addEventListener("load", this.onImgLoad.bind(this), false);
        this.img.src = url;
        //img1.load();
        //document.body.appendChild( this.img );
        //this.img2 = new Image();
    }
    ImageScanner.prototype.onImgLoad = function () {
        //console.log(this );
        var imgData = this.getImageData(this.img);
        //var ui = this.img.width * this.img.height;
        var pixel;
        var hWidth = this.img.width / 2;
        var hHeight = this.img.height / 2;
        for (var ix = 0, uix = this.img.width; ix < uix; ix++) {
            for (var iy = 0, uiy = this.img.height; iy < uiy; iy++) {
                pixel = this.getPixel(imgData, ix, iy);
                if (pixel.r < 245 || pixel.g < 245 || pixel.b < 245 || pixel.a < 255) {
                    pixel.x = (ix - hWidth) * 0.1;
                    pixel.y = (iy - hHeight) * -0.1;
                    pixel.z = 0; //Math.random() * 5;
                    //pixel.r /= 255;
                    this.pixels.push(pixel);
                }
            }
        }
        
        this.shuffle(this.pixels);
        this.onComplete();
    };
    ImageScanner.prototype.onComplete = function () {
    };
    ImageScanner.prototype.getImageData = function (image) {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    };
    ImageScanner.prototype.getPixel = function (imagedata, x, y) {
        var position = (x + imagedata.width * y) * 4, data = imagedata.data;
        return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
    };
    ImageScanner.prototype.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    return ImageScanner;
})();
/**
 * Created by marbarci1 on 19/01/16.
 */
///<reference path="./utils/ImageScanner.ts"/>
var BufferAttribute = THREE.BufferAttribute;
var ParticlesScene = (function () {
    function ParticlesScene() {
        this.particles = 79039;
        this.sineTime = 1.0;
        this.pixelSize = 10.0;
        this.repelforce = 1;
        this.pushOrRepelToggle = true;
    }
    ParticlesScene.prototype.tweenToOne = function () {
        var repelTarget = 2 * this.pushOrRepelToggle - 1;
        this.pushOrRepelToggle = !this.pushOrRepelToggle;
        TweenLite.to(this, 3, { sineTime: 1, repelforce: repelTarget, onComplete: this.tweenToZero.bind(this), delay: 2 });
    };
    ParticlesScene.prototype.tweenToZero = function () {
        TweenLite.to(this, 3, { sineTime: 0.00, onComplete: this.tweenToOne.bind(this), delay: 8 });
    };
    ParticlesScene.prototype.initScene = function (view) {
        //view.renderer.setClearColor(0);
        this.raycaster = new THREE.Raycaster();
        var uniforms = {
            rayOrgin: { type: "3f", value: [0, 0, 0] },
            rayDirection: { type: "3f", value: [0, 0, 0] },
            sineTime: { type: "f", value: this.sineTime },
            mindistance: { type: "f", value: 1.0 },
            repelforce: { type: "f", value: 1.0 },
            pixelSize: { type: "f", value: this.pixelSize }
        };
        var shaderMaterial = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('particlesVertexshader').textContent,
            fragmentShader: document.getElementById('particlesFragmentshader').textContent,
            blending: THREE.NoBlending,
            depthTest: false,
            transparent: false
        });
        var radius = 20;
        this.geometry = new THREE.BufferGeometry();
        var positions = new Float32Array(this.particles * 3);
        var positionsTargets = new Float32Array(this.particles * 3);
        var vec = new THREE.Vector3();
        var colors = new Float32Array(this.particles * 3);
        var eye1 = new THREE.Vector3(0.6, 1, 1);
        eye1.normalize();
        var eye2 = new THREE.Vector3(-0.6, 1, 1);
        eye2.normalize();
        var nouse = new THREE.Vector3(0, 0.8, 1);
        for (var i = 0, i3 = 0; i < this.particles; i++, i3 += 3) {
            positions[i3 + 0] = (Math.random() * 2 - 1) * radius;
            positions[i3 + 1] = (Math.random() * 2 - 1) * radius;
            positions[i3 + 2] = (Math.random() * 2 - 1) * radius;
            var eye = 0.05;
            if (i < this.particles * 0.99) {
                vec.x = (Math.random() * 2 - 1);
                vec.y = (Math.random() * 2 - 1);
                vec.z = (Math.random() * 2 - 1);
            }
            else if (i < this.particles * 0.994) {
                vec.copy(eye1);
                vec.x += (Math.random() * eye);
                vec.y += (Math.random() * eye);
                vec.z += (Math.random() * eye);
            }
            else if (i < this.particles * 0.998) {
                vec.copy(eye2);
                vec.x += (Math.random() * eye);
                vec.y += (Math.random() * eye);
                vec.z += (Math.random() * eye);
            }
            else {
                vec.copy(nouse);
                vec.x += (Math.random() * eye * 1.5);
                vec.y += (Math.random() * eye * 0.5);
                vec.z += (Math.random() * eye * 0.5);
            }
            vec.normalize();
            positionsTargets[i3 + 0] = vec.x * radius;
            positionsTargets[i3 + 1] = vec.y * radius;
            positionsTargets[i3 + 2] = vec.z * radius;
            colors[i3 + 0] = Math.random() * 0.4; //delay
        }
        this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.addAttribute('posTarget', new THREE.BufferAttribute(positionsTargets, 3));
        this.geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.particleSystem = new THREE.Points(this.geometry, shaderMaterial);
        view.scene.add(this.particleSystem);
        this.imgScanner1 = new ImageScanner("points/images/farfotsel1.png");
        //this.imgScanner2 = new ImageScanner("./images/farfotsel2.png");
        this.imgScanner1.onComplete = this.onImgScannerComplete.bind(this);
    };
    ParticlesScene.prototype.onImgScannerComplete = function () {
        if (this.imgScanner1.pixels.length > 0) {
            var pos = this.geometry.getAttribute("position");
            //pos.dynamic = true;
            pos.needsUpdate = true;
            //var pArray = pos.array;
            for (var i = 0, l = pos.count; i < l; i++) {
                var pixel = this.imgScanner1.pixels[i];
                //console.log(this.imgScanner1.pixels[i].x , this.imgScanner1.pixels[i].y);
                pos.setXYZ(i, pixel.x, pixel.y, pixel.z);
            }
        }
        this.tweenToZero();
    };
    ParticlesScene.prototype.update = function (view) {
        var time = Date.now() * 0.005;
        1;
        //var position = new THREE.Vector3();
        //var positions = this.geometry.attributes.position.array;
        //position.fromArray( positions, 0  );
        this.raycaster.setFromCamera(view.easedMouse, view.camera);
        var inverseMatrix = new THREE.Matrix4();
        var ray = new THREE.Ray();
        inverseMatrix.getInverse(this.particleSystem.matrixWorld);
        ray.copy(this.raycaster.ray).applyMatrix4(inverseMatrix);
        //this.particleSystem.rotation.z = 0.05 * time;
        //console.log(this.particleSystem.material.uniforms.rayOrgin);
        //ray.origin.set(0.5,0.5,0.5);
        ray.origin.toArray(this.particleSystem.material.uniforms.rayOrgin.value);
        ray.direction.toArray(this.particleSystem.material.uniforms.rayDirection.value);
        /*var sinTime = Math.sin( time * 0.1 )+ 0.5 ;
        if(sinTime > 1)sinTime = 1;// - Math.random()*0.01;
        if(sinTime < 0)sinTime = 0;*/
        var sineTime = this.sineTime;
        var foo = view.vx * view.vx + view.vy * view.vy;
        foo = Math.sqrt(foo) * 0.2;
        foo = foo / 2 - foo;
        sineTime += (foo * sineTime);
        
        this.particleSystem.material.uniforms.sineTime.value = sineTime;
        this.particleSystem.material.uniforms.mindistance.value = 22.0 * sineTime + 1.0;
        this.particleSystem.material.uniforms.repelforce.value = this.repelforce;
        this.particleSystem.material.uniforms.pixelSize.value = this.pixelSize;
        var aspect = window.innerWidth / window.innerHeight;
        if (aspect > 2)
            aspect = 2;
        this.particleSystem.position.z = (1 - sineTime) * (aspect * 140 - 250);
        this.particleSystem.position.y = -this.particleSystem.position.z * 0.1;
    };
    return ParticlesScene;
})();
/**
 * Created by marbarci1 on 13/01/16.
 */
///<reference path="./BasicView.ts"/>
///<reference path="./scenes/ParticlesScene.ts"/>
var MyView = (function (_super) {
    __extends(MyView, _super);
    function MyView() {
        _super.apply(this, arguments);
        this.mouse = new THREE.Vector2(0, 0);
        this.easedMouse = this.mouse.clone();
        this.vx = 0;
        this.vy = 0;
    }
    MyView.prototype.init = function () {
        _super.prototype.init.call(this);
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('touchstart', this.onTouchStart.bind(this));
        document.addEventListener('touchmove', this.onDocumentTouchMove.bind(this));
    };
    MyView.prototype.initScene = function () {
        this.viewScene = new ParticlesScene();
        this.viewScene.initScene(this);
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.onWindowResize();
    };
    MyView.prototype.initControls = function () {
        //this.mContors = new THREE.MouseControls(this.viewScene["particleSystem"]);
    };
    MyView.prototype.updateControls = function () {
        //this.mContors.update();
        var rot = this.viewScene.particleSystem.rotation;
        //rot.x = 0.5;
        rot.y += (this.mouse.x - rot.y) * 0.1;
        rot.x += (-this.mouse.y - rot.x + (0.07 * this.viewScene.sineTime)) * 0.1;
        //rot.x += (0.07 * this.viewScene.sineTime)
    };
    MyView.prototype.update = function () {
        var friction = 0.9, spring = 0.03, gravity = 2;
        var dx = this.mouse.x - this.easedMouse.x, dy = this.mouse.y - this.easedMouse.y, ax = dx * spring, ay = dy * spring;
        this.vx += ax;
        this.vy += ay;
        //this.vy+=gravity;
        this.vx *= friction;
        this.vy *= friction;
        this.easedMouse.x += this.vx;
        this.easedMouse.y += this.vy;
        //easing
        //this.easedMouse.x += (this.mouse.x - this.easedMouse.x) * 0.3;
        //this.easedMouse.y += (this.mouse.y - this.easedMouse.y) * 0.3;
        this.viewScene.update(this);
        _super.prototype.update.call(this);
    };
    MyView.prototype.onDocumentMouseMove = function (event) {
        //event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    MyView.prototype.onDocumentTouchMove = function (event) {
        //event.preventDefault();
        this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    };
    MyView.prototype.onTouchStart = function (event) {
        //event.preventDefault();
    };
    MyView.prototype.onWindowResize = function () {
        //this.viewScene.pixelSize = (0.1 + window.innerHeight * 0.05) * window.devicePixelRatio * window.devicePixelRatio;
        
        this.viewScene.pixelSize = window.devicePixelRatio;//(0.1 + window.innerHeight * 0.001)  ;
        
        _super.prototype.onWindowResize.call(this);
    };
    return MyView;
})(BasicView);
///<reference path="./typings/strict.ts"/>
///<reference path="./typings/tsd.d.ts"/>
///<reference path="./view/MyView.ts"/>
//<reference path="./examples/Instancing.js.ts"/>//not used now, just a demo of js
var Main = (function () {
    function Main() {
        //settings
        this.showStats = false;
        this.container = window["container"]; //document.createElement( 'div' );
        //document.body.appendChild( this.container );
        if (this.showStats) {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
            this.container.appendChild(this.stats.domElement);
        }
        this.view = new MyView();
        this.view.container = this.container;
        this.view.init();
        this.view.initScene();
        this.view.initControls();
        //this.view.update();//single render
        this.animate();
    }
    Main.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.view.update();
        if (this.showStats)
            this.stats.update();
    };
    return Main;
})();
window.onload = function () {
    var main = new Main();
};
