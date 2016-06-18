---
layout: post
title: "Golang Authentication Using JSON Web Tokens"
description: "Using JSON Web Tokens for authentication step by step tutorial for beginners."
category: go
---

In this tutorial I'll be showing authentication using JSON Web Tokens in Golang.

<!--more-->
If you don't know how JSON web tokens work then [read this](https://jwt.io/introduction/) first.

<br>

### CREATE A NEW GO PROJECT 

Name the file **auth.go** and create a simple web server.

```go
//auth.go
package main

import "net/http"

func homePage(res http.ResponseWriter, req *http.Request){
   res.Write([]byte("Home Page")) 
}

func main(){
    http.HandleFunc("/", homePage)    
    http.ListenAndServe(":8080", nil)
}
```

<br>

### SET THE TOKEN

Get the package [jwt-go](https://github.com/dgrijalva/jwt-go) to create tokens.

```bash
go get github.com/dgrijalva/jwt-go 
```

Create claims. Think of this as a schema for the data you'll pass in a token.   

```go
type MyCustomClaims struct {
    // This will hold a users username after authenticating.
    // Ignore `json:"username"` it's required by JSON 
    Username string `json:"username"`

    // This will hold claims that are recommended having (Expiration, issuer)
    jwt.StandardClaims
}
```

Create the handler that will set a token in the client's cookie.

```bash
http.HandleFunc("/setToken", setToken)
```

<br>
In production you'd do password authentication against a database before setting the token.

```go
func setToken(res http.ResponseWriter, req *http.Request) {

    // Expires the token and cookie in 24 hours
    expireToken := time.Now().Add(time.Hour * 24).Unix()
    expireCookie := time.Now().Add(time.Hour * 24)

    // We'll manually assign the claims but in production you'd insert values from a database 
    claims := MyCustomClaims {
        "myusername",
        jwt.StandardClaims {
            ExpiresAt: expireToken,
            Issuer: "example.com",
        },
    }

    // Create the token using your claims
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // Signs the token with a secret.    
    signedToken, _ := token.SignedString([]byte("secret"))

    // This cookie will store the token on the client side
    cookie := http.Cookie{Name: "Auth", Value: signedToken, Expires: expireCookie, HttpOnly: true}
    http.SetCookie(res, &cookie)
    
    // Redirect the user to his profile
    http.Redirect(res, req, "/profile", 301)
}
```

<br>

### CREATE VALIDATION MIDDLEWARE 

[Middleware](https://medium.com/@matryer/the-http-handlerfunc-wrapper-technique-in-golang-c60bf76e6124#.rzwqxwbqj) lets us run code before serving an http request. 


```go
// Middleware to protect private pages 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        //Validate the token and if it passes call the protected handler below.
        protectedPage(res, req)
    })    
}
```

First let's make sure a cookie is present 

```go
// Middleware to protect private pages 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        
        // If no Auth cookie is set then return a 404 not found
        cookie, err := req.Cookie("Auth")
        if err != nil {
            http.NotFound(res, req)
            return
        }

        //Validate the token and if it passes call the protected handler below.
        protectedPage(res, req)
    })    
}
```

Extract the token from the cookie 

```go
// Middleware to protect private pages 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        
        // If no Auth cookie is set then return a 404 not found
        cookie, err := req.Cookie("Auth")
        if err != nil {
            http.NotFound(res, req)
            return
        }
        
        // Cookies concatenate the key/value. Remove the Auth= part 
        splitCookie := strings.Split(cookie.String(), "Auth=")

        //Validate the token and if it passes call the protected handler below.
        protectedPage(res, req)
    })    
}
```

Validate the token

Btw you should be referencing the offical [go-jwt docs](https://godoc.org/github.com/dgrijalva/jwt-go#Parser.ParseWithClaims) for more in-depth into the functions. 

```go
// Middleware to protect private pages 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        
        // If no Auth cookie is set then return a 404 not found
        cookie, err := req.Cookie("Auth")
        if err != nil {
            http.NotFound(res, req)
            return
        }
        
        // The token is concatenated with its key Auth=token
        // We remove the Auth= part by splitting the cookie in two 
        splitCookie := strings.Split(cookie.String(), "Auth=")

        // Parse, validate and return a token. 
        token, err := jwt.ParseWithClaims(splitCookie[1], &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error){
           // Prevents a known exploit 
           if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok{
                return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
           }     
           return []byte("secret"), nil
        }) 

        protectedPage(res, req)
    })    
}
```

<br>

The middleware needs a way to pass the claims into the protectedPage

We'll use [gorilla/context](http://www.gorillatoolkit.org/pkg/context) for that

```bash
go get github.com/gorilla/context
```
<br>

```go
// Middleware to protect private pages 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        
        // If no Auth cookie is set then return a 404 not found
        cookie, err := req.Cookie("Auth")
        if err != nil {
            http.NotFound(res, req)
            return
        }
        
        // The token is concatenated with its key Auth=token
        // We remove the Auth= part by splitting the cookie in two 
        splitCookie := strings.Split(cookie.String(), "Auth=")

        // Parse, validate and return a token. 
        token, err := jwt.ParseWithClaims(splitCookie[1], &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error){
           // Prevents a known exploit 
           if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok{
                return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
           }     
           return []byte("secret"), nil
        }) 
       
        // Validate the token and save the token's claims to a context
        if claims, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
            context.Set(req, "Claims", claims)    
        } else {
            http.NotFound(res, req)
            return
        }
        
        // If everything is valid then call the original protected handler
        protectedPage(res, req)
    })    
}
```

<br>

### CREATE THE PROFILE PAGE

This page can only be accessed by users with valid tokens. 

```go
func profile(res http.ResponseWriter, req *http.Request){
    claims := context.Get(req, "Claims").(*MyCustomClaims)
    res.Write([]byte(claims.Username))
    context.Clear(req)
}

```

<br>

### DONE!

Here's the entire source code


```go
package main

import "github.com/dgrijalva/jwt-go"
import "github.com/gorilla/context"

import "net/http"

import "fmt"
import "strings"
import "time"

type MyCustomClaims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}

func setToken(res http.ResponseWriter, req *http.Request) {
    expireToken := time.Now().Add(time.Hour * 24).Unix()
    expireCookie := time.Now().Add(time.Hour * 24)

    claims := MyCustomClaims {
        "myusername",
        jwt.StandardClaims {
            ExpiresAt: expireToken,
            Issuer: "example.com",
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    signedToken, _ := token.SignedString([]byte("secret"))

    cookie := http.Cookie{Name: "Auth", Value: signedToken, Expires: expireCookie, HttpOnly: true}
    http.SetCookie(res, &cookie)

    http.Redirect(res, req, "/profile", 301)
}

func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        
        cookie, err := req.Cookie("Auth")
        if err != nil {
            http.NotFound(res, req)
            return
        }
        
        splitCookie := strings.Split(cookie.String(), "Auth=")

        token, err := jwt.ParseWithClaims(splitCookie[1], &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error){
           if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok{
                return nil, fmt.Errorf("Unexpected signing method %v", token.Header["alg"])
           }     
           return []byte("secret"), nil
        }) 
       
        if claims, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
            context.Set(req, "Claims", claims)    
        } else {
            http.NotFound(res, req)
            return
        }
        
        protectedPage(res, req)
    })    
}

func profile(res http.ResponseWriter, req *http.Request){
    claims := context.Get(req, "Claims").(*MyCustomClaims)
    res.Write([]byte(claims.Username))
    context.Clear(req)
}

func homePage(res http.ResponseWriter, req *http.Request){
    res.Write([]byte("Home Page"))
}
func main(){
    http.HandleFunc("/profile", validate(profile))
    http.HandleFunc("/setToken", setToken)    
    http.HandleFunc("/", homePage)
    http.ListenAndServe(":8080", nil)
}
```


