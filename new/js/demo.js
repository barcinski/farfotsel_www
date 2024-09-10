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
    return AbstractControls;
})();
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./controls/AbstractControls.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractView = (function (_super) {
    __extends(AbstractView, _super);
    function AbstractView() {
        _super.apply(this, arguments);
        // events
        this.mouseOver = { type: 'mouseOver', target: null, src: null };
        this.mouseOut = { type: 'mouseOut', target: null, src: null };
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
})(THREE.EventDispatcher);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="../AbstractView.ts"/>
var AbstractViewScene = (function () {
    function AbstractViewScene() {
    }
    AbstractViewScene.prototype.initScene = function (view) { };
    ;
    AbstractViewScene.prototype.initPickingScene = function (view) { };
    ;
    return AbstractViewScene;
})();
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./AbstractViewScene.ts"/>
var BasicViewScene = (function (_super) {
    __extends(BasicViewScene, _super);
    function BasicViewScene() {
        _super.apply(this, arguments);
    }
    BasicViewScene.prototype.initScene = function (view) {
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        view.scene.add(light);
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        for (var i = 0; i < 2000; i++) {
            var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            view.scene.add(object);
        }
    };
    return BasicViewScene;
})(AbstractViewScene);
/**
 * Created by marbarci1 on 13/01/16.
 */
var OrbitAnimated = (function (_super) {
    __extends(OrbitAnimated, _super);
    function OrbitAnimated(view) {
        _super.call(this);
        this.controls = new THREE.TrackballControls(view.camera);
        this.controls.rotateSpeed = 1;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = false;
        this.controls.dynamicDampingFactor = 0.1;
        //TODO fix in definition file
        this.controls["minimunStaticSpeed"] = 0.003;
        this.controls["autoStart"](Math.random() * 0.002 - 0.001, Math.random() * 0.002 - 0.001);
        //document.addEventListener("mousedown" , this.onMouseDown.bind(this), true);
    }
    OrbitAnimated.prototype.update = function (view) {
        //console.log("blala");
        this.controls.update();
    };
    OrbitAnimated.prototype.onMouseDown = function (event) {
        event.preventDefault();
        //this is probablhy the best way to stop the trackball on interactions
    };
    return OrbitAnimated;
})(AbstractControls);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./AbstractView.ts"/>
///<reference path="./scenes/BasicViewScene.ts"/>
///<reference path="./controls/OrbitAnimated.ts"/>
var TrackballControls = THREE.TrackballControls;
var BasicView = (function (_super) {
    __extends(BasicView, _super);
    function BasicView() {
        _super.apply(this, arguments);
    }
    BasicView.prototype.init = function () {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 100;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.sortObjects = false;
        this.container.appendChild(this.renderer.domElement);
        //this.initScene(); //call this from the heap
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    };
    BasicView.prototype.initControls = function () {
        this.controls = new OrbitAnimated(this);
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
 * Created by marbarci1 on 13/01/16.
 */
///<reference path="./BasicView.ts"/>
var InteractiveView = (function (_super) {
    __extends(InteractiveView, _super);
    function InteractiveView() {
        _super.apply(this, arguments);
        this.DETECT_RAYCAST = 0;
        this.DETECT_PICKING = 1;
        this.detectionMode = this.DETECT_RAYCAST;
    }
    return InteractiveView;
})(BasicView);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./BasicViewScene.ts"/>
//TODO make this an interface
var InteractiveViewScene = (function (_super) {
    __extends(InteractiveViewScene, _super);
    function InteractiveViewScene() {
        _super.apply(this, arguments);
    }
    //selectedObject:any;
    InteractiveViewScene.prototype.initScene = function (view) {
        _super.prototype.initScene.call(this, view);
    };
    InteractiveViewScene.prototype.onMouseOver = function (object) {
        //this.selectedObject = object;
        document.body.style.cursor = 'pointer';
        if (!object.clicked) {
            object.currentHex = object.material.emissive.getHex();
            object.material.emissive.setHex(0xff0000);
        }
    };
    InteractiveViewScene.prototype.onMouseOut = function (object) {
        document.body.style.cursor = 'auto';
        if (!object.clicked) {
            object.material.emissive.setHex(object.currentHex);
        }
    };
    InteractiveViewScene.prototype.onMouseClick = function (object) {
        object.clicked = true;
        object.material.emissive.setHex(0x0000ff);
    };
    return InteractiveViewScene;
})(BasicViewScene);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./InteractiveView.ts"/>
///<reference path="./scenes/InteractiveViewScene.ts"/>
//TODO merge into InteractiveView
var InteractiveViewRaycast = (function (_super) {
    __extends(InteractiveViewRaycast, _super);
    function InteractiveViewRaycast() {
        _super.apply(this, arguments);
    }
    InteractiveViewRaycast.prototype.init = function () {
        _super.prototype.init.call(this);
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
    };
    InteractiveViewRaycast.prototype.initScene = function () {
        this.viewScene = new InteractiveViewScene();
        this.viewScene.initScene(this);
    };
    InteractiveViewRaycast.prototype.render = function () {
        this.raycastScene();
        _super.prototype.render.call(this);
    };
    InteractiveViewRaycast.prototype.raycastScene = function () {
        // find intersections
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                if (this.INTERSECTED)
                    this.viewScene.onMouseOut(this.INTERSECTED);
                this.INTERSECTED = intersects[0].object;
                this.viewScene.onMouseOver(this.INTERSECTED);
            }
        }
        else {
            if (this.INTERSECTED) {
                this.viewScene.onMouseOut(this.INTERSECTED);
            }
            this.INTERSECTED = null;
        }
    };
    InteractiveViewRaycast.prototype.onDocumentMouseMove = function (event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    InteractiveViewRaycast.prototype.onDocumentMouseDown = function (event) {
        event.preventDefault();
        if (this.INTERSECTED)
            this.viewScene.onMouseClick(this.INTERSECTED);
    };
    return InteractiveViewRaycast;
})(InteractiveView);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./InteractiveViewScene.ts"/>
var PickingViewScene = (function (_super) {
    __extends(PickingViewScene, _super);
    function PickingViewScene() {
        _super.apply(this, arguments);
    }
    PickingViewScene.prototype.initScene = function (view) {
        //don't init from here
    };
    PickingViewScene.prototype.applyVertexColors = function (g, c) {
        g.faces.forEach(function (f) {
            var n = (f instanceof THREE.Face3) ? 3 : 4;
            for (var j = 0; j < n; j++) {
                f.vertexColors[j] = c;
            }
        });
    };
    PickingViewScene.prototype.initPickingScene = function (view) {
        view.scene.add(new THREE.AmbientLight(0x555555));
        var light = new THREE.SpotLight(0xffffff, 1.5);
        light.position.set(0, 500, 2000);
        view.scene.add(light);
        var geometry = new THREE.Geometry(), pickingGeometry = new THREE.Geometry(), pickingMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors }), defaultMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });
        var geom = new THREE.BoxGeometry(10, 10, 10);
        var color = new THREE.Color();
        var matrix = new THREE.Matrix4();
        var quaternion = new THREE.Quaternion();
        for (var i = 0; i < 2000; i++) {
            var position = new THREE.Vector3();
            position.x = Math.random() * 800 - 400;
            position.y = Math.random() * 800 - 400;
            position.z = Math.random() * 800 - 400;
            var rotation = new THREE.Euler();
            rotation.x = Math.random() * 2 * Math.PI;
            rotation.y = Math.random() * 2 * Math.PI;
            rotation.z = Math.random() * 2 * Math.PI;
            var scale = new THREE.Vector3();
            scale.x = Math.random() + 0.5;
            scale.y = Math.random() + 0.5;
            scale.z = Math.random() + 0.5;
            quaternion.setFromEuler(rotation, false);
            matrix.compose(position, quaternion, scale);
            // give the geom's vertices a random color, to be displayed
            this.applyVertexColors(geom, color.setHex(Math.random() * 0xffffff));
            geometry.merge(geom, matrix);
            // give the geom's vertices a color corresponding to the "id"
            this.applyVertexColors(geom, color.setHex(i));
            pickingGeometry.merge(geom, matrix);
            view.pickingData[i] = {
                position: position,
                rotation: rotation,
                scale: scale
            };
        }
        var drawnObject = new THREE.Mesh(geometry, defaultMaterial);
        view.scene.add(drawnObject);
        view.pickingScene.add(new THREE.Mesh(pickingGeometry, pickingMaterial));
        view.highlightBox = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshLambertMaterial({ color: 0xffff00 }));
        view.scene.add(view.highlightBox);
    };
    return PickingViewScene;
})(InteractiveViewScene);
/**
 * Created by marbarci1 on 12/01/16.
 */
