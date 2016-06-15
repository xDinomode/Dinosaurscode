---
layout: post
title: "How to Build a Web Server"
description: "Learn how to set up a web server with free hosting. Simple introduction on how to build a secure web server using a digitalocean droplet/vps."
category: tips 
---

### WHY?

Using a VPS provides full control of your web server. Shared hosting is no longer needed. 

<!--more-->

The pricing is very cheap. In fact, you only pay <span style="color:green;">$0.007/hour</span>, which amounts to <span style="color:green;">$5/mo</span>

By the way, this means if you create a VPS to play around with for only two hours and then destroy it you'll only be charged $0.01

### HOW? 

Well step one will be signing up to a website that provides a cheap and reliable VPS. 

Sign-up to [DigitalOcean](https://www.namecheap.com/?aff=101622). Btw that is a promotional link that will give you <span style="color:green;">$10</span> credit after unlocking your account with a valid payment method and helps me maintain this site for others to use. 

### GETTING STARTED 

First step is creating a droplet (VPS). While logged into [DigitalOcean](https://www.namecheap.com/?aff=101622), click **Droplets** > **Create Droplet**

You'll be brought to this page: 

![Create DigitalOcean Droplet Page](/images/create-droplet-do.png)

Scroll down and make sure Ubuntu 14.04 and $5/mo are selected:

![Create Droplet Plan](/images/create-droplet-plan-do.png)

Scroll down again and choose a datacenter region. I'll use London, but any are ok to use:

Also make sure none of the checkboxes are checked under "Select additional options"

![Create Droplet Datacenter](/images/create-droplet-datacenter-do.png)

The following will ask for your SSH keys, but leave it unchecked because I'll be showing you how to create them in the next tutorial.

Hostname can be anything but we'll use mydroplet: 

Click **Create**

![Create Droplet SSH keys](/images/create-droplet-sshkeys-do.png)

<br>

In the [next tutorial]({% post_url 2016-06-15-how-to-build-a-web-server-part-2 %}) I'll be showing how to SSH into your newly created VPS. 

[How to Build a Web Server Part 2]({% post_url 2016-06-15-how-to-build-a-web-server-part-2 %}) 
