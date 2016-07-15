---
layout: post
title: "Three.js Tutorial for Beginners"
description: "Learn three.js in this simple to follow tutorial. Includes mapping textures, loading blender models, and the basics."
category: tutorials
---

[Three.js](http://threejs.org/) gives you the ability to create 3D animations in the browser while doing all the heavy lifting of [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) for you.

<!--more-->

<script src="/js/three.min.js"></script>

### Scene, Camera, Renderer

[Scene](http://threejs.org/docs/#Reference/Scenes/Scene) is where you add objects, cameras, lights. 

[Camera](http://threejs.org/docs/#Reference/Cameras/Camera) clips the scene and gives objects depth just like a real camera. 

[Renderer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer) allows you to render your scene in either WebGL or Canvas 2D.  

### Create a three.js project

```html
<!doctype html>
<html>
<head></head>

<body>
  <!--Load three.js-->
  <script src="http://threejs.org/build/three.min.js"></script>

  <script>
    // code in here
  </script>
</body>
</html>
```

Create the scene, [perspective camera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera) (camera that makes far objects appear small and close objects big), and renderer: 

```html
<script>
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
</script>
```

Set the canvas size using renderer.setSize() and then render the scene 60 times per second using a background color of #3399ff:

```html
<script>
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer.setClearColor(0x3399ff);
  document.body.appendChild(renderer.domElement);

  function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();
</script>
```

<div id="canvascontainer1"></div>

<script>
  var scene1    = new THREE.Scene();
  var camera1   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer1 = new THREE.WebGLRenderer();

  renderer1.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer1.setClearColor(0x3399ff);
  document.getElementById("canvascontainer1").appendChild(renderer1.domElement);

  function render1(){
    requestAnimationFrame(render1);
    renderer1.render(scene1, camera1);
  }
  render1();
</script>


### Add [meshes](http://threejs.org/docs/index.html#Reference/Objects/Mesh) with [lights](http://threejs.org/docs/index.html#Reference/Lights/Light)

A mesh consists of a [geometry](http://threejs.org/docs/index.html#Reference/Core/Geometry) and [material](http://threejs.org/docs/index.html#Reference/Materials/Material). Three.js comes with primitive geometries such as cubes, cones, and more. Materials describe the appearance of geometries.

We'll create a spinning [box geometry](http://threejs.org/docs/index.html#Reference/Extras.Geometries/BoxGeometry) with a [lambert material](http://threejs.org/docs/index.html#Reference/Materials/MeshLambertMaterial) of color #f6546a and a white [point light](http://threejs.org/docs/index.html#Reference/Lights/PointLight):

```html
<script>
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer.setClearColor(0x3399ff);
  document.body.appendChild(renderer.domElement);

  // (width, height, depth)
  var geometry = new THREE.BoxGeometry(5, 5, 5);
  var material = new THREE.MeshLambertMaterial({color: 0xf6546a}) 
  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh);

  // (color, intensity)
  var light = new THREE.PointLight(0xffffff, 1.2);
  // (x, y, z)
  light.position.set(0, 0, 6);
  scene.add(light);

  // move the camera back
  camera.position.z = 10;

  function render(){
    requestAnimationFrame(render);
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;
    renderer.render(scene, camera);
  }
  render();
</script>
```

<div id="canvascontainer2"></div>

<script>
  var scene2    = new THREE.Scene();
  var camera2   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer2 = new THREE.WebGLRenderer();

  renderer2.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer2.setClearColor(0x3399ff);
  document.getElementById("canvascontainer2").appendChild(renderer2.domElement);

  // (width, height, depth)
  var geometry2 = new THREE.BoxGeometry(5, 5, 5);
  var material2 = new THREE.MeshLambertMaterial({color: 0xf6546a}) 
  var mesh2 = new THREE.Mesh(geometry2, material2)
  scene2.add(mesh2);

  // (color, intensity)
  var light2 = new THREE.PointLight(0xffffff, 1.2);
  // (x, y, z)
  light2.position.set(0, 0, 6);
  scene2.add(light2);

  // move the camera back
  camera2.position.z = 10;

  function render2(){
    requestAnimationFrame(render2);
    mesh2.rotation.x += 0.1;
    mesh2.rotation.y += 0.1;
    renderer2.render(scene2, camera2);
  }
  render2();
</script>


### [Textures](http://threejs.org/docs/index.html#Reference/Textures/Texture)

You can apply textures as the material instead:

```html
<script>
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer.setClearColor(0x3399ff);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(5, 5, 5);

  var loader = new THREE.TextureLoader();
  // URL of texture
  loader.load("/images/boxtexture.jpg", function(texture){
    var material = new THREE.MeshLambertMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  var light = new THREE.PointLight(0xffffff, 1.2);

  light.position.set(0, 0, 6);
  scene.add(light);

  camera.position.z = 10;

  function render(){
    requestAnimationFrame(render);
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;
    renderer.render(scene, camera);
  }
  render();
</script>
```

<div id="canvascontainer"></div>

<script>
  var scene    = new THREE.Scene();
  var camera   = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  renderer.setClearColor(0x3399ff);
  document.getElementById("canvascontainer").appendChild(renderer.domElement);

  var geometry = new THREE.BoxGeometry(5, 5, 5);

  var loader = new THREE.TextureLoader();
  // URL of texture
  loader.load("/images/boxtexture.jpg", function(texture){
    var material = new THREE.MeshLambertMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  var light = new THREE.PointLight(0xffffff, 1.2);

  light.position.set(0, 0, 6);
  scene.add(light);

  camera.position.z = 10;

  function render(){
    requestAnimationFrame(render);
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;
    renderer.render(scene, camera);
  }
  render();
</script>

### 3D Blender Models

Instead of using three.js's primative shapes we can use a modeling program such as [Blender](https://www.blender.org/) to export 3d models as .json

You must have [this](https://github.com/mrdoob/three.js/tree/master/utils/exporters/blender) addon in order to export blender models as .json  

Open up blender and create a monkey model by clicking on **create** > **Monkey**. Delete the default cube by right clicking on it and hitting delete:

![Monkey blender](/images/blendermonkey.png)

Let's add a material to the model by right clicking on the monkey and on the right side selecting material: 

![Blender Monkey Material](/images/blendermonkeymaterial.png)

Apply a new material by clicking **New** and selecting a color with a lambert shader:

![Blender New Shader](/images/blendermonkeynewmaterial.png)

Export the model as .json:

**File** > **Export** > **Three.js**

On the left under **shading** check **Face Materials**

Export it and rename the extension from .json to .js

![Blender export .json](/images/blendermonkeyexport.png)

### [Load](http://threejs.org/docs/index.html#Reference/Loaders/JSONLoader) the object

```html
<script>
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
renderer.setClearColor(0x3399ff);
document.body.appendChild(renderer3.domElement);

var light = new THREE.PointLight(0xffffff, 1.2);
scene.add(light);
light.position.set(0, 3, 3);

// Load the object 
var loader = new THREE.JSONLoader().load("/js/monkey.js", function(geometry, materials){
  var material = new THREE.MultiMaterial(materials);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

camera.position.z = 2;

function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
</script>
```

<div id="canvascontainer3"></div>

<script>
var scene3 = new THREE.Scene();
var camera3 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer3 = new THREE.WebGLRenderer();
var light3 = new THREE.PointLight(0xffffff, 1.2);
renderer3.setSize(window.innerWidth/2, window.innerHeight/2);
renderer3.setClearColor(0x3399ff);
document.getElementById("canvascontainer3").appendChild(renderer3.domElement);

scene3.add(light3);

light3.position.set(0, 3, 3);
var loader3 = new THREE.JSONLoader().load("/js/monkey.js", function(geometry3, materials3){
  var material3 = new THREE.MultiMaterial(materials3);
  mesh3 = new THREE.Mesh(geometry3, material3);
  scene3.add(mesh3);
});

camera3.position.z = 2;

function render3(){
  requestAnimationFrame(render3);
  renderer3.render(scene3, camera3);
}
render3();
</script>

<br>

And that's the basics of Three.js, thanks for reading!