///<reference path="./InteractiveView.ts"/>
///<reference path="./scenes/PickingViewScene.ts"/>
//TODO merge into InteractiveView
var InteractiveViewGPU = (function (_super) {
    __extends(InteractiveViewGPU, _super);
    function InteractiveViewGPU() {
        _super.call(this);
        this.pickingScene = new THREE.Scene();
        this.offset = new THREE.Vector3(.1, .1, .1);
        this.mouse = new THREE.Vector2();
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        this.pickingScene = new THREE.Scene();
        this.pickingTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.pickingTexture.minFilter = THREE.LinearFilter;
        this.pickingTexture.generateMipmaps = false;
        this.pickingData = [];
        //this.objects = [];
        this.offset = new THREE.Vector3(.1, .1, .1);
    }
    InteractiveViewGPU.prototype.initScene = function () {
        this.viewScene = new PickingViewScene();
        this.viewScene.initPickingScene(this);
    };
    InteractiveViewGPU.prototype.render = function () {
        this.pick();
        _super.prototype.render.call(this);
        //this.renderer.render( this.pickingScene, this.camera );
    };
    InteractiveViewGPU.prototype.pick = function () {
        //render the picking scene off-screen
        this.renderer.render(this.pickingScene, this.camera, this.pickingTexture);
        //create buffer for reading single pixel
        var pixelBuffer = new Uint8Array(4);
        //read the pixel under the mouse from the texture
        this.renderer.readRenderTargetPixels(this.pickingTexture, this.mouse.x, this.pickingTexture.height - this.mouse.y, 1, 1, pixelBuffer);
        //interpret the pixel as an ID
        var id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
        var data = this.pickingData[id];
        //console.log(pixelBuffer , id );
        if (data) {
            //move our highlightBox so that it surrounds the picked object
            if (data.position && data.rotation && data.scale) {
                this.highlightBox.position.copy(data.position);
                this.highlightBox.rotation.copy(data.rotation);
                this.highlightBox.scale.copy(data.scale).add(this.offset);
                this.highlightBox.visible = true;
                this.pickedObject = data;
            }
        }
        else {
            if (this.pickedObject) {
                this.pickedObject = null;
                //console.log("onmout");
                this.highlightBox.visible = false;
            }
        }
    };
    InteractiveViewGPU.prototype.onDocumentMouseMove = function (event) {
        event.preventDefault();
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    };
    return InteractiveViewGPU;
})(InteractiveView);
/**
 * Created by marbarci1 on 13/01/16.
 */
