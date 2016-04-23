---
layout: page
title: "Posts"
---

# tips and tricks
{% for post in site.categories["tips"] %}
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
{% endfor %}

<hr class ="style-one">

# NodeJS
{% for post in site.categories["NodeJS"] %}
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
{% endfor %}

<hr class = "style-one">

# How to
{% for post in site.categories["How-to"] %}
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
{% endfor %}
