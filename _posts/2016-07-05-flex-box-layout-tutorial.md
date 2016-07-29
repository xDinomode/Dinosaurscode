---
layout: post
title: "Flex Box Layout Tutorial"
description: "Learn how to use the Flex Box Layout in this quick and simple tutorial."
category: tutorials
---

The CSS3 Flex Box layout is used on pages that can be resized smoothly.

<!--more-->

For this demonstration I'll use three divs with a class of **box**. Each with with a second class of one,two,three to distinguish their colors.

```html
<div class="container">
  <div class="box one"></div>
  <div class="box two"></div>
  <div class="box three"></div>
</div>
```

```css
.container{
}

.box{
  width: 100px;
  height: 100px;
}
```

<style>
.container{
}

.box{
  width: 100px;
  height: 100px;
}
.onee{
  background: red;    
}
.twoe{
  background: green;    
}
.threee{
  background: orange;    
}
/*part 2*/
.container2{
  display: flex;
}

.box2{
  width: 100px;
  height: 100px;
}
.one2{
  background: red;    
}
.two2{
  background: green;    
}
.three2{
  background: orange;    
}

/*part 3*/
.container3{
  display: flex;
  flex-direction: column;
}

.box3{
  width: 100px;
  height: 100px;
}
.one3{
  background: red;    
}
.two3{
  background: green;    
}
.three3{
  background: orange;    
}

/*part 4*/
.container4{
  display: flex;
  background-color: blue;
}

.box4{
  width: 100px;
  height: 100px;
  flex-grow: 1;
}
.one4{
  background: red;    
}
.two4{
  background: green;    
}
.three4{
  background: orange;    
}

/*part 5*/
.container5{
  display: flex;
  background-color: blue;
}

.box5{
  width: 100px;
  height: 100px;
}
.one5{
  background: red;    
  flex-grow: 1;
}
.two5{
  background: green;    
  flex-grow: 1;
}
.three5{
  background: orange;    
  flex-grow: 4;
}


/*part 6*/
.container6{
  display: flex;
  background-color: blue;
}

.box6{
  width: 100px;
  height: 100px;
}
.one6{
  background: red;    
  flex-grow: 1;
}
.two6{
  background: green;    
  flex-grow: 1;
}
.three6{
  background: orange;    
  flex-grow: 4;
  flex-shrink: 6;
}


/*part 7*/
.container7{
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
}

.box7{
  width: 100px;
  height: 100px;
}
.one7{
  background: red;    
  flex-grow: 1;
}
.two7{
  background: green;    
  flex-grow: 1;
}
.three7{
  background: orange;    
  flex-grow: 1;
}



</style>

<div class="container">
  <div class="box onee"></div>
  <div class="box twoe"></div>
  <div class="box threee"></div>
</div>

The parent element (container) of the boxes must be set to display flex first

```css
.container{
  display: flex;    
}
```

<div class="container2">
  <div class="box one2"></div>
  <div class="box two2"></div>
  <div class="box three2"></div>
</div>

By default the flex boxes have a [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) of row. Meaning inline but they can also be 

Column

```css
.container{
  display: flex;
  flex-direction: column;
}
```

<div class="container3">
  <div class="box one3"></div>
  <div class="box two3"></div>
  <div class="box three3"></div>
</div>

The awesome thing about flex box is that each box can grow or shrink with the screen size. 

Using [flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) each box can change dimension as the screen grows. 

```css
.box{
  flex-grow: 1;    
}
```

<div class="container4">
  <div class="box4 one4"></div>
  <div class="box4 two4"></div>
  <div class="box4 three4"></div>
</div>

In this case I applied an equal value to all so they each grow in the same proportion.

Giving the last box a higher value will result in different proportions 

```css
.one{
  flex-grow: 1;    
}
.two{
  flex-grow: 1;    
}
.three{
  flex-grow: 4;    
}
```

<div class="container5">
  <div class="box4 one5"></div>
  <div class="box4 two5"></div>
  <div class="box4 three5"></div>
</div>

[flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) does the same only as the screen shrinks.

```css
.three{
  flex-shrink: 6;    
}
```

<div class="container6">
  <div class="box4 one6"></div>
  <div class="box4 two6"></div>
  <div class="box4 three6"></div>
</div>

One last key concept is [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) by default the container will expand the screen size's width if the boxes don't fit.

Setting the container to wrap will cause the boxes to drop under one another once they don't fit

```css
.container{
  display: flex;
  flex-wrap: wrap;
}
```

<div class="container7">
  <div class="box4 one7"></div>
  <div class="box4 two7"></div>
  <div class="box4 three7"></div>
</div>

<img src="/images/flexbox.gif" alt="Flexbox gif">

And that's the basics of flex box. Thanks fo reading!
