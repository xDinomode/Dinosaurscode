---
layout: page
title: "Posts"
---

### tips and tricks
{% for post in site.categories["tips"] %}
<div class="posts">
  <p class = "posts-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

<hr class ="style-one">

# NodeJS
{% for post in site.categories["NodeJS"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

<hr class = "style-one">

# How to
{% for post in site.categories["How-to"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

<hr class = "style-one">

# Hacking
{% for post in site.categories["Hacking"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

<hr class = "style-one">

# Python
{% for post in site.categories["python"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

<hr class = "style-one">

# Golang 
{% for post in site.categories["go"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}
