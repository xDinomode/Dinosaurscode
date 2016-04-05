---
layout: page
title: "Posts"
---

# tips and tricks
{% for post in site.categories["tips"] %}
  <p><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta">{{ post.date | date_to_string }}</span></p>
{% endfor %}

<hr class ="style-one">

# NodeJS
{% for post in site.categories["NodeJS"] %}
  <p><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta">{{ post.date | date_to_string }}</span></p>
{% endfor %}
