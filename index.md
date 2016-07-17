---
layout: page
title: Dinosaurscode
description: Learn new programming tips and tricks. Web design, Web development, HTML5, CSS3, Node.js and much more! 
---
<br>

<div id = "indexwelcome">      
<p class="home-introduction" style="text-align:center;">A blog written for coders</p>
<div class="home-button" class="home-button"><a href="/posts">Start Here</a></div>
<br>
</div>


### RECENT POSTS

<ul class = "post-latest">
  {% for post in site.posts offset: 0 limit: 4 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> Posted on <a href ="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a></span>
    </li>
  {% endfor %}
</ul>
