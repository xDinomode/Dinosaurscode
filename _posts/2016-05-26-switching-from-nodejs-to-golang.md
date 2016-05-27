---
layout: post
title: "Switching from NodeJS to Golang"
description: "Why I'm switching from NodeJS to Golang and why you should too. Tutorial on Go web development."
category: go
---

NodeJS is for inexperienced programmers A.K.A front end developers that want to have a go at the back end.  

Node's website starts you off by showing a simple web server written in Node (Javascript). Using only the http module. 

Of course no one starts off with only the http module. Everyone grabs their framework such as Express and begins downloading tons of other modules. Why? 

Because coding in Javascript is a pain. So everyone just accepts inserting code from others into their own projects. Probably thousands of lines and most of which wont be used. 

<br>

#### Golang for web development

Just as Node uses http Golang uses net/http.

Here's a Go web server for you

```go
package main

import "net/http"

func handle(res http.ResponseWriter, req *http.Request){
	res.Write([]byte("Hello world"))
}

func main(){
	http.HandleFunc("/", handle)
	http.ListenAndServe(":3000", nil)
}
```

**package main** Tells go that this is going to be an executable and not a package for other go programs.

**import net/http** A package the same as node's var http = require("http") 

**func handle()** This function will handle the client's http request/response

**func main()** Go programs that start with package main require a main function to tell the compiler where to begin.

**http.HandleFunc()** Routes requests to / to our handle function

**http.ListenAndServe(":3000", nil)** First parameter is the port number and the second is a mux which is a fancy way to say router. Value nil will use the default go router.

<br>

Awesome! But how do I serve html/css?

```go
package main

import "net/http"

func main(){
	http.Handle("/", http.FileServer(http.Dir("public")))
	http.ListenAndServe(":3000", nil)
}
```

Assuming your files are in a public folder you'll now be able to access anything in /public on a browser.

<br>


**Resources** (Learn the syntax first):

* [https://jan.newmarch.name/golang/](https://jan.newmarch.name/golang/) 

* [https://www.topcoder.com/blog/building-go-web-apps/](https://www.topcoder.com/blog/building-go-web-apps/)

* [https://github.com/golang/go/wiki/LearnServerProgramming](https://github.com/golang/go/wiki/LearnServerProgramming)

Of topic but very useful:

* [How does a web server work(python)](https://ruslanspivak.com/lsbaws-part1/)
