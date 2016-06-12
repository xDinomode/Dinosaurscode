---
layout: post
title: How Does The Web Work
description: "Learn how to web works. HTML5, javascript, php, Apache, Nginx. They rule the internet and I'll teach you about them in the following article."
category: tips
---

![How Does The Web Work](/images/internethands.jpg)

You open up your browser and type in the URI (URL but the correct way is URI) youtube.com and bam you're watching cat videos. But how does this work exactly? 

<strong>Well it starts at your Web Browser.</strong> Most of use either use Google Chrome or Firefox and these applications do the heavy lifting for us.  
They first need to translate youtube.com into an ip address. To do this your browser will send a request to a DNS server to query its database for the ip of the domain name. Websites are just machines with an application called web server running that will listen on a port number for incoming http requests. Of course to contact the web server we have to know its "IP address." Anything connected to the internet gets assigned an IP and through this address is able to contact other computers. 

<strong>Once we resolve the IP address</strong> from the domain name our browser can send an HTTP request to the intended website. So it starts by opening a socket on your computer on some port. Sockets allow the echange of binary/text data over the internet to an intended application. Your browser to YouTube's web server in this case.  
Awesome but in order to exchange said data safely without loss or corruption the packets have to be transmitted using TCP. TCP adds a header to your packets in which includes a check sum that gets reassembled on the web server. If every packet arrived then the check sum will pass if not the request is sent over again. 

<strong>The data you exchange requires rules</strong>. HTTP is exactly that.Your web browser will stick to these predefined HTTP rules and send the data in a structured format. For instance here's an http request:   

```bash
GET / HTTP/1.1
Host: www.example.com
```

Basically your browser sends get requests to a host with the path the the file. Also there are different versions of HTTP in this case we use the most recent one 1.1 soon to be replaced by 2.

If all goes well you'll receive a status 200 OK which means the file is located on the server and has been sent to your browser.

<strong>Why do websites look so differently?</strong> Well websites are simply files with an extension of .html. Content inside html files requires being inside of tags like this 

```html
<!DOCTYPE html>
<head>
    <title>My Websites Title</title>
<body>
    <h1>This is a heading in my website!</h1>
```

# This is a heading in my website! 


These tags tell your browser what the content inside of them is. From the title of the website to a paragraph or heading. There aren't that and I'd highly recommend learning html.

The design of websites comes in a different file with the extension .css and this is called a stylesheet. It's exactly that a style for your html.

```html
<h1 style="color:cyan;">This is a heading in my website!</h1>
```

<h1 style="color:cyan;">This is a heading in my website!</h1>

But web sites don't want their content to appear static. So there's another file that has the extension .js which does all the dynamic stuff on your browser. 

```html
<h1 style="color:cyan;" id="heading">This is a heading in my website!</h1>

<script>
    document.getElementById("heading").onmouseover = function(){
        alert("You hovered over my heading!")
    }
</script>
```

<h1 style="color:cyan;" id="heading">This is a heading in my website!</h1>

<script>
    document.getElementById("heading").onmouseover = function(){
        alert("You hovered over my heading!")
    }
</script>
<strong>There's so much more to learn</strong> about the web but these are the fundamentals of it all. Thanks for reading.

