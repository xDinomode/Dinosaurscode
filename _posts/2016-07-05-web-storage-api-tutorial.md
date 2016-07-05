---
layout: post
title: "Web Storage API Tutorial"
description: "A quick and simple tutorial on the Web Storage API for storing persistent data."
category: tutorials
---

The Web Storage API allows client side data storage. Just like cookies only 
they don't have to be passed with every request.

<!--more-->

The two methods for storing data are: 

* **sessionStorage**

* **localStorage**

Both are [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) objects with the exact same methods.

The difference between them is that sessionStorage data is wiped once the browser closes. On the other hand, localStorage data persists after a browser restart.

We'll use localStorage for this demonstration.

### Set a value 

To set a value 

```javascript
localStorage.setItem("key", "value");
```

One thing to take note of is that we can only store strings. 

JavaScript has helpful funtions for converting types. For instance 

```javascript
// Converts the returned value to type int
Number(localStorage.getItem("key")); 
```

### Get a value 

```javascript
localStorage.getItem("key");
```

### Remove a value

```javascript
localStorage.removeItem("key");
```

### Remove all values

```javascript
localStorage.clear();
```

### Demonstration 

I'm going to set a key named "visits" that increments by one on every refresh.

<h1 id="visits"></h1>

<button id="buttonClear">Clear</button>

<script>
    window.onload = function(){
        var visitsID = document.getElementById("visits");
        var buttonClear = document.getElementById("buttonClear");
        
        if(Number(localStorage.getItem("visits")) >= 0){
            var number = Number(localStorage.getItem("visits"));
            number += 1;
            localStorage.setItem("visits", number);
            visitsID.innerHTML = number;
            console.log(localStorage.getItem("visits"));    
        } else {
            localStorage.setItem("visits", "0");    
            console.log(localStorage.getItem("visits"));
        }

        buttonClear.addEventListener("click", function(){
            localStorage.clear();    
            visitsID.innerHTML = 0;
        });
    };
</script>
