---
layout: post
title: Fedora 23 Use Google DNS and Turn Off IPv6
description: "How to use Google DNS in fedora 23 and also turn off ipv6."
category: linux
---

In this tutorial I'll be demonstrating how to change Fedora 23's DNS to Google DNS. And also how to turn off ipv6.

<!--more-->

Personally, for me, I found it difficult to find a simple tutorial and was astonished at how simple it really was.


### Step 1. Change NetworkManager 

```bash
$ cd /etc/NetworkManager/system-connections/ 
```

There should be one file in there. I have one named "fedora" so open it using vim 

```bash
$ sudo vim fedora 
```

### Step 2. Edit the file to match these settings


So once you open the file scoll down to the [ipv4] and make it match the following 

```bash
[ipv4]
method=auto
dns=8.8.8.8;8.8.4.4;
ignore-auto-dns=true
```

And lastly disable ipv6 by scolling down to [ipv6] and make it match the following also

```bash
[ipv6]
method=ignore
```

Restart the network 

```bash
$ sudo systemctl restart network
```

One more thing! Make sure DNS > Automatic is turned off! 

![dns fedora](/images/dnsfedora.png)
