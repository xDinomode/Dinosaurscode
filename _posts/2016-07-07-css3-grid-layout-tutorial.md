---
layout: post
title: "CSS3 Grid Layout Tutorial"
description: "A simple tutorial that teaches CSS grid layout for beginners."
category: tutorials
---

The CSS3 Grid Layout allows a more flexible positioning of DOM elements. 

No more floats, yay!

<!--more-->

### Compatability 

Actually, it's an "experimental technology" currently and requires you to enable it in your browser first. 

In other words you should **NOT** begin switching your float layouts to CSS grid layouts.  

Here's a [browser compatability](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility) chart, but I'll show how to enable it in Firefox and Chrome. 

### To enable grid layout in Firefox:

Type into the URL **about:config**

![Firefox about:config](/images/firefoxaboutconfig.png)

Click **I'll be careful, I promise!**

![Firefox be careful](/images/firefoxbecareful.png)

Search for **layout.css.grid.enabled**

![Firefox grid enabled false](/images/firefoxgridenabledfalse.png)

If the value is false switch it to **true** by double clicking it

![Firefox grid enabled true](/images/firefoxgridenabledtrue.png)

### To enable grid layout in Chrome: 

Type into the URL **chrome://flags**

![Google Chrome Flags](/images/chromeflags.png)

Search for **Experimental Web Platform features** and click **Enable**

![Chrome Enable Experimental Web](/images/chromeenableexperimental.png)

### Basics

I'll be using the following 

```html
<div class="container">
  <div class="box one">one</div>
  <div class="box two">two</div>
</div>
```

<br>

Make the container **display grid**

```css
.container {
  display: grid;    
}
```



<style>
/*1*/
.container1 {
  display: grid;    
}
.box1 {
    
}
.one1 {
  background: red;    
}
.two1 {
  background: orange;
}

/*2*/
.container2 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box2 {
    
}
.one2 {
  background: red;    
}
.two2 {
  background: orange;
}

/*3*/
.container3 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box3 {
    
}
.one3 {
  background: red;    
}
.two3 {
  background: orange;
}
.three3 {
  background: green;    
}
.four3 {
  background: blue;    
}


/*4*/
.container4 {
  display: grid;    
  grid-template-columns: 100px 1fr;
  grid-template-rows: 200px 1fr; 
}
.box4 {
    
}
.one4 {
  background: red;    
}
.two4 {
  background: orange;
}
.three4 {
  background: green;    
}
.four4 {
  background: blue;    
}

/*5*/
.container5 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box5 {
    
}
.one5 {
  background: red;    
  border-left: 5px solid blue;
}
.two5 {
  background: orange;
  border-left: 5px solid blue;
  border-right: 5px solid blue;
}

/*6*/
.container6 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box6 {
    
}
.one6 {
  background: red;    
  border-top: 5px solid blue;
  border-bottom: 5px solid blue;
}
.two6 {
  background: orange;
  border-top: 5px solid blue;
  border-bottom: 5px solid blue;
}

/*7*/
.container7 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box7 {
    
}
.one7 {
  background: red;    
  grid-column-start: 2;
  grid-column-end: 3;

}
.two7 {
  background: orange;
}

/*8*/
.container8 {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
.box8 {
    
}
.one8 {
  background: red;    
  grid-column-start: 2;
  grid-column-end: 3;

}
.two8 {
  background: orange;
  grid-row-start: 1;
  grid-row-end: 2;
}
</style>

By default display grid will place its child items into one single column

<div class="container1">
  <div class="box1 one1">one</div>
  <div class="box1 two1">two</div>
</div>

<br>

Using [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) inside the container you can specify the width of each column

```css
.container {
  display: grid;    
  grid-template-columns: 100px 1fr;
}
```


<div class="container2">
  <div class="box2 one2">one</div>
  <div class="box2 two2">two</div>
</div>

Column one will have a fixed width of 100px and column two will take up the remaining space. 

<br>

Let's add more boxes to demonstrate rows

```html
<div class="container">
  <div class="box one">one</div>
  <div class="box two">two</div>
  <div class="box three">three</div>
  <div class="box four">four</div>
</div>
```

<div class="container3">
  <div class="box2 one3">one</div>
  <div class="box2 two3">two</div>
  <div class="box2 three3">three</div>
  <div class="box2 four3">four</div>
</div>

<br>

We can also specify the height of each row using [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)

```css
.container {
  display: grid;    
  grid-template-columns: 100px 1fr;
  grid-template-rows: 200px 1fr;
}
```

<div class="container4">
  <div class="box4 one4">one</div>
  <div class="box4 two4">two</div>
  <div class="box4 three4">three</div>
  <div class="box4 four4">four</div>
</div>

<br>

Lastly I'll show how to switch the boxes around.

In this grid there are 3 column lines

<div class="container5">
  <div class="box5 one5">one</div>
  <div class="box5 two5">two</div>
</div>

And 2 row lines

<div class="container6">
  <div class="box6 one6">one</div>
  <div class="box6 two6">two</div>
</div>

Currently box one has a **column start** of **1** (the first blue line to the left of it) and **column end** of **2** (blue line on the right of it). Move it into box two's position

```css
.one {
  grid-column-start: 2;
  grid-column-end: 3;
}
```

<div class="container7">
  <div class="box7 one7">one</div>
  <div class="box7 two7">two</div>
</div>

This will take box two's spot and thus gets pushed into the next row. Move it back up using **grid-row-start**/**grid-row-end** 

```css
.two {
  grid-row-start: 1;
  grid-row-end: 2;
}
```

<div class="container8">
  <div class="box8 one8">one</div>
  <div class="box8 two8">two</div>
</div>

<br>

And that's the basics. For more info read Mozilla's [grid docs](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) as well as [Grid by Example](http://gridbyexample.com/examples/)

Thanks for reading!
