---
layout: page
title: Dinosaurscode
description: Learn new programming tips and tricks. Web design, Web development, HTML5, CSS3, and much more!
---
<br>

<div id = "indexwelcome">      
<span style="color:#40E0D0;">if</span><span style="color:#D040E0;">(programming)</span><span style="color:black">{</span><br>
<span style="text-align:center;color:#C5F5F0;">//is life</span><br>
<span style="color:#e04081;">code.</span><span style="color:#40e07b;">now(); </span>
<span style="color:black">}</span>
</div>
<br>
{% include homebutton.html %}

### RECENT POSTS

<ul class = "post-latest">
  {% for post in site.posts offset: 0 limit: 4 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> Posted on <a href ="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a></span>
    </li>
  {% endfor %}
</ul>
