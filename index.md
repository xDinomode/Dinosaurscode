---
layout: page
title: Dinosaurscode
description: Learn new programming tips and tricks. Web design, Web development, HTML5, CSS3, and much more!
---
<br>

<div id = "indexwelcome">      
<h3>Welcome to Dinosaurscode</h3>
<p style="text-align:center;">A blog written for coders</p>
{% include homebutton.html %}
</div>


### RECENT POSTS

<ul class = "post-latest">
  {% for post in site.posts offset: 0 limit: 4 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> Posted on <a href ="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a></span>
    </li>
  {% endfor %}
</ul>
