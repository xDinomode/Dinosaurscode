---
layout: page
title: Dinosaurscode
description: Learn new programming tips and tricks. Web design, Web development, HTML5, CSS3, Node.js and much more! 
---
<br>

<div id = "indexwelcome">      
<p class="home-introduction" style="text-align:center;">A blog written for coders</p>
<p id = "indexwelcomelist">Node.js &#10003; HTML5 &#10003; CSS3 &#10003; and much more...</p>
<div class="home-button" class="home-button"><a href="/posts">Start Here</a></div>
<br>
</div>


<iframe width="560" height="315" src="https://www.youtube.com/embed/0yj51SovoTE" frameborder="0" class="home-video" allowfullscreen></iframe>

### RECENT POSTS

<ul class = "post-latest">
  {% for post in site.posts offset: 0 limit: 4 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> Posted on <a href ="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a></span>
    </li>
  {% endfor %}
</ul>
