---
layout: post
title: "Node.js and Express Framework Guide"
category: NodeJS 
description: "Node.js and Express guide for beginners, building websites and web applications quickly."
---

[Node.js](https://nodejs.org/en/) provides a low level [HTTP API](https://nodejs.org/dist/latest-v4.x/docs/api/http.html) that enables programmers to build HTTP applications.

<!--more-->

Here's a simple web server 

```javascript
var http = require('http');

var httpServer = http.createServer(function(req, res){
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end("Okay");
});

httpServer.listen('9000');
```

**http.CreateServer** returns a new instance of [http.Server](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_server) and is used to create a TCP or local server. 

**server.listen** starts a local socket server listening for connections on the given path.

### EXPRESS 

Using the web framework [Express](http://expressjs.com/) can speed up your development drastically.

Other benefits of using Express are routing, middleware, template engines and more.

To begin using Express start by creating a **package.json** file. This file includes your dependencies, app version, and more. 

Running the following command creates it automatically 

```bash
npm init
```

To install Express run 

```bash
npm install --save express
```

Then create a web server 

```javascript
// index.js
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello there!');    
}).listen(3000);
```

Instead of using app to handle routing we'll create an **express.Router** that way middleware will only apply to the router and not the whole app.

```javascript
// router.js
var express = require('express');
var router = express.Router();

// middleware called before serving requests 
router.use(function(req, res, next){
    console.log(req.headers);
    next();
});

router.get('/v1', function(req, res){
    res.send('My API');
});

module.exports = router;
```

Use the router inside index.js

```javascript
// index.js
var express = require('express');
var app = express();

var router = require('./router');

// requests to /api are handled by router
app.use('/api', router);

app.get('/', function(req, res){
    res.send('Hello there!');    
}).listen(3000);
```

Go to **localhost:3000/api/v1** and you will see the HTTP header you sent to the router's middleware.

Now that our app has an api we should serve proper html with css.

Create a **public** folder with **main.css** inside 

```css
/* public/main.css */

body {
	background-color: red;
}
```

And serve it as static content

```javascript
// index.js
var express = require('express');
var app = express();

var router = require('./router');

// express will look in this folder for static content 
app.use(express.static('public'));

// requests to /api are handled by router
app.use('/api', router);

app.get('/', function(req, res){
    res.send('Hello there!');    
}).listen(3000);
```

Create an **index.html** page inside the public directory 

```
<!--public/index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Express App</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <h1>Express is awesome!</h1>
</body>
</html>
```

Lastly remove app.get('/') because index.html is served statically.

```javascript
// index.js
var express = require('express');
var app = express();

var router = require('./router');

// express will look in this folder for static content 
app.use(express.static('public'));

// requests to /api are handled by router
app.use('/api', router);

app.listen(3000);
```

Run index.js 

```bash
node index.js
```

![Express Nodejs](/images/expressnode.png)

And that's the basics of Express. Of course, there's much more such as [templates](http://expressjs.com/en/guide/using-template-engines.html) to be learned.

Thanks for reading!
 



