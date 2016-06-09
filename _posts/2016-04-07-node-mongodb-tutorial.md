---
layout: post
title: "MongoDB and NodeJS Tutorial"
description: "Learn how to use MongoDB and NodeJS together."
category: NodeJS
---

Today I'll be demonstrating how to use [MongoDB](https://www.mongodb.org/) and [NodeJS](https://nodejs.org/en/) together.

<!--more-->

<br>

#### Requirements:

* [MongoDB must be installed on your machine.](https://docs.mongodb.org/manual/installation/)
* [NodeJS must be installed on your machine as well.](https://nodejs.org/en/)
<br>
<br>

### 1. Create your package.json

click enter for all options that appear

```bash
$ npm init
```
you should now have a package.json file
<br>
<br>

### 2. Create your main index.js file

this file is the backbone of the entire application

```bash
$ touch index.js
```

Windows users create it manually.
<br>
<br>

### 3. Install the modules we'll be using

>>>- express (webdev framework)
>
>>>- ejs (templating)
>
>>>- mongoose (connects express to mongodb)

```bash
$ npm install express ejs mongoose --save
```
<br>
<br>

### 4. Open up index.js and write this code. I'll explain each line.

```javascript
// index.js
var express = require("express");
var app = express();
var router = require("./router/router.js");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", router);

app.listen(3000);

```

```javascript
// Pull in express and assign it to app.
var express = require("express");
var app = express();
```

```javascript
// A router is the same as the app variable above.
// But it allows less code inside index.js
var router = require("./router/router.js");
```

```javascript
// Add our template engine.
app.set("view engine", "ejs");
// Tell express where to find our rendered templates
app.set("views", "./views");
```

```javascript
// Our router will handle all request made to /
app.use("/", router);
// Have our app listen on port 3000
app.listen(3000);
```
<br>
<br>

### 5. Create our router and views

cd into router and place an empty router.js file

```bash

$ mkdir router
$ cd router
$ touch router.js
```

cd into views and place an empty index.ejs file

```bash

$ mkdir views
$ cd views
$ touch index.ejs
```
<br>
<br>

### 6. Now we create a model

What's a model? It's the schema of the database.

```bash

$ mkdir models
$ cd models
$ touch names.js
```

### and insert the following into names.js

```javascript
// models/names.js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Names");

var Schema = mongoose.Schema({
  name: String
});

var Model = mongoose.model("Names", Schema);

module.exports = Model;
```

```javascript
// Require monoose
var mongoose = require("mongoose");
// Tell mongoose where MongoDB is listening
mongoose.connect("mongodb://localhost/Names");
```

```javascript
// A Schema defines the layout of a database.
// In this case only one column named name.
var Schema = mongoose.Schema({
  name: String
});
```

```javascript
// This variable allows us to manipulate the database.
// First parameter is the name of the database and the second our Schema
var Model = mongoose.model("Names", Schema);
//module.exports lets us call Model from other parts of our app
module.exports = Model;
```
<br>
<br>

### 7. Open up router/router.js and let it handle manipulating the database. As well as handling http requests.

```javascript
var express = require("express");
var Names = require("../models/names.js");

router.get("/", function(req, res){
  Names.find({}, function(err, names){
    if(err) throw err;
    if(names.length > 1){
      res.render("index", {data: names})
    } else{
      res.render("index", {data: "No names added yet!"})
    }
  });
});

router.get("/:name", function(req, res){
  var newName = new Names({ name: req.params.name });
  newName.save(function(err){
    if(err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
```

**router.get("/")** pulls in all names from our database and hands the data to our index.ejs template

**router.get("/:name")** creates a new name in our database
<br>
<br>

### 8. Create our homepage inside views/index.ejs

```html
<!DOCTYPE html>
<html>
<head>
  <title>MongoDB Web App</title>
</head>
<body>
<!-- Use EJS to print out our data-->
  {% raw  %}
  <% for (var i = 0; i < data.length; i++) {%>
    <p> <%= data[i].name %> </p>
  <% } %>
  {% endraw %}
</body>
</html>
```
<br>
<br>

### 9. Start up MongoDB

```bash
$ mongod
```
<br>
<br>

### 10. Start up your Node app

```bash
$ node index.js
```

![MongoDB localhost](/images/mongolocalhost.png)

There should be nothing there if your database is empty. Start adding names by going to
**localhost:3000/YourNameGoesHere**
