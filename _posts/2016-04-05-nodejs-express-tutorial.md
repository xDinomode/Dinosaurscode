---
layout: post
title: "Node.JS Express Tutorial"
description: Node.JS express tutorial. How to build a website using NodeJS and Express.
category: NodeJS
---


[Express](http://expressjs.com/) is a web development framework that helps us build websites quickly and easily.

<!--more-->

>>> * Make sure you have [NodeJS](https://nodejs.org/en/) installed
>>> * Open your terminal or command prompt
<br>
<br>

### 1. Create a new folder
```bash
$ mkdir mywebsite
```
<br>

### 2. cd into the folder
```bash
$ cd mywebsite
```
<br>

### 3. Run npm init and click enter for all options
```bash
$ npm init
```
<br>

### 4. Create a new file titled index.js
```bash
$ touch index.js
```
<br>

### 5. Install Express
```bash
$ npm install express --save
```
<br>

### 6. Open index.js in a text editor and add the following code
```javascript
var express = require("express");

var app = express();

app.get("/", function(req, res){
  res.send("Hello world");
});

app.listen(3000);
```
<br>

### 7. Type localhost:3000 into your webbrowser and you should see this
![Express localhost](/images/expresslocalhost.png)

### 8. In order for us to display HTML we must download [EJS](http://www.embeddedjs.com/)
```bash
$ npm install ejs --save
```
<br>

### 9. Add ejs to your index.js file
```javascript
var express = require("express");

var app = express();

//add these two lines
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", function(req, res){
  res.render("index");
});

app.listen(3000);
```
<br>

### 10. Create a folder titled views and inside create a file titled index.ejs
```bash
$ mkdir views
```
```bash
$ cd views
```
```bash
$ touch index.ejs
```
<br>

### 11. Now we add our html like normal inside index.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Express Tutorial</title>
</head>
<body>
  <h1>Hello world</h1>
</body>
</html>
```
<br>

### 12. And done! Your website is running on localhost:3000
![Express html server](/images/expresslocalhosthtml.png)
