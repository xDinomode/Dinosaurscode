---
layout: post
title: "Sending HTML Emails Using Golang"
description: "Tutorial on sending html emails using Golang and templates."
category: go
---

In this tutorial we'll use Gmail's SMTP server to send HTML emails. 

<!--more-->

Before proceeding make sure the Gmail account you'll use to send email [allows less secure apps](https://support.google.com/accounts/answer/6010255?hl=en).

#### CREATE A NEW PROJECT

```go
package main

import "net/smtp"
import "log"

func send(body string, to string) {
    
}

func main() {
    send("Write your message here.", "recipient@gmail.com")    
}
```

#### ADD YOUR CREDENTIALS

```go
func send(body string, to string) {
    from := "youremail@gmail.com"
    password := "yourpassword"
}
```

#### COMPOSE THE MESSAGE 

```go
func send(body string, to string) {
    from := "youremail@gmail.com"
    password := "yourpassword"

    msg := "From: " + from + "\n" +
           "To: " + to + "\n" + 
           "Subject: Your messages subject\n\n" +
           body
}
```

#### SEND THE EMAIL

```go
func send(body string, to string) {
    from := "youremail@gmail.com"
    password := "yourpassword"

    msg := "From: " + from + "\n" +
           "To: " + to + "\n" + 
           "Subject: Your messages subject\n\n" +
           body

    err := smtp.SendMail("smtp.gmail.com:587", smtp.PlainAuth("", from, password, "smtp.gmail.com"), from, []string{to}, []byte(msg))
    if err != nil {
        log.Printf("Error: %s", err)
        return
    }

    log.Print("message sent")
}
```

![Golang email sent](/images/golangemail.png)

In order to send HTML add two new values to the message and change the body to HTML 

```go
func send(body string, to string) {
    from := "youremail@gmail.com"
    password := "yourpassword"
    
    // Add MIME-Version and Content-type
    msg := "From: " + from + "\n" +
           "To: " + to + "\n" + 
           "MIME-Version: 1.0 \n" +
           "Content-type: text/html \n" +
           "Subject: Your messages subject\n\n" +
           body

    err := smtp.SendMail("smtp.gmail.com:587", smtp.PlainAuth("", from, password, "smtp.gmail.com"), from, []string{to}, []byte(msg))
    if err != nil {
        log.Printf("Error: %s", err)
        return
    }

    log.Print("message sent")
}

func main() {
    // Send html in the body
    send("<h1>Write your message here.</h1>", "recipient@gmail.com")    
}

```

![Golang html email sent](/images/golangemailhtml.png)

Done but for those that would like to implement templates keep reading.

#### TEMPLATES

Create a template named **template.html**

```html
{% raw %}
{{ template "email" }}
<h1>Hello {{ .Name }}</h1>
<p>{{ .Body  }}</p>
{{ end }}
{% endraw %}
```

Create a new struct to contain the template variables

```go
import "html/template"
import "bytes"

type email struct {
    Name string
    Body string
}
```

Create a new template and send it in the message 

```go
func send(body string, to string) {
    // Create the variables for the template
    myEmail := email{"John", body}

    // Create a template using template.html
    tmpl, err := template.New("email").ParseFiles("./template.html")
    if err != nil {
        log.Printf("Error: %s", err)
        return
    }

    // Stores the parsed template
    var buff bytes.buffer 

    // Send the parsed template to buff 
    err = tmpl.Execute(&buff, myEmail)
    if err != nil {
        log.Printf("Error: %s", err)    
    }

    from := "youremail@gmail.com"
    password := "yourpassword"

    // replace body with buff.String()
    msg := "From: " + from + "\n" +
           "To: " + to + "\n" + 
           "MIME-Version: 1.0 \n" +
           "Content-type: text/html \n" +
           "Subject: Your messages subject\n\n" +
           buff.String()

    err := smtp.SendMail("smtp.gmail.com:587", smtp.PlainAuth("", from, password, "smtp.gmail.com"), from, []string{to}, []byte(msg))
    if err != nil {
        log.Printf("Error: %s", err)
        return
    }

    log.Print("message sent")
}

func main() {
    send("Write your message here.", "recipient@gmail.com")    
}

```

![Golang email template](/images/golangemailtemplate.png)


#### FINISHED! 

Here's the entire source code on [Github](https://github.com/xDinomode/Go-sending-HTML-emails-example)!
