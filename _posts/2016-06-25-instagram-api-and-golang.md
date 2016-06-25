---
layout: post
description: "Instagram API and Golang example code."
category: go
title: "Instagram API for Golang"
---

The following is a basic example on how to use Instagram's API in Golang. 

<!--more-->

> You'll need to have [Go installed](https://golang.org/doc/install) and an Instagram account

#### STEP 1. LOGIN AND CREATE A NEW CLIENT 

Head to [https://www.instagram.com/developer/](https://www.instagram.com/developer/) and click **Register Your Application**

![Instagram Signup](/images/instagramsignup.png)

Once logged in you'll be in [https://instagram.com/developer/clients/manage/](https://instagram.com/developer/clients/manage/) click **Register a New Client**

![Instagram new Client](/images/instagramnewclient.png)

Register the Client with the following:

**Application Name:** Example
    
**Description:** An example

**Website URL:** http://localhost:8080

**Valid Redirect URIs:** http://localhost:8080/redirect

![Instagram client info](/images/instagramclientinfo.png)

You'll be give your ClientID and Client Secret. Stay on this page you'll need them. 

![Instagram secret](/images/instagramsecret.png)

#### STEP 2. CREATE THE PROJECT

Create and open a file named **app.go**

Assign your ClientID and Client Secret to variables as well as creating the web server. 

```go
package main

import "net/http"
import "net/url"
import "io/ioutil"

var ClientID = YOUR_CLIENT_ID
var ClientSecret = YOUR_CLIENT_SECRET
var RedirectURI = "http://localhost:8080/redirect"

// Receives the authorization code and 
// exchanges it for an access token
func redirect(res http.ResponseWriter, req *http.Request){
    
}

// Gives the user a link to allow our app
func homePage(res http.ResponseWriter, req *http.Request) {
    http.ServeFile(res, req, "index.html") 
}

func main() {
    http.HandleFunc("/redirect", redirect)
    http.HandleFunc("/", homePage)    
    http.ListenAndServe(":8080", nil)
}
```

Create **index.html** with a link to authorize the app

Make sure to replace client\_id with your own 

```html
<!--index.html-->
<a href="https://api.instagram.com/oauth/authorize/?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:8080/redirect&response_type=code&scope=public_content+comments">Allow this app to use Instagram</a>
```

Now we'll finish the redirect handler to exchange the authorization code for an access token

```go
func redirect(res http.ResponseWriter, req *http.Request){
    // After a user allows our app they return with
    // an auth code. Grab it
    code := req.FormValue("code")

    // Then we check to see if it's not empty
    if len(code) != 0 {
        
        // Send the code to the API in exchange for an access token
        formResponse, err := http.PostForm("https://api.instagram.com/oauth/access_token", url.Values{"client_id": {ClientID}, "client_secret": {ClientSecret}, "grant_type": {"authorization_code"}, "redirect_uri": {RedirectURI}, "code": {code}})
        if err != nil {
            http.NotFound(res, req)
            return
        }
        defer formResponse.Body.Close()

        // Make sure the API returns a status code 200
        if formResponse.StatusCode == 200 {

            // Convert the body into type []byte
            body, _ := ioutil.ReadAll(formResponse.Body) 

            // Send the access token to the user 
            res.Write(body)
            return
        }

        // If it fails then serve a 404 status 
        http.NotFound(res, req)
    }
}
```

Here's the entire source code or view it on [Github](https://github.com/xDinomode/Go-Instagram-API-Example) 

```go
package main

import "net/http"
import "net/url"
import "io/ioutil"
import "fmt"

var ClientID = YOUR_CLIENT_ID
var ClientSecret = YOUR_CLIENT_SECRET
var RedirectURI = "http://localhost:8080/redirect"

func redirect(res http.ResponseWriter, req *http.Request) {

	code := req.FormValue("code")

	if len(code) != 0 {

		formResponse, err := http.PostForm("https://api.instagram.com/oauth/access_token", url.Values{"client_id": {ClientID}, "client_secret": {ClientSecret}, "grant_type": {"authorization_code"}, "redirect_uri": {RedirectURI}, "code": {code}})
		if err != nil {
			fmt.Println(err)
			http.NotFound(res, req)
			return
		}
		defer formResponse.Body.Close()

		if formResponse.StatusCode == 200 {

			body, _ := ioutil.ReadAll(formResponse.Body)

			res.Write(body)
			return
		}
		fmt.Println(formResponse.StatusCode)
		http.NotFound(res, req)
	}

}

func homePage(res http.ResponseWriter, req *http.Request) {
	http.ServeFile(res, req, "index.html")
}

func main() {
	http.HandleFunc("/redirect", redirect)
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":8080", nil)
}

```

Now run it 

```bash
go run app.go
```

Go to localhost:8080

![Instagram localhost](/images/instagramlocalhost.png)

Authorize the app

![Instagram auth](/images/instagramauthh.png)

#### DONE 

You now have the users access token to make [requests to the API](https://www.instagram.com/developer/endpoints/)

![Instagram token](/images/instagramtoken.png)




