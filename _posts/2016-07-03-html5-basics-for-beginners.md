---
layout: post
title: "HTML5 Basics for Beginners"
description: "Learn what is HTML5 and why you should begin implementing it in your code. For beginners."
category: tutorials
---

HTML5 brings with it new elements, attributes, and APIs.

<!--more-->

Before writing HTML5 you should always make sure old browsers will understand it. 

In your CSS make the new HTML5 elements display block 

```css
main, section, article,
header, footer, aside,
nav, figure {
    display: block;    
}
```

Second add [html5shiv](https://github.com/aFarkas/html5shiv) 

> The HTML5 Shiv enables use of HTML5 sectioning elements in legacy Internet Explorer and provides basic HTML5 styling for Internet Explorer 6-9, Safari 4.x (and iPhone 3.x), and Firefox 3.x. 

It's a javascript file that's used in the **head** 

```html
<!doctype html>
<html>
  <head>
    <!--[if lt IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
    <![endif]-->
  </head>
  <body></body>
</html>
```

### Elements

The new elements improve semantics and readability of the code.

Before you would use divs with IDs and classes 

```html
<div class="header">
  <div class="nav-bar">
  
  </div>
</div>
```

And in HTML5 

```html
<header>
  <nav>

  </nav>
</header>
```

You may be asking yourself, "when and in what order should I use these new elements?" Well, remember they're all block elements just like divs.

They only improve semantics and legibility.

<div id="html5-wrapper">
  <header>
 	<p>header</p>  
	<nav>
		<p>nav</p>
	</nav>
  </header>
	
  <section>
	<p>section</p>
  </section>
	
  <aside>
    <p>aside</p>
  </aside>

  <footer>
	<p>footer</p>
  </footer>
</div>

### Attributes

```html 
<form>
  <input type="color">
</form>
```
<div id="html5-wrapper-form">
<form>
  <input type="color">
</form>
</div>

<br>

```html 
<form>
  <input type="email">
</form>
```

<div id="html5-wrapper-form">
<form>
  <input type="email">
</form>
</div>

<br>

```html 
<form>
  <input type="text" required>
</form>
```

<div id="html5-wrapper-form">
<form>
  <input type="text" required>
</form>
</div>

<br>

```html 
<form>
  <input type="text" placeholder="HTML5 rocks">
</form>
```


<div id="html5-wrapper-form">
<form>
  <input type="text" placeholder="HTML5 rocks">
</form>
</div>

You can find many more attributes [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)

### APIs

[Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) allow the client and server to keep a connection open. This is helpful for games where the client constantly has to update its position in space and chat boxes.

[WebRTC](https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC) allows client to client connections. 

[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) allows the server to store data in the client's browser. Unlike cookies, they don't have to be passed on every request. Also they have a higher storage capacity than cookies.    

There are many more great things about HTML5, but of course this is only a basic introduction. 

For more info I'd recommend continuing [here](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

Thank your for reading.
