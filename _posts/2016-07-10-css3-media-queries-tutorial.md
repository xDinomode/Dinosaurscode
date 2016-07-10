---
layout: post
title: "CSS3 Media Queries"
description: "A short but highly effective introduction to css3 media queries for beginners."
category: tutorials
---

Currently the best method for designing responsive websites are with media queries. They allow the css of a website to change depending on the screen size. 

<!--more-->

### Set up

Create an **index.html** file with the following content inside: 

```html
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
  </body>
</html>
```
This meta tag enforces the user's web browser to display the website at the correct width of the device. For more information on this tag read [this](http://www.w3schools.com/css/css_rwd_viewport.asp).

<br>

<style>
  .html {
    width: 100%;
    height: 150px;
    background: red;
  }  
  @media (max-width: 320px){
    .html {
      background: green;    
    }
  }

  .lands {
     width: 100%;
     height: 150px;
     background: red;
  }
  @media (orientation: landscape) {
    .lands {
      background: cyan;    
    }
  }

  .logical {
     width: 100%;
     height: 150px;
     background: red;
  }
  @media (max-width: 320px) and (orientation: landscape) {
    .logical {
      background: purple;    
    }
  }
</style>

### Add media queries

Media queries should be added inside your .css files. Create the file **style.css** and [link](http://www.w3schools.com/tags/tag_link.asp) it inside your index.html file.

```css
body {
  background: red;    
}

@media (max-width: 320px){
    body {
      background: green;    
    }
}
```

<div class="html">

</div>

**(max-width: 320px)** means whenever the the screen size is smaller than 320px change the css.

You could also use **(min-width: 320px)** and the css would change when the screen size is above 320px.

<br>

### Orientation

You can also change the css depending on the orientation of the device (portrait/landscape) 

> Turn your mobile device sideways to see the box color cyan. 

```css
body {
  background: red;    
}

@media (orientation: landscape){
    body {
      background: cyan;    
    }
}
```

<div class="lands">

</div>

<br>

### Logical operators 

Cool but what if we want to use more than one condition? Well we use **and** or **not**


```css
body {
  background: red;    
}

@media (max-width: 320px) and (orientation: landscape){
    body {
      background: purple;    
    }
}
```

<div class="logical">

</div>

<br>

Those are the basics of media queries and with them you can design responsive websites. For more on media queries go [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).

Thanks for reading!
