---
layout: page
title: Dinosaurscode
description: Learn new programming tips and tricks. Web design, Web development, HTML5, CSS3, and much more!
---
<br>

<span style="color:#ff2c2c;font-size:33px;">&lt;</span><span style="color:#ff2c2c;font-size:33px;">Learn</span> <span style="color:#682cff;font-size:33px;">new <span style="color:#2cffe4;font-size:33px;">code</span>&gt;


{% include homebutton.html %}

### RECENT POSTS

<ul class = "post-latest">
  {% for post in site.posts offset: 0 limit: 3 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta">Posted on <a href ="{{ post.url }}">{{ post.date | date: "%b %-d, %Y" }}</a></span>
    </li>
  {% endfor %}
</ul>
