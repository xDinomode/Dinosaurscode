---
layout: post
title: "How To Build a Jekyll Website"
description: "Learn how to make a website using Jekyll and hosted for free on Github."
category: NodeJS
---

Static site generators are in. They provide security from hackers because there's no database involved! 

Let's learn how to set up Jekyll and Github together.

<!--more-->

### 1. Install [Jekyll](https://jekyllrb.com/docs/installation/)

```bash
$ gem install jekyll
```
<br>

### 2. Create a Jekyll website

```bash
$ jekyll new mywebsite
```
<br>

### 3. **cd** into the newly created folder and start the server

```bash
$ cd mywebsite
$ jekyll serve
```

your website is now running on _localhost:4000_
![Jekyll server](/images/jekyllserver.png)

### 4. Host it on [github](https://github.com)

1. Create a new repository
![Github repo](/images/jekyllgithubrepo.png)

2. You'll receive a page just like this one. Copy what's inside **YOUR** red box.
![Jekyll github setup](/images/jekyllgithubreposetup.png)

3. Go to your terminal and run these commands, first

```bash
$ git init
$ git add .
$ git commit -m "my website"
```
<br>
Paste what was inside **YOUR** red box outlined above into the terminal

```bash
$ git remote add origin https://github.com/xDinomode/MyWebsite.git
$ git push origin master
```
<br>
Click the branch drop down list and create a new branch titled _gh-pages_
![Github pages branch](/images/jekyllgithubbranch2.png)

update your local repo to include gh-pages

```bash
$ git update
```
<br>

### 5. Your site is now on github at [https://username.github.io/MyWebsite](https://username.github.io/MyWebsite)
But your page wont render correctly until we fix the css link
![broken github css link](/images/brokenjekyll.png)
<br>
<br>

### 6. Navigate into **_includes/head.html** and replace the css link with:

```html
<link rel="stylesheet" href="/MyWebsite/css/main.css">
```
<br>

### add and commit your changes

```bash
$ git add .
$ git commit -m "fixed css link"
```

<br>

### 7. Finally run jekyll build and push your repo

```bash
$ jekyll build
$ git checkout gh-pages
$ git push origin gh-pages
```
