---
layout: post
title: "Golang Authentication Using JSON Web Tokens"
description: "Using JSON Web Tokens for authentication step by step tutorial for beginners."
category: go
---

A simple example on how to authenticate users using [JSON Web Tokens](2016-06-17-golang-jwt-authentication.md). Full source code on [Github](https://github.com/xDinomode/Go-JWT-Authentication-Example).

<!--more-->

### CREATE THE HANDLERS 


```go
package main

import "net/http"

// create a JWT and put in the clients cookie
func setToken(res http.ResponseWriter, req *http.Request) {
    
}

// middleware to protect private pages
func validate(page http.HandlerFunc) http.HandlerFunc {
    
}

// only viewable if the client has a valid token
func protectedProfile(res http.ResponseWriter, req *http.Request){

}

// deletes the cookie
func logout(res http.ResponseWriter, req *http.Request) {

}

func main(){
    http.HandleFunc("/settoken", setToken)
    http.HandleFunc("/profile", validate(protectedProfile))    
    http.HandleFunc("/logout", validate(protectedLogout))
    http.ListenAndServe(":9000", nil)
}
```

<br>

### setToken 

Go get the package [jwt-go](https://github.com/dgrijalva/jwt-go)

```bash
go get github.com/dgrijalva/jwt-go 
```

Create a global struct called Claims that defines the JWT data

```go
type Claims struct {
    Username string `json:"username"`
    // recommended having
    jwt.StandardClaims
}
```

In production you'd authenticate against a database before setting the token

```go
func setToken(res http.ResponseWriter, req *http.Request) {

    // Expires the token and cookie in 1 hour
    expireToken := time.Now().Add(time.Hour * 1).Unix()
    expireCookie := time.Now().Add(time.Hour * 1)

    // We'll manually assign the claims but in production you'd insert values from a database 
    claims := Claims {
        "myusername",
        jwt.StandardClaims {
            ExpiresAt: expireToken,
            Issuer:    "localhost:9000",
        },
    }

    // Create the token using your claims
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // Signs the token with a secret.    
    signedToken, _ := token.SignedString([]byte("secret"))

    // Place the token in the client's cookie 
    cookie := http.Cookie{Name: "Auth", Value: signedToken, Expires: expireCookie, HttpOnly: true}
    http.SetCookie(res, &cookie)
    
    // Redirect the user to his profile
    http.Redirect(res, req, "/profile", 307)
}
```

<br>

### validate 

[Middleware](https://medium.com/@matryer/the-http-handlerfunc-wrapper-technique-in-golang-c60bf76e6124#.rzwqxwbqj) wraps around the original request in order to run code before serving it. In this case we'll check if a valid token is set


```go
// Middleware to protect /profile and /logout 
func validate(protectedPage http.HandlerFunc) http.HandlerFunc {
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request){
        //Validate the token and if it passes call the protected handler below.
        protectedPage(res, req)
    })    
}
```

Extract and validate the cookie's token. If it's valid then pass its claims into the original request via context. 

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
       
        // Return a Token using the cookie
        token, err := jwt.ParseWithClaims(cookie.Value, &Claims{}, func(token *jwt.Token) (interface{}, error){
            // Make sure token's signature wasn't changed
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("Unexpected siging method")    
            }    
            return []byte("secret"), nil
        })
        if err != nil {
            http.NotFound(res, req)
            return
        }
       
        // Grab the tokens claims and pass it into the original request
        if claims, ok := token.Claims.(*Claims); ok && token.Valid {
            ctx := context.WithValue(req.Context(), MyKey, *claims)
            page(res, req.WithContext(ctx))
        } else {
            http.NotFound(res, req)
            return
        }
    })    
}
```
<br>

### protectedProfile and logout 

These pages can only be accessed with valid tokens

```go
func protectedProfile(res http.ResponseWriter, req *http.Request){
    claims, ok := req.Context().Value(MyKey).(Claims)
    if !ok {
        http.NotFound(res, req)
        return
    }

    fmt.Fprintf(res, "Hello %s", claims.Username)
}

func logout(res http.ResponseWriter, req *http.Request){
    deleteCookie := http.Cookie{Name: "Auth", Value: "none", ExpiresAt: time.Now()}
    http.SetCookie(res, &deleteCookie)
    return
}
```

<br>

### DONE!

Now start it up and visit **/settoken** to simulate loging in

Then you'll be redirected to **/profile** which is only accessible with your token

Lastly simulate logging out by going to **/logout**

Full source code on [Github](https://github.com/xDinomode/Go-JWT-Authentication-Example)

