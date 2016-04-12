---
layout: post
title : "How To Upload Images to MongoDB using Express/Imgur clone"
description: "Learn how to upload images to MongoDB. Create an image uploader app. Imgur clone in NodeJS and Express."
category: NodeJS
---
<br>

### 1. Create a package.json for your app

Yes for all options that appear

```bash
$ npm init
```
<br>
<br>

### 2. Install dependencies

> [Express](http://expressjs.com/) our web framework
>
> [EJS](http://www.embeddedjs.com/) our template engine
>
> [gridfs-stream](https://github.com/aheckmann/gridfs-stream) allows us to stream data into MongoDB
>
> [Mongoose](http://mongoosejs.com/) lets use connect to MongoDB
>
> [Multer](https://github.com/expressjs/multer) is middleware to handle multipart/form-data

```bash
$ npm install ejs express gridfs-stream mongoose multer --save
```
<br>
<br>

### 3. Create the app in index.js

```bash
$ touch index.js
```

and open the file
<br>
<br>

### 4. Open index.js and write the following code into it

```javascript
var express = require("express");
var app = express();

var fs = require("fs");

var multer = require("multer");
var upload = multer({dest: "./uploads"});

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/images");
var conn = mongoose.connection;

var gfs;

var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

conn.once("open", function(){
  gfs = Grid(conn.db);
  app.get("/", function(req,res){
    //renders a multipart/form-data form
    res.render("home");
  });

  //second parameter is multer middleware.
  app.post("/", upload.single("avatar"), function(req, res, next){
    //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
    var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
    //
    // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
  });

  // sends the image we saved by filename.
  app.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  //delete the image
  app.get("/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });
});

app.set("view engine", "ejs");
app.set("views", "./views");



if (!module.parent) {
  app.listen(3000);
}
```
<br>
<br>

### 5. Create a folder named views with a file named home.ejs inside

And open home.ejs after running these commands

```bash

$ mkdir views
$ touch home.ejs
```
<br>
<br>

### 6. Open views/home.ejs and write the following code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>upload</title>
</head>
<body>
  <form action="/" method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar">
    <input type="submit" value="submit">
  </form>
</body>
</html>
```
<br>
<br>

### 6. Start MongoDB and run your app

```bash

$ mongod
$ node index.js
```
<br>
<br>

### 7. Go to localhost:3000 and upload an image

![Image upload](/images/imgupload.png)

success means the image uploaded

![Image upload success](/images/imgupload2.png)
<br>
<br>

### 8. Now you can find your image by typing the images name into the url

![Image upload wolf](/images/imguploadwolve.png)

**Note:** If you don't know the images name, simply open mongo and view the database

```bash

$ mongo
$> use images
$> db.fs.files.find()
```

and look at "filename"
