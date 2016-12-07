---
layout: post
title: "Node.js Koa 2 Framework Tutorial"
description: "Node.js and Koa 2 tutorial for beginners. Setup instructions and the basics of koa.js 2."
category: NodeJS
---

The main difference between koa and koa 2 is that koa 2 supports async/await.  

<!--more-->

Koa gets rid of [callback hell](http://callbackhell.com/
) by combining generators and promises. 

Koa 2 uses async functions, which at the time of this writing are not supported by node.js, to get rid of callback hell. 

Here's a hello world in koa 1:

```javascript
var koa = require('koa');
var app = koa();

// uses generators 
app.use(function *(){
    this.body = 'Hello world';    
});

app.listen(3000);
```

And koa 2: 

```javascript
import Koa from 'koa';

var app = new Koa();

// uses async functions
app.use(async (ctx) => {
    ctx.body = 'Hello world';
});

app.listen(3000);
```

For those that are unfamiliar with the new es2015 syntax I recommend reading [this](https://babeljs.io/docs/learn-es2015/) first.

But a quick rundown of the syntax:

**=>** Function shorthand [(learn more about =>)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 

```javascript
(parameter) => {
    console.log(parameter);        
}

// is the same as

function(parameter) {
    console.log(parameter);
}
```

### Installing koa 2

In order to run Koa 2 you must use a transpiler. This converts the newer syntax into older syntax for node to understand.  

We'll use [babel](https://babeljs.io/) in this demonstration.

First step is to create a new **package.json**: 

```bash
npm init
```

After accepting the defaults install koa 2: 

```bash
npm install --save-dev koa@2
```

### Installing Babel

Install the cli to run babel commands through an npm script.

```bash
npm install --save-dev babel-cli
```

Install the preset. 

```bash
npm install --save-dev babel-preset-es2015
```

We also need ES7 features 

```bash
npm install --save-dev  babel-preset-stage-0
```

Lastly we install babel polyfill

```bash
npm install --save babel-polyfill
```

Create a file named **.babelrc** with the following: 


```json
{
    "presets": ["es2015", "stage-0"]
}
```

Open up **package.json** and add babel inside scripts 

```json
{
  "name": "myApp",
  "version": "1.0.0",
  "description": "", 
  "main": "index.js",
  "scripts": {
      "build": "babel index.js -o app.js"
  },  
  "author": "", 
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.10.1",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-stage-0": "^6.5.0",
    "koa": "^2.0.0"
  },  
  "dependencies": {
    "babel-polyfill": "^6.9.1"
  }
}
```

Create a new koa app in **index.js**

```javascript
import 'babel-polyfill';
import Koa from 'koa';

var app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hello world';
});

app.listen(3000);
```

Run the script we created in package.json to transpile our code:

```bash
npm run build
```

Now that your code has been transpiled into **app.js** you can run node and the app is listening on port 3000

```
node app.js
```

### How does koa 2 work?

Koa executes middleware in a stack like manner.  

```javascript
import 'babel-polyfill';
import Koa from 'koa';

var app = new Koa();

app.use(async (ctx, next) => {
	// call the next middleware below
	await next();
});

app.use(async (ctx, next) => {
	// call the next middleware below
	await next();
});

app.use(async (ctx) => {
	// no more next(); 
	// head back up the stack
	ctx.body = 'Hello world';
});

app.listen(3000);
```

**await next();** stops and jumps to the next middleware. 

The last middleware doesn't call next which allows it to unwind and resume where they each left off. 


```javascript
import 'babel-polyfill';
import Koa from 'koa';

var app = new Koa();

app.use(async (ctx, next) => {
	// Called before calling the next middleware 
	console.log('going down');	
	await next();

	// Called after calling the next middleware
	console.log('going more up');
});

app.use(async (ctx, next) => {
	// Called before calling the next middleware 
	console.log('going more down');
	await next();

	// Called after calling the next middleware
	console.log('going up');
});

app.use(async (ctx) => {
	// no more next(); 
	// head back up the stack
	ctx.body = 'Hello world';
});

app.listen(3000);
```

Here's the output: 

```bash
$ node app.js 

going down
going more down
going up
going more up
```

### Done 

That's the basics getting up and running with koa 2. There's lots more to learn and I recommend you continue [here](https://github.com/koajs/koa/blob/v2.x/docs/guide.md)

Thanks for reading!
