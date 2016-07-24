---
layout: post
title: "Beginner Friendly Webpack Tutorial"
category: tutorials
description: "Simple but effective introduction to Webpack the module bundler for beginners."
---

[Webpack](https://webpack.github.io/) defines itself as a "module bundler."

<!--more-->

### What the heck does that mean?

It means less HTTP Get requests in a nutshell. 

### How? 

Node.js, on the backend, allows us to seperate our code into modules to allow easy code reuse and prevent name clashes using CommonJS.

#### Example: 

```js
// module1.js
module.exports = {name: "module1"};
```

```js
// module2.js
module.exports = {name: "module2"};
```

```js
// app.js
var mod1 = require('module1.js');
var mod2 = require('module2.js');

console.log(mod1.name);
console.log(mod2.name);
```

```bash
#output
mod1
mod2
```

Unfortunately, CommonJS isn't supported on the frontend and thus we're stuck with making several HTTP requests for each piece of code we require.

```html
<script src="one.js"></script>
<script src="two.js"></script>
```

And even then we're not guaranteed the order that they'll load in.

### Webpack to the rescue

Webpack takes care of this by bundling all your modules into a single **.js** file. 

### Getting started

Create a new **package.json** using npm: 

```bash
$ npm init -y
```

Install **webpack** locally:

```bash
$ npm install --save-dev webpack
```

Create a file named **bundleme.js**:

```js
var mod1 = require('./module1');

document.write(mod1.name);
```

**module1.js**:

```js
module.exports = {name: "module1"};
```

Lastly create an **index.html** file to load the bundle in the browser:

```html
<!doctype html>
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

Build it and then open index.html in a browser:

```bash
$ ./node_modules/.bin/webpack ./bundleme.js bundle.js
```

![Webpack Build document.write](/images/webpack-write.png)

Note that we installed webpack locally which comes with a prebuilt webpack binary inside the long path above. 

### Webpack config

Running webpack through the terminal isn't recommended but instead we can write a config file that configures its options.

Create the file **webpack.config.js**:

```js
module.exports = {
    entry: "bundleme.js",
    output: {
      path: __dirname,
      filename: "bundle.js"
    }
}
```

Add an npm script to **package.json** that runs webpack:

```json
"scripts": {
    "build": "webpack"    
}
```

Now you can run the npm script and your bundle will build: 

```bash
$ npm run build
```

### Loaders

Not only can webpack bundle javascript but it can also do .css with loaders.

Install [css-loader](https://github.com/webpack/css-loader) and [style-loader](https://github.com/webpack/style-loader):

```bash
$ npm install --save-dev css-loader style-loader
```

Require a **style.css** file and pipe it into the loaders:

```js
//bundleme.js
require('style!css!./style.css');
var mod1 = require('./module1');

document.write(mod1.name);
```

![Webpack css loader](/images/webpack-css.png)

### Plugins 

Webpack comes with helpful plugins such as compressing javascript. 

Open **webpack.config.js**:

```js
var webpack = require('webpack'); 

module.exports = {
    entry: "bundleme.js",
    output: {
      path: __dirname,
      filename: "bundle.js"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
}
```

Run the npm build script and your bundle.js is now minified:

```bash
$ npm run build
```

![Webpack plugin uglify](/images/webpack-plugin.png)

And that's the basics of Webpack. From here I suggest heading over to the official [docs](https://webpack.github.io/docs/). 

Thanks for reading!
