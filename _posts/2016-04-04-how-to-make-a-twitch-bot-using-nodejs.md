---
layout: post
title: "How to make a twitch bot using NodeJS"
description: "Learn to make a twitch bot using node js."
category: NodeJS
---

I'm assuming you already have [NodeJS](https://nodejs.org) installed.

If not go ahead and do that.
<br>
<br>

### 1. Step one make sure Node is installed

```bash
$ node -v
v4.3.1
```
<br>

### 2. Run npm init and hit enter for all options

```bash
$ npm init
```
<br>

### 3. We now need to download the [tmi.js](https://www.tmijs.org/) module

```bash
$ npm install --save tmi.js
```
<br>

### 4. Create a file named _index.js_ and insert this:

```javascript
var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    //Insert your bots username here
    username: "your bots twitch username goes here",

    //Insert your OAuth Token here
    //Keep reading to find out how to get one
    password: "Your oath token goes here"
  },

  //Insert the channel you want your bot to be in here
  channels: ["Channel name goes here"]
};

var client = new tmi.client(options);

client.connect();

client.on("connected", function(address, port){
  //When your bot connects it will send a message to the chat room
  client.action("Channel name goes here", "Your message");
});
```
<br>

### 5. Now your bot needs an [OAuth token from twitch](https://twitchapps.com/tmi/)
Click _connect with Twitch_ in the link above. Then sign in and copy the OAuth token. Paste the token into the code:

```javascript
  password: "Your oath token goes here"
  //replace with YOUR token (this one won't work)
  password: "oauth:dsafad898sadf9sd8a9ddfas2"
```
<br>

### 6. Start your bot
```bash
$ node index.js
```
<br>

And that's it but make sure your replaced the password with your OAuth token and replaced all _"Channel name goes here"_ with the channel you want the bot to be in.
