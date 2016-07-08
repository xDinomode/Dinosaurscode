---
layout: post
title: "Golang and Reddit API Tutorial"
description: "Learn how to submit content using Golang and Reddit's API in this quick tutorial."
category: go
---

In the following tutorial I'll demonstrate how to sumbit content to a subreddit using Golang and Reddit's API.

<!--more-->

Full source code is on [Github](https://github.com/xDinomode/Go-Reddit-API-Example)

### Register your application

First step is to register your app with Reddit at [https://reddit.com/prefs/apps](https://reddit.com/prefs/apps)

At the bottom of that page click **are you a developer? create an app...** then fill out the form 

![Reddit API New](/images/redditapinew.png)

### Begin coding

Start off by creating an **app.go** file with the following web app boilerplate

```go
package main

import "net/http"
import "golang.org/x/oauth2"
import "fmt"
import "bytes"

func redirect(res http.ResponseWriter, req *http.Request) {
    res.Write([]byte("Redirect Page"))
}

func homePage(res http.ResponseWriter, req *http.Request) {
    res.Write([]byte("Home Page"))
}

func main() {
    http.HandleFunc("/redirect", redirect)
    http.HandleFunc("/", homePage)
    http.ListenAndServe(":3000", nil)
}
```

Quick rundown:

**"net/http"** is used to create the web server and also to make HTTP requests to Reddit's API once the user allows access.

**"golang.org/x/oauth2"** handles the grunt work of OAuth2

**"fmt"** error logging to the terminal

**"bytes"** eventually when we submit content to a subreddit this package will handle the query parameters 

### Configure OAuth2

Add your clientID, clientSecret, and \*oauth2.Config to the global scope of the program

The clientID and clientSecret can be found at [https://reddit.com/prefs/apps](https://reddit.com/prefs/apps)

![Reddit API credentials](/images/redditapiclientcreds.png)

```go
package main

import "net/http"
import "golang.org/x/oauth2"
import "fmt"
import "bytes"

var ClientID = "Your Client ID"
var ClientSecret = "Your Client Secret"
var RedirectURL = "http://localhost:3000/redirect"
// authURL, tokenURL are used by OAuth2
var authURL = "https://www.reddit.com/api/v1/authorize"
var tokenURL = "https://www.reddit.com/api/v1/access_token"
var redditConf *oauth2.Config
```

Now inside of **func main()** instantiate the redditConf object 

```go
func main() {
    redditConf = &oauth2.Config{
        ClientID: ClientID,
        ClientSecret: ClientSecret,
        Endpoint: oauth2.Endpoint{
            AuthURL: authURL,
            TokenURL: tokenURL,
        },
        RedirectURL: RedirectURL,
        Scopes: []string{"submit"},
    }

    http.HandleFunc("/redirect", redirect)
    http.HandleFunc("/", homePage)
    http.ListenAndServe(":3000", nil)
}
```



### Grab an access token 

First step is to create a URL that the user can follow to allow our app access

```go
func homePage(res http.ResponseWriter, req *http.Request) {
    url := redditConf.AuthCodeURL("CSRF")
    res.Write([]byte(fmt.Sprintf("<a href='%s'>Allow this app access</a>", url)))
}
```

If the user allows access they'll be redirected to /redirect with a code that we must exchange for an access token

```go
func redirect(res http.ResponseWriter, req *http.Request) {
    // Grab the code from the user
    code := req.FormValue("code")
	
    // Make sure it exists
    if len(code) != 0 {

    } else {
        http.NotFound(res, req)
    }
}
```

Then we exchange the code for an access token and make a POST request to Reddit's API to submit some content

```go
func redirect(res http.ResponseWriter, req *http.Request) {
    code := req.FormValue("code")
	
    if len(code) != 0 {
        // Exchange the code for an accessToken
        accessToken, err := redditConf.Exchange(oauth2.NoContext, code)
        if err != nil{
            fmt.Println(err)
            http.NotFound(res, req)
            return
        } 
    } else {
        http.NotFound(res, req)
    }
}
```

Next check that the token is valid and then create an [\*http.Client](https://golang.org/pkg/net/http/#Client) that will make requests to Reddit's API

OAuth2 handles creating the \*http.Client   

```go
func redirect(res http.ResponseWriter, req *http.Request) {
    code := req.FormValue("code")
	
    if len(code) != 0 {
        accessToken, err := redditConf.Exchange(oauth2.NoContext, code)
        if err != nil{
            fmt.Println(err)
            http.NotFound(res, req)
            return
        } 
        
        if accessToken.Valid() {
          // Create the *http.Client
          httpClient := redditConf.Client(oauth2.NoContext, accessToken)

          // Add the query parameters to submit content to /r/test
          query := []byte("sr=test&title=Test&kind=self&text=My First Bot Post")
         
          // POST request to the API 
          apiRequest, err := http.NewRequest("POST", "https://oauth.reddit.com/api/submit?", bytes.NewBuffer(query))  
          // Reddit requires a custom User-Agent with every request
          apiRequest.Header.Add("User-Agent", "MyAwesomeApp:v1.0 (by /u/xDinomode)")
          if err != nil {
            fmt.Println(err)
            http.NotFound(res, req)
            return
          }
          
          // Do the apiRequest
          apiResponse,err := httpClient.Do(apiRequest)
          if err != nil {
            fmt.Println(err)
            http.NotFound(res, req)
            return
          } 

          defer apiResponse.Body.Close()
          fmt.Println("Response Status:", apiResponse.Status)
          fmt.Println("Response Headers:", apiResponse.Header)
          res.Write([]byte("Post Submitted to /r/test!"))
        } else {
          http.NotFound(res, req)
        } 
    } else {
        http.NotFound(res, req)
    }
}
```

### Let's run it

```bash
go run app.go
```

![Reddit API Localhost](/images/redditapilocalhost.png)

![Reddit API Authorize](/images/redditapiauth.png)

![Reddit API Success](/images/redditapisuccess.png)

![Reddit API Submitted](/images/redditapisubmitted.png)

### Done!

I should add if you get a **429: Too many requests** it's probably the User-Agent that Reddit isn't liking. Here are the [official rules](https://github.com/reddit/reddit/wiki/API#rules) 

[Reddit's API](https://www.reddit.com/dev/api/)

Full source code is on [Github](https://github.com/xDinomode/Go-Reddit-API-Example)
