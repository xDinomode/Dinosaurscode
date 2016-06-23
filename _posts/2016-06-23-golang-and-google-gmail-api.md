---
layout: post
title: "Sending Email With Golang and Gmail's API"
category: go
description: "How to use Oauth2 and Gmail's API for sending email with Golang. Tutorial/walkthrough"
---

In this tutorial I'll demonstrate how to send email using Oauth2 and Gmail's API.

Before proceeding login to [console.developers.google.com](https://console.developers.google.com)

#### CREATE A NEW PORJECT

Click **CREATE PROJECT**

![New Project](/images/gmailapinewproject.png)

Give your project a name then click **Create**. I'll use Example 

![Gmail API name](/images/gmailapiname.png)

You'll be redirected to this page. Search "Gmail API" 

![Gmail API search](/images/gmailapisearch.png)

Click into it and then click **Enable**

![Gmail API enable](/images/gmailapienable.png)

Then click **Credentials** on the left side and then **OAuth consent screen**

Insert any product name. I'll use Example. Then click **save**

![Gmail API Oauth2](/images/gmailapioauth.png)

Click **Create credentials** and select **OAuth client ID**

![Gmail API Oauth2 credentials](/images/gmailapioauth2.png)

In Application type select **Other** then click **Create**

![Gmail API type](/images/gmailapitype.png)

Now download your client secret by clicking on this button

After downloading, rename it to **client_secret.json** and place it where you'll be coding

![Gmail API secret](/images/gmailapisecret.png)


#### CREATE A NEW GO PROJECT 

I'll name mine **email.go**

```go
package main 

func main() {
    
}
```

We'll require two external libraries 
    
* [golang.org/x/oauth2](https://github.com/golang/oauth2)  
    
    Creates an *http.Client that is used by the package below to send requests to the Gmail API on behalf of a user

* [google.golang.org/api/gmail/v1](https://github.com/google/google-api-go-client)

    Gives us methods to manipulate the Gmail API
   

```bash
go get golang.org/x/oauth2 

go get google.golang.org/api/gmail/v1
```

Here are all the packages we'll depend on. For the rest of the tutorial I'll be working inside func main()

```go
package main 

import "golang.org/x/oauth2"
import "golang.org/x/oauth2/google"
import "google.golang.org/api/gmail/v1"
import "fmt"
import "log"
import "strings"
import "encoding/base64"
import "io/ioutil"


func main() {
    
}
```

First create an [oauth2.Config](https://godoc.org/golang.org/x/oauth2#Config) using the **client_secret.json** we downloaded

```go
func main() {
	// Reads in our credentials 
	secret, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Error: %v", err)
	}    
}
```

The default oauth2 package doesn't have a method to parse the secret into an oauth2.Config so instead we use oauth2/google 

```go
func main() {
	// Reads in our credentials 
	secret, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Error: %v", err)
	}    

	// Creates a oauth2.Config using the secret
	// The second parameter is the scope, in this case we only want to send email 
	conf, err := google.ConfigFromJSON(secret, gmail.GmailSendScope)
	if err != nil {
		log.Printf("Error: %v", err)
	}
}
```

Now we create the URL that the user will use to grant our app privileges to send email on their behalf. 

```go
func main() {
	// Reads in our credentials 
	secret, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Error: %v", err)
	}    

	// Creates a oauth2.Config using the secret
	// The second parameter is the scope, in this case we only want to send email 
	conf, err := google.ConfigFromJSON(secret, gmail.GmailSendScope)
	if err != nil {
		log.Printf("Error: %v", err)
	}

	// Creates a URL for the user to follow
	url := conf.AuthCodeURL("CSRF", oauth2.AccessTypeOffline)
	// Prints the URL to the terminal 
	fmt.Printf("Visit this URL: \n %v \n", url)


}
```

Once you allow your app send privileges by following the URL you'll copy the authentication code and paste in the terminal.

This allows the app to exchange it for an access token

```go
func main() {
	// Reads in our credentials 
	secret, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Error: %v", err)
	}    

	// Creates a oauth2.Config using the secret
	// The second parameter is the scope, in this case we only want to send email 
	conf, err := google.ConfigFromJSON(secret, gmail.GmailSendScope)
	if err != nil {
		log.Printf("Error: %v", err)
	}

	// Creates a URL for the user to follow
	url := conf.AuthCodeURL("CSRF", oauth2.AccessTypeOffline)
	// Prints the URL to the terminal 
	fmt.Printf("Visit this URL: \n %v \n", url)

	// Grabs the authorization code you paste into the terminal 
	var code string
	_, err = fmt.Scan(&code)
	if err != nil {
		log.Printf("Error: %v", err)
	}

	// Exchange the auth code for an access token
	tok, err := conf.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Printf("Error: %v", err)
	}	
}
```

Now we're able to create an \*http.Client that [gmail/v1](https://github.com/google/google-api-go-client) can use to send messages

```go
func main() {
	// Reads in our credentials 
	secret, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Error: %v", err)
	}    

	// Creates a oauth2.Config using the secret
	// The second parameter is the scope, in this case we only want to send email 
	conf, err := google.ConfigFromJSON(secret, gmail.GmailSendScope)
	if err != nil {
		log.Printf("Error: %v", err)
	}

	// Creates a URL for the user to follow
	url := conf.AuthCodeURL("CSRF", oauth2.AccessTypeOffline)
	// Prints the URL to the terminal 
	fmt.Printf("Visit this URL: \n %v \n", url)

	// Grabs the authorization code you paste into the terminal 
	var code string
	_, err = fmt.Scan(&code)
	if err != nil {
		log.Printf("Error: %v", err)
	}

	// Exchange the auth code for an access token
	tok, err := conf.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Printf("Error: %v", err)
	}	

	// Create the *http.Client using the access token
	client := conf.Client(oauth2.NoContext, tok)

	// Create a new gmail service using the client
	gmailService, err := gmail.New(client) 
	if err != nil {
		log.Printf("Error: %v", err)
	}
	
	// Message for our gmail service to send
	var message gmail.Message

	// Compose the message
	messageStr := []byte(
		"From: youremail@gmail.com\r\n" +
		"To: recipiet@gmail.com\r\n" +
		"Subject: My first Gmail API message\r\n\r\n" +
		"Message body goes here!")

	// Place messageStr into message.Raw in base64 encoded format
	message.Raw = base64.StdEncoding.EncodeToString(messageStr)

	// Send the message
	_, err = gmailService.Users.Messages.Send("me", &message).Do()
	if err != nil {
		log.Printf("Error: %v", err)
	} else {
		fmt.Println("Message sent!")
	}
}
```

#### FINISHED! 

Let's run it run it 

```bash
go run email.go
```

Open the url provided in the terminal

![Gmail API URL](/images/gmailapiurl.png)

Allow the app 

![Gmail API allow](/images/gmailapiallow.png)

Copy the authorization code and paste it into the terminal

![Gmail API authcode](/images/gmailapiauthcode.png)

And that's it. Thanks for reading!
