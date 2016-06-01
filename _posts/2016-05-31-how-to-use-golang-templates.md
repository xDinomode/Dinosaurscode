---
layout: post
description: "Learn how to use Golangs templates for web development."
title: "Golang Templates Made Easy"
category: go
---

Let's begin by serving a plain http file

```go

//app.go

package main

import "net/http"

func serve(res http.ResponseWriter, req *http.Request){
	 
	http.ServeFile(res, req, "mywebsite.html")

}
			
func main(){
	
	http.HandleFunc("/", serve)
	http.ListenAndServe(":3000", nil)
}
```

Make sure to create an html file with anything inside it for now.

Run it with go and you'll see your html file served on localhost:3000.

```bash
$ go run app.go
```

<br>

Now let's create a struct that contains the variables we'll pass into our templates.

```go
type Variables struct{
	Title string
	Heading string
}
```

Modify the html file to insert those variables later on.


```html
<!--website.html-->
<head>
	<title>{% raw %} {{ .Title }} {% endraw %}</title>
</head>

<h1>{% raw %} {{ .Heading }} {% endraw %}</h1>
```

<br>

Import **html/template**

```go
import "html"/template
```

Create a new template 

```go
var templates = template.Must(template.ParseFiles("mywebsite.html"))
```

**template.Must()** Checks your template for syntax errors. 

**template.ParseFiles()** Creates a new template from multiple files. Only one in this case but adding more simply requires including a comma with another filename.

<br>

Create a new struct and serve the template using the struct variables.

```go
myVars := Variables{"My Website Title", "My Website Heading"}

templates.ExecuteTemplate(res, "mywebsite.html", myVars)
```
**templates.ExecuteTemplate()** Handles combining the variables and the template and then serves it to the client. First parameter is http.ResponseWriter, second is the name of the filename of the template, and third is the struct. 

<br>

Complete code: 

```go
//app.go

package main

import "net/http"
import "html"/template

type Variables struct{
	Title string
	Heading string
}

var templates = template.Must(template.ParseFiles("mywebsite.html"))

func serve(res http.ResponseWriter, req *http.Request){
	 
	myVars := Variables{"My Website Title", "My Website Heading"}
	
	templates.ExecuteTemplate(res, "mywebsite.html", myVars)

}
			
func main(){
	
	http.HandleFunc("/", serve)
	http.ListenAndServe(":3000", nil)
}

```

<br>

### Resources:

* [Understanding Go's template package](https://medium.com/@IndianGuru/understanding-go-s-template-package-c5307758fab0#.sseham6e0) 

* [Official Go documentation](https://golang.org/pkg/html/template/)





