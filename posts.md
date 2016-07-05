---
layout: page
title: "Posts"
---

# Tutorials 
{% for post in site.categories["tutorials"] %}
<div class="posts">
  <p class = "posts-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}



# Tips and Tricks
{% for post in site.categories["tips"] %}
<div class="posts">
  <p class = "posts-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}


# NodeJS
{% for post in site.categories["NodeJS"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}


# How to
{% for post in site.categories["How-to"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}


# Hacking
{% for post in site.categories["Hacking"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}


# Python
{% for post in site.categories["python"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}


# Golang 
{% for post in site.categories["go"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

# Linux 
{% for post in site.categories["linux"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}

