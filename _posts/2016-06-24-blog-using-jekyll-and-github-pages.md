---
layout: post
title: "Using Jekyll and GitHub Pages"
category: How-to
description: Complete walkthrough on building a blog using Jekyll and GitHub Pages. Benefits include free hosting and security.  
---

[Jekyll](https://jekyllrb.com/) is a static site generator, meaning there's no database on the backend.

<!--more-->

Jekyll runs from the terminal. For instance, to create a new blog you run 

```bash
jekyll new blog
```

And to view your site locally on port 4000 you run

```bash
jekyll serve 
```

This is the directory structure after running jekyll new blog

```
blog
|   about.md
|   _config.yml
|   index.html
|   feed.xml
|   css
|   _includes
|   _layouts
|   _posts
|   _sass
```

- **about.md** localhost:4000/about 

- **_config.yml** Global configuration options. 

- **index.html** localhost:4000/

- **feed.xml** RSS feed built by jekyll. 

- **css** Public folder to store your css files. 

- **_includes** Reusable parts of your site such as a navbar or footer.

- **_layouts** Your content can be structured using different layouts. For instance, your home page would use a different layout than your posts. 

- **_posts** Blog posts are written in here.

- **_sass** Jekyll gives you the option of writting your css in sass.


#### STEP 1. BUILD A NEW JEKYLL BLOG 


Now we'll build a Jekyll blog and host it on Github together. First make sure you have [installed Jekyll](https://jekyllrb.com/docs/installation/) and [Git](https://help.github.com/articles/set-up-git/#platform-all).

Create a new jekyll project called blog 

```bash
jekyll new blog
```

**cd** into blog and run 

```bash
jekyll serve
```

Go to localhost:4000 on your web browser and you'll see 

![Jekyll localhost:4000](/images/jekyllnew.png)

Some of you may have noticed a new folder named **_site** was created after running this command. 

Jekyll builds your entire site into this folder and runs it on localhost:4000.

#### STEP 2. CONFIGURATION 

This works fine for development but in production you must specify your website's url and baseurl 

Open **_config.yml** and add them

```yaml
# This would be the name of your repo 
baseurl: /example
# Full url including your username and repo name
url: https://username.github.io/example
```

If you want to run your site on localhost, comment both out. But remember to add them before pushing to Github.

#### STEP 3. CREATE A GITHUB PAGE

Login to your Github account and create a new repo

![Github new repo](/images/jekyllnewrepo.png)

STOP! Don't run the commands that Github supplies just yet.

First run git init inside your jekyll blog

```bash
git init 
```

Then create a gh-pages branch (GitHub Pages only run in gh-pages branch) 

```bash
git checkout -b gh-pages
```

Add the files and commit them 

```bash
git add --all

git commit -m "Initial commit"
```

Now look at the page that GitHub provided after creating the repo 

![Github quick setup](/images/jekyllgithub.png)

Run only the first command marked in the red box 

Replace the second one: git push -u origin master with 

```bash
git push origin gh-pages
```

Direct your browser to yourusername.github.io/example

![GitHub Page with Jekyll](/images/jekyllgithubpage.png)

#### FINISHED! 

Remember to comment out url and baseurl in your _config.yml when you're running on localhost and add them when you push to GitHub.