var TweenScene = (function (_super) {
    __extends(TweenScene, _super);
    function TweenScene() {
        _super.apply(this, arguments);
    }
    TweenScene.prototype.initScene = function (view) {
        _super.prototype.initScene.call(this, view);
        this.view = view;
        view.camera.position.z = 2000;
        TweenLite.to(this.view.camera.position, 4, { z: 100 });
    };
    TweenScene.prototype.onMouseClick = function (object) {
        _super.prototype.onMouseClick.call(this, object);
        TweenLite.to(this.view.camera.position, 2, { x: object.position.x, y: object.position.y, z: object.position.z });
    };
    return TweenScene;
})(InteractiveViewScene);
/**
 * Created by marbarci1 on 13/01/16.
 */
///<reference path="./scenes/TweenScene.ts"/>
var MyView = (function (_super) {
    __extends(MyView, _super);
    function MyView() {
        _super.apply(this, arguments);
    }
    MyView.prototype.initScene = function () {
        this.viewScene = new TweenScene();
        this.viewScene.initScene(this);
    };
    MyView.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return MyView;
})(InteractiveViewRaycast);
///<reference path="./typings/strict.ts"/>
///<reference path="./typings/tsd.d.ts"/>
///<reference path="./view/InteractiveViewRaycast.ts"/>
///<reference path="./view/InteractiveViewGPU.ts"/>
///<reference path="./view/BasicView.ts"/>
///<reference path="./view/MyView.ts"/>
//<reference path="./examples/DraggableCubes.js.ts"/>//not used now, just a demo of js
var Main = (function () {
    function Main() {
        //settings
        this.showStats = false;
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        if (this.showStats) {
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.top = '0px';
            this.container.appendChild(this.stats.domElement);
        }
        this.view = new MyView();
        this.view.container = this.container;
        this.view.init();
        this.view.initControls();
        this.view.initScene();
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
var main = new Main();
//# sourceMappingURL=app.js.map