---
layout: page
title: "Posts"
---

# Tutorials 
{% for post in site.categories["tutorials"] %}
<div class="posts">
  <p class = "posts-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}



# Tips and Tricks
{% for post in site.categories["tips"] %}
<div class="posts">
  <p class = "posts-list"><a href="{{ post.url }}">{{ post.title }}</a><span class="post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}


# NodeJS
{% for post in site.categories["NodeJS"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}


# How to
{% for post in site.categories["How-to"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}


# Hacking
{% for post in site.categories["Hacking"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}


# Python
{% for post in site.categories["python"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}


# Golang 
{% for post in site.categories["go"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}

# Linux 
{% for post in site.categories["linux"] %}
<div class="posts">
  <p class = "post-list"><a href="{{ post.url }}">{{ post.title }}</a><span class = "post-meta"> {{ post.date | date_to_string }}</span></p>
<div class="posts-list-excerpt">{{ post.excerpt | strip_html }}</div>
</div>
{% endfor %}

<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
	/* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//xyz.us14.list-manage.com/subscribe/post?u=cdc0e4108222febd0bd4546e6&amp;id=4bc71896af" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label for="mce-EMAIL">Subscribe to our mailing list</label>
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_cdc0e4108222febd0bd4546e6_4bc71896af" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
