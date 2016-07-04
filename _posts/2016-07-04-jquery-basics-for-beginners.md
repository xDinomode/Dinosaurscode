---
layout: post
title: "jQuery Basics for Beginners"
description: "Learn the basics of jQuery and how it works compared to vanilla JavaScript."
category: tutorials
---

jQuery prides itself on "write less, do more." 

<!--more-->

In other words, it removes the complexity of vanilla JavaScript in favor a shorter more intuitive syntax.  

You can accomplish the same thing in jQuery with Javascript and vice versa. The difference is that jQuery has an easy to use API.

### How to get jQuery

There are many ways to [download](https://jquery.com/download/) jQuery but the simplest method would be to use a [CDN](https://cdnjs.com/libraries/jquery/).

The best place to place it is at the end of the body tag

```html
<!doctype html>
<html>
  <head>
    <title>jQuery Basics</title>
  </head>
  <body>
    <!--CDN-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js">
    </script>

    <script>
      // Your code goes here
    </script>
  </body>
</html>
```

### jQuery Basics

jQuery can run once the DOM is ready for manipulation.

```javascript
$(document).ready(function(){
  // Your code goes here    
});
```

or a more advanced technique that does the same thing

```javascript
$(function(){
    // Your code goes here
});
```

Another important thing to know is that **$** is an alias for **jQuery** so the previous functions could have been written as 

```javascript
jQuery(document).ready(function(){
   // Your code goes here 
});
```


You could also replace **$** with your own variable name to avoid name clashes with other libraries

```javascript
var $myName = jQuery.noConflict();

$myName(document.).ready(function(){
   // Your code goes here 
});
```

### Event handling

Events bind to objects such as elements and once triggered fire an event handler (callback).

```javascript
$("#button").on("click", function(event){
    event.preventDefault();
    alert("Button clicked");
});
```
<button id="button">Click me</button>

Notice the **event** that was passed into the callback. That's an [event object](http://api.jquery.com/category/events/event-object/) that has methods and properties for that specific event. 

There are far too many events to cover in a basic tutorial so you can view more of them [here](http://api.jquery.com/category/events/)

### Effects

jQuery comes with great looking effects

```javascript
$("#button2").on("click", function(event){
   $(this).hide(); 
});
```

Notice **this** inside the callback. It refers to this currently selected DOM element in this case **#button2**

<button id="button2">Hide me</button>

```javascript
$("#button3").on("click", function(event){
   $(this).slideUp(); 
});
```

<button id="button3">Slide me up</button>

Many more cool effects can be found [here](http://api.jquery.com/category/effects/).

### Manipulate the DOM

jQuery makes it easy to add attributes to elements, change the inner HTML, and getting values from elemenets.

Adding a class 

```html
<style>
    .addMe {
        color: red;
    }
</style>

<button id="button4">Add a class</button>
```

```javascript
$("#button4").on("click", function(event){
   $(this).addClass("addMe"); 
});
```
<button id="button4">Add a class</button>

Many more awesome manipulation methods can be found [here](http://api.jquery.com/category/manipulation/)

<br>

And that's the basics of jQuery hope you learned something new!

<style>
    .addMe{
        color: red;    
    }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js">
</script>

<script>
    $(document).ready(function(){
        $("#button").on("click", function(e){
            e.preventDefault();
            alert("button clicked");
        });

        $("#button2").on("click", function(e){
            $(this).hide(); 
        });
        $("#button3").on("click", function(e){
            $(this).slideUp(); 
        });
        $("#button4").on("click", function(e){
            $(this).addClass("addMe"); 
        });

    });
</script>

