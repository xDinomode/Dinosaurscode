---
title: "Deploy Node App to the Web"
layout: post
description: "Learn how to deploy your NodeJS app to the web for free. Using Github and c9.io"
category: NodeJS
---

#### Today we'll be learning how to deploy a node js app to the web using [Github](https://github.com) and [c9.io](https://c9.io)
<br>
<br>

### 1. Place app on Github
<br>

Make sure your app is on github.

![example repo](/images/example.png)
<br>
<br>

### 2. Login/Sign up to [c9.io](https://c9.io) and connect it to Github
<br>

Head to the page(logged in) [https://c9.io/account/services](https://c9.io/account/services) and click on Connected Services. Lastly click the green button "connect" next to Github.

![c9.io](/images/c9github.png)
<br>
<br>

### 3. Authorize application
<br>

Click the green button "Authorize application"

![Auth Github](/images/githubauth.png)
<br>
<br>

### 4. Go to [https://c9.io/account/repos](https://c9.io/account/repos) and click Repositories

Find your Github repo from the list and click "Clone to edit"

![c9 repos](/images/c9repos.png)
<br>
<br>

### 5. Enter a Workspace name/ Description and click on Node.js
<br>

Then click Create Workspace

![c9 new](/images/c9new.png)
<br>
<br>

### 6. You'll be redirected to a c9 IDE in which you can run terminal commands.
<br>

Install your app's dependencies first

```bash
$ npm install --save
```

Start your app

```bash
$ node index.js
```

![c9 terminal](/images/c9run.png)
<br>
<br>

### 7. Done
<br>

Your app is live simply click the preview button next to run to view it.

![app](/images/c9app.png)


**Note** Make sure your app is listening on the correct port:

```javascript

// index.js
app.listen(process.env.PORT, process.env.IP);
```
