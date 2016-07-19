---
layout: post
title: "Electron Framework Tutorial"
description: "Learn how to build cross platform desktop applications using Github's Electron framework."
category: tutorials
---

[Electron](http://electron.atom.io/) is a framework for building cross platform desktop applications using Node.js + [Chromium](https://www.chromium.org/). 

<!--more-->

In other words you're building in a browser that isn't sandboxed and has direct access to the user's filesystem using Node.js's APIs.


### Render and Main Process

Each web page runs inside a **render process** to prevent a crash in one to 
crash the entire browser. More on Chromium's multi-process architecture [here](https://www.chromium.org/developers/design-documents/multi-process-architecture).

The **main process** manages all the render processes and has access to the browser's UI such as the menu bar. 

### The Main Process

Start off by creating a package.json

```bash
$ npm init
```

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Install Electron as a devDependecy which also comes with a prebuilt binary to execute your app:

```bash
$ npm install --save-dev electron-prebuilt
```

Open **main.js** (main process) and load a URL in the browser:

```js
const electron = require('electron');

// controls the application's event life cycle
const {app} = electron;

// create and control browser windows
const {BrowserWindow} = electron;

// global browser window to prevent it from being
// closed on garbage collection
let win;

app.on('ready', () => {
    win = new BrowserWindow({width: 800, height: 400});
    win.webContents.loadURL(`https://reddit.com`);
    win.on('closed', () => {
        win = null;
    }); 
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }   
})
```

Some of you may find the new ES2015 JavaScript syntax unfamiliar read [this](https://babeljs.io/docs/learn-es2015/) for a quick reference.

We created a [BrowserWindow](http://electron.atom.io/docs/api/browser-window/) that has options to change its display such as width/height. 

Then we used the browser window's [webContents](http://electron.atom.io/docs/api/web-contents/) to load a URL in the web page. It's responsible for controlling the web page. 

### The Render Process

A render process is automatically created when we create a new BrowserWindow, but in order to use it we must code inside the web page.

Create an **index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <script>
        // code in here
    </script>
</body>
</html>
```

In the main.js file change loadURL to load this file instead: 

```js
// main.js
win.webContents.loadURL(`file://${__dirname}/index.html`);
```

Let's build an application that writes a file to our filesystem:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

    <input type="text" placeholder="file name" id="filename">
    <input type="text" placeholder="file text", id="filetext">
    <button id="button">Create</button>

    <script>
        let fs = require('fs');
        let filename = document.getElementById("filename");
        let filetext = document.getElementById("filetext");
        let button = document.getElementById("button");

        button.addEventListener("click", (e) => {
            fs.writeFile(filename.value, filetext.value, (err) => {
                if (err != nil) {
                    console.log(err);
                }
            })
        });
    </script>
</body>
</html>
```

### Inter-Process Communication

There are two ways to communicate between the render process and main process. 

One of which is using [remote](http://electron.atom.io/docs/api/remote/) to use main process methods in the render process. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

    <button id="button">Create new BrowserWindow</button>

    <script>
        let {BrowserWindow} = require('electron').remote;

        let button = document.getElementById("button");
        button.addEventListener("click", (e) => {
            let win2 = new BrowserWindow({width: 800, height: 600});
            win2.loadURL('https://google.com');
        });
    </script>
</body>
</html>
```

And the second is using [ipcMain](http://electron.atom.io/docs/api/ipc-main/)/[ipcRenderer](http://electron.atom.io/docs/api/ipc-renderer/) to send messages through channels.

### More

Read the official Electron [Docs](http://electron.atom.io/docs/) for a full list of methods and ways to distribute your application. 

Thanks for reading!
