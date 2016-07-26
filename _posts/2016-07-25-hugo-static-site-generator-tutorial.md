---
layout: post
title: "Hugo Static Site Generator Tutorial"
description: "Hugo is a static site generator written in Go and in this tutorial we'll learn the basics of it and how it works."
category: tutorials
---

Hugo is a static site generator written in Go. It takes pride in being fast given that it's written in a language as close to C that you'll get.

<!--more-->

### Installing 

There are far too many platforms for this tutorial to cover you should go [here](https://gohugo.io/#action) for installation instructions.

### Basics

Create a new site:

```bash
$ hugo new site <mywebsite>
```

```bash
mywebsite
|   archetypes
|   config.toml
|   content
|   data
|   layouts
|   static
|   themes
```

Run the site on a server:

```bash
$ hugo server
```

![Hugo default server](/images/hugo-blank-server.png)

Build the entire site into **/public**:

```bash
$ hugo
```

### Quick rundown

* You write your blog posts inside of **/content** in [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

* **/layouts** are **.html** files that content is placed into.

* **config.toml** stores global hugo configuration options.

* **/static** stores static content such as .js, .css, .png.

* **/themes** is where you install custom themes using [Git](https://git-scm.com/downloads). 

* **/archetypes** adds variables to the content's font matter and **/data** stores custom variables for your layouts to use. 

### Themes 

Hugo would rather you use a custom theme instead of building one from scratch.

Make sure you're inside the /themes directory and then head over to [themes.gohugo.io](https://themes.gohugo.io)

Pick one and git clone it into themes: 

```bash
$ git clone https://github.com/digitalcraftsman/hugo-cactus-theme.git
```

Open config.toml and add the theme then run the server: 

```toml
baseurl = "http://replace-this-with-your-hugo-site.com/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "hugo-cactus-theme"
```

![Hugo Cactus Theme](/images/hugo-cactus-theme.png)

Hugo by default has liveReload enabled and thus any new files you create or change will reload the browser. Create a blog post: 

```bash
$ hugo new post/first.md
```

![Hugo first post](/images/hugo-first-content.png)

### Make your own theme 

Remove theme from your config.toml file.

Change directory into /layouts and make a directory named **post** with a **single.html** file:

```html
<!DOCTYPE html>
<html>
<body>
  {% raw %}
  {{ .Content }}
  {% endraw %}
</body>
</html>
```

Now open /content/post/first.md and add the layout type of post:

```md
+++
date = "2016-07-25T21:04:23-05:00"
description = ""
title = "first"
type = "post"

+++

# My first blog post
```

![Hugo Custom Theme Layout](/images/hugo-custom-theme-one.png)

Partials give us the ability to break our layouts into parts such as head, footer, navbar:

```bash
# inside of /layouts
$ mkdir partials
$ cd partials
$ touch head.html
```

Open the newly created head.html:

```html
<head>
  <link href="/css/main.css" rel="stylesheet">
</head>
```

Create the main.css file inside of /static/css and add the partial to your post layout: 

```css
/* /static/css/main.css */
body{
	background: orange;
}
```

/layouts/post/single.html:

```html
<!DOCTYPE html>
<html lang="en">
		{% raw %}
        {{ partial "head.html" .}} 
		{% endraw %}
<body>
        {% raw %}
        {{ .Content }}
		{% endraw %}
<body>
</html>
```

![Hugo partials](/images/hugo-partials.png)

Where's the home page?

You would think that it would be inside of /content/index.md right? Well no it's not. In fact it's considered a template **/layouts/index.html**:

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Home page</h1>
</body>
</html>
```

![Hugo homepage](/images/hugo-homepage.png)

### Push it to Github

Open config.toml and add github as the baseurl:

```toml
baseurl = "https://<yourusername>.github.io/<yourreponame>"
canonifyurls = true
languageCode = "en-us"
title = "My Website"
```

Build the site:

```bash
$ hugo
```

Move /public/ to its own directory:

```bash
$ mv -v public/* ~/yourgitrepo
```

Inside of your git repo:

```bash
# ~/yourgitrepo
$ git init 
$ git checkout -b gh-pages
$ git add --all
$ git commit -m "commit"
```

Create a new repo on Github: 

![Hugo Github Repo](/images/hugo-github-repo.png)

Submit and look for the line **...or push an..**, but only run the first line:

![Hugo Push Repo](/images/hugo-repo-push.png)

Push it and then visit the URL yourusername.github.io/yourrepo:

```bash
$ git push origin gh-pages
```

![Hugo Completed Push to Github](/images/hugo-pushed.png)

### Done! 

From here you should read up on the official [Hugo Docs](https://gohugo.io/overview/introduction/) to cover the parts this tutorial missed.

