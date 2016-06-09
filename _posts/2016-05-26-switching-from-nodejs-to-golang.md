---
layout: post
title: "Switching from NodeJS to Golang"
description: "Why I'm switching from NodeJS to Golang and why you should too. Tutorial on Go web development."
category: go
---

NodeJS is for inexperienced programmers A.K.A front end developers that want to have a go at the back end.  

<!--more-->

Node's website starts you off by showing a simple web server written in Node (Javascript). Using only the http module. 

Of course no one starts off with only the http module. Everyone grabs their framework such as Express and begins downloading tons of other modules. Why? 

Because coding in Javascript is a pain. So everyone just accepts inserting code from others into their own projects. Probably thousands of lines and most of which wont be used. 

<br>

#### Golang for web development

<br>

Golang comes with a package named **net/http** that helps build powerful and robust websites easily. 

<br>

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

**package main** Tells go that this is going to be an executable. 

**import net/http** The same as Node's http module. 

**func handle()** This function will handle the client's http request/response

**func main()** Go programs that start with package main require a main function to tell the compiler where to begin.

**http.HandleFunc()** First parameter is the url path and the second is the function that will handle it.

**http.ListenAndServe(":3000", nil)** Starts the web server on port 3000. Leave the second parameter nil. 

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

This time instead of passing a function we pass an http method called FileServer. It will serve anything inside the directory as is. 

<br>


**Resources** (Learn the syntax first):

* [https://jan.newmarch.name/golang/](https://jan.newmarch.name/golang/) 

* [https://www.topcoder.com/blog/building-go-web-apps/](https://www.topcoder.com/blog/building-go-web-apps/)

* [https://github.com/golang/go/wiki/LearnServerProgramming](https://github.com/golang/go/wiki/LearnServerProgramming)

Of topic but very useful:

* [How does a web server work(python)](https://ruslanspivak.com/lsbaws-part1/)
