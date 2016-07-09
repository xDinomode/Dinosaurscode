---
layout: post
title: "HTML5 Canvas Tutorial"
description: "Learn how to use the HTML5 Canvas in this simple but effective tutorial for beginners."
category: tutorials
---

In this tutorial I'll demonstrate the basics of the HTML5 canvas element.

<!--more-->

Let's begin by adding a canvas element:

<style>

</style>

```html
<!doctype html>
<html>
  <head></head>

  <body>
    <!--Canvas-->
    <canvas id="canvas"></canvas>
  </body>
</html>
```
<canvas id="canvas1">
</canvas>

By default the canvas element has width/height of **300 pixels** x **150 pixels** (the gap above is a canvas).  

Add a border to see it:

```html
<canvas id="canvas" style="border:2px solid blue;"></canvas>
```

<script>
    window.onload = function(){
    var ctx1 = document.getElementById("canvas1").getContext("2d");
    var ctx2 = document.getElementById("canvas2").getContext("2d");
    var ctx3 = document.getElementById("canvas3").getContext("2d");
    var ctx4 = document.getElementById("canvas4").getContext("2d");
    var ctx5 = document.getElementById("canvas5").getContext("2d");
    var ctx6 = document.getElementById("canvas6").getContext("2d");
    var ctx7 = document.getElementById("canvas7").getContext("2d");
    var ctx8 = document.getElementById("canvas8").getContext("2d");
    var ctx9 = document.getElementById("canvas9").getContext("2d");

    ctx3.fillRect(0,0, 50, 50);

    ctx4.fillStyle = "#A7E1BE";
    ctx4.fillRect(0, 0, 50, 50);

    ctx5.strokeStyle = "#00ADE5";
    ctx5.strokeRect(0, 0, 50, 50);

    ctx6.beginPath();
    ctx6.moveTo(0,0);
    ctx6.lineTo(50, 50);
    ctx6.stroke();

    ctx7.beginPath();
    ctx7.moveTo(0, 0);
    ctx7.lineTo(50, 50);
    ctx7.lineTo(0, 50);
    ctx7.stroke();

    ctx8.beginPath();
    ctx8.moveTo(0, 0);
    ctx8.lineTo(50, 50);
    ctx8.lineTo(0, 50);
    ctx8.fill();
   
    ctx9.font = "48px sans-serif"
    ctx9.fillText("text", 50, 50);

    }
</script>

<canvas id="canvas1" style="border:2px solid blue;">
</canvas>

<br>

Add a fallback for older browsers by placing content inside the canvas element. 

```html
<canvas id="canvas" style="border:2px solid blue;">
  <h1>Update your web browser!</h1>
</canvas>
```

<canvas id="canvas2" style="border:2px solid blue;">
</canvas>

<br>

Drawing on the canvas requires a [2d render context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D): 

```html
<!doctype html>
<html>
  <head></head>

  <body>
    <script>
      // Use this 2d context for drawing
      var ctx = document.getElementById("canvas").getContext("2d"); 
    </script>

    <canvas id="canvas">
      <h1>Update your web browser!</h1>
    </canvas>
  </body>
</html>
```

This context object has methods we can use for drawing such as [fillRect(x, y, width, height)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.fillRect(0,0, 50, 50);
</script>

```

<canvas id="canvas3" style="border:2px solid blue;">
</canvas>

Change the fill color with fillStyle

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.fillStyle = "#A7E1BE"
  ctx.fillRect(0,0, 50, 50);
</script>
```

<canvas id="canvas4" style="border:2px solid blue;">
</canvas>

Or draw a rectangular outline with [strokeRect(x, y, width, height)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect)

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.strokeStyle = "#00ADE5"
  ctx.strokeRect(0,0, 50, 50);
</script>
```

<canvas id="canvas5" style="border:2px solid blue;">
</canvas>

<br>

For more complex shapes we use [paths](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths):

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(50, 50);
  ctx.stroke();
</script>
```

**beginPath();** Prepare the context for drawing paths

**moveTo(x, y)** Place the "pencil" at this point

**lineTo(x, y)** Creates a line to this point but doesn't draw it

**stroke()** Strokes the path

<canvas id="canvas6" style="border:2px solid blue;">
</canvas>

Adding another lineTo will create a new line starting from where the last lineTo left off

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(50, 50);
  ctx.lineTo(0, 50);
  ctx.stroke();
</script>
```

<canvas id="canvas7" style="border:2px solid blue;">
</canvas>

Replacing stroke with fill:

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(50, 50);
  ctx.lineTo(0, 50);
  ctx.fill();
</script>
```


<canvas id="canvas8" style="border:2px solid blue;">
</canvas>

More shapes can be demonstrated [here](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

<br>

Adding text inside the canvas is also possible:

```javascript
<script>
  var ctx = document.getElementById("canvas").getContext("2d"); 
  ctx9.font = "48px sans-serif"
  ctx.fillText("text", 50, 50);
</script>
```

<canvas id="canvas9" style="border:2px solid blue;">
</canvas>

<br>

The 2d context has many more methods such as rendering images or gradients. For more I recommend continuing [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).

Thanks for reading!
