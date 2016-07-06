---
layout: post
title: "CSS3 Simple Animation Tutorial"
description: "Learn how to animate your website using pure CSS3 without javascript. A simple but effective tutorial."
category: tutorials
---

CSS3 animations allow elements to change their CSS properties within a set time period. 

<!--more-->

Any element that requires animating must have a property called [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) 

```css
.box {
  animation: ;    
}
```

As well as **@keyframes** to specify the starting and ending points of an animation.

The following animation has three values:

**animation-name** is the name of the keyframes in this case myKeyframes

**animation-duration** is the time it takes for the animation to complete in seconds 

**animation-iteration-count** is how many times the animation loops. Can be &lt;number&gt; or infinite

```css
@keyframes myKeyframes {
  0% {
    background: red;    
  }  
  100% {
    background: cyan;    
  }
}

.box {
  /*name, duration, iteration-count*/
  animation: myKeyframes 5s infinite;    
}
```

<div class="box1"></div>

To make the last animation look smoother we can add [animation-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) to reverse the direction of the animation on completion.  

```css
.box {
  animation: myKeyframes 5s infinite alternate;    
}
```

<div class="box2"></div>

You can also set the [animation-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay) to delay the start of the animation

```css
.box {
  animation: myKeyframes 5s infinite alternate 5s;    
}
```

<div class="box3"></div>

Lastly you have [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) that adjusts the speed of change between keyframes

```css
.box {
  animation: myKeyframes 1s infinite alternate ease-in-out;
}
```

<div class="box4"></div>


<br>

For more in depth into CSS3 Animations I recommend reading Mozilla's [Using CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

Thanks for reading!
<style>
  @keyframes myKeyframes {
    0% {
      background-color:red;    
    }    
    100% {
      background-color: cyan;    
    }
  }
  .box1 {
    animation: myKeyframes 5s infinite;    
    width: 100px;
    height: 100px;
  }
  .box2 {
    animation: myKeyframes 5s infinite alternate;
    width: 100px;
    height: 100px;
  }
  .box3 {
    animation: myKeyframes 5s infinite alternate 5s;
    width: 100px;
    height: 100px;
  }
  .box4 {
    animation: myKeyframes 1s infinite alternate ease-in-out;
    width: 100px;
    height: 100px;
  }
  @keyframes name {
    0% {
      background-color:red;    
    }    
    100% {
      background-color: cyan;    
    }
  }
  </style>
