---
layout: post
description: "This is part 3 of How to Build a Web Server. In this tutorail I'll show how to install nginx and proxy pass to a node js web app."
category: tips
title: "How to Build a Web Server Part 3"
---

In this part we'll cover how to install Nginx and how to proxy pass HTTP requests to Nodejs.

<!--more-->

### INSTALL NODEJS

You should visit the official website on [installation instructions](https://nodejs.org/en/download/package-manager/) but as of today this works.

```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Update npm

```bash
sudo npm install npm -g
```

### CREAT A SIMPLE APP

```bash
mkdir ~/myapp
cd ~/myapp
```

npm init. Click enter for all options

```bash
npm init
```

Create index.js and edit it

```bash
nano index.js
```

```javascript
var http = require("http");

http.createServer(function(request, response){
        response.end("My app");
}).listen(8000);
```

### INSTALL PM2 

We'll need something to manage our app in case it crashes and also to keep it running.

```bash
sudo npm install pm2 -g
```

Run start index.js with pm2 

```bash
pm2 start index.js
```

Run this command to run pm2 on startup

```bash
pm2 startup ubuntu
```


### INSTALL NGINX


```bash
sudo apt-get install nginx -y
```

Proxy pass to our app

Open this file for editing and delete everything inside it 

```bash
nano /etc/nginx/sites-available/default
```

Add the following inside the file

```bash
server{
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### DONE!

Your app is up and running behind Nginx. Simply type in your VPS's IP into the url.










