---
layout: post
title: "Golang and MySQL Tutorial"
description: "Tutorial on using Golang and MySQL together to build a login/logout web app example."
category: go
---

In this tutorial we'll learn how to use Golang and MySQL together to build a login/signup system.

<!--more-->

Before starting make sure you have MySQL installed and running.

<br>

#### GET THE REQUIRED PACKAGES 

The driver to connect MySQL and Go

```bash
go get github.com/go-sql-driver/mysql
```

<br>

Bcrypt to encrypt passwords before saving them 

```bash
go get golang.org/x/crypto/bcrypt
```

<br>

#### CREATE A SERVER 


```go
package main 

import "net/http"

func homePage(res http.ResponseWriter, req *http.Request) {
    http.ServeFile(res, req, "index.html")
}

func main() {
    http.HandleFunc("/", homePage)
    http.ListenAndServe(":8080", nil)    
}
```

Create **index.html** to link to a login/signup page


```html
<!DOCTYPE html>
<html>
<head>
    <title>Home Page</title>
</head>

<body>
    <h1>Home Page</h1>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
</body>
</html>
```

<br>

#### CONNECT TO MYSQL

First import the [MySQL driver](https://github.com/go-sql-driver/mysql) 

```go
import "database/sql"
import _ "github.com/go-sql-driver/mysql"
```

Notice the **_** before the driver. Instead of relying on the driver we use "database/sql" in case we want to change the driver in the future. 

Now create a global sql.DB object and open a connection to MySQL 

```go
package main 

import "database/sql"
import _ "github.com/go-sql-driver/mysql"

import "net/http"

// Global sql.DB to access the database by all handlers
var db *sql.DB 
var err error

func homePage(res http.ResponseWriter, req *http.Request) {
    http.ServeFile(res, req, "index.html")
}

func main() {
    
    // Create an sql.DB and check for errors
    db, err = sql.Open("mysql", "yourusername:yourpassword@/yourdatabase")
    if err != nil {
        panic(err.Error())    
    }
    // sql.DB should be long lived "defer" closes it once this function ends
    defer db.Close()

    // Test the connection to the database
    err = db.Ping()
    if err != nil {
        panic(err.Error())
    }

    http.HandleFunc("/", homePage)
    http.ListenAndServe(":8080", nil)    
}
```

> Before continuing create a table named users 

```sql
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(120)
);
```

<br>

#### LOGIN PAGE

I'll use func login() for both get/post requests

```go
func login(res http.ResponseWriter, req *http.Request) {
    // If method is GET serve an html login page
    if req.Method != "POST" {
        http.ServeFile(res, req, "login.html")
        return
    }    
}
```

Create **login.html** 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>

<body>
    <h1>Login Page</h1>
    <form>
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <input type="submit" value="Login">
    </form>
</body>
</html>
```

Verify that the user exists and the password is correct

```go
func login(res http.ResponseWriter, req *http.Request) {
    // If method is GET serve an html login page
    if req.Method != "POST" {
        http.ServeFile(res, req, "login.html")
        return
    }    

    // Grab the username/password from the submitted post form
    username := req.FormValue("username")
    password := req.FormValue("password")

    // Grab from the database 
    var databaseUsername  string
    var databasePassword  string

    // Search the database for the username provided
    // If it exists grab the password for validation
    err := db.QueryRow("SELECT username, password FROM users WHERE username=?", username).Scan(&databaseUsername, &databasePassword)
    // If not then redirect to the login page
    if err != nil {
        http.Redirect(res, req, "/login", 301)
        return
    }
    
    // Validate the password
    err = bcrypt.CompareHashAndPassword([]byte(databasePassword), []byte(password))
    // If wrong password redirect to the login
    if err != nil {
        http.Redirect(res, req, "/login", 301)
        return
    }

    // If the login succeeded
    res.Write([]byte("Hello " + databaseUsername))
}

```

<br>

#### SIGNUP PAGE

```go
func singupPage(res http.ResponseWriter, req *http.Request) {

    // Serve signup.html to get requests to /signup
    if req.Method != "POST" {
        http.ServeFile(res, req, "signup.html")
        return
    }     
}
```

**signup.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
</head>

<body>
    <h1>SignUp Page</h1>
    <form method="POST" action="/signup">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <input type="submit" value="SignUp">
    </form>
</body>
</html>
```

First we make sure the username is available and if it is then create the new user

```go
func singupPage(res http.ResponseWriter, req *http.Request) {

    // Serve signup.html to get requests to /signup
    if req.Method != "POST" {
        http.ServeFile(res, req, "signup.html")
        return
    }     
    
    username := req.FormValue("username")
    password := req.FormValue("password")

    var user string

    err := db.QueryRow("SELECT username FROM users WHERE username=?", username).Scan(&user)

    switch {
    // Username is available
    case err == sql.ErrNoRows:
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
        if err != nil {
            http.Error(res, "Server error, unable to create your account.", 500)    
            return
        } 

        _, err = db.Exec("INSERT INTO users(username, password) VALUES(?, ?)", username, hashedPassword)
        if err != nil {
            http.Error(res, "Server error, unable to create your account.", 500)    
            return
        }

        res.Write([]byte("User created!"))
        return
    case err != nil: 
        http.Error(res, "Server error, unable to create your account.", 500)    
        return
    default: 
        http.Redirect(res, req, "/", 301)
    }
}
```

<br>

### DONE! 

Here's the entire source code or view it on [Github](https://github.com/xDinomode/Go-Signup-Login-Example-MySQL)


```go
package main

import "database/sql"
import _ "github.com/go-sql-driver/mysql"

import "golang.org/x/crypto/bcrypt"

import "net/http"

var db *sql.DB
var err error

func signupPage(res http.ResponseWriter, req *http.Request) {
    if req.Method != "POST" {
        http.ServeFile(res, req, "signup.html")
        return
	}

	username := req.FormValue("username")
	password := req.FormValue("password")

	var user string

    err := db.QueryRow("SELECT username FROM users WHERE username=?", username).Scan(&user)

    switch {
    case err == sql.ErrNoRows:
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
        if err != nil {
            http.Error(res, "Server error, unable to create your account.", 500)    
            return
        } 

        _, err = db.Exec("INSERT INTO users(username, password) VALUES(?, ?)", username, hashedPassword)
        if err != nil {
            http.Error(res, "Server error, unable to create your account.", 500)    
            return
        }

        res.Write([]byte("User created!"))
        return
    case err != nil: 
        http.Error(res, "Server error, unable to create your account.", 500)    
        return
    default: 
        http.Redirect(res, req, "/", 301)
    }
}
	
func loginPage(res http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		http.ServeFile(res, req, "login.html")
		return
	}

	username := req.FormValue("username")
	password := req.FormValue("password")

	var databaseUsername string
	var databasePassword string

	err := db.QueryRow("SELECT username, password FROM users WHERE username=?", username).Scan(&databaseUsername, &databasePassword)

	if err != nil {
		http.Redirect(res, req, "/login", 301)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(databasePassword), []byte(password))
	if err != nil {
		http.Redirect(res, req, "/login", 301)
		return
	}

	res.Write([]byte("Hello" + databaseUsername))

}

func homePage(res http.ResponseWriter, req *http.Request) {
	http.ServeFile(res, req, "index.html")
}

func main() {
	db, err = sql.Open("mysql", "root:<password>@/<dbname>")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}

	http.HandleFunc("/signup", signupPage)
	http.HandleFunc("/login", loginPage)
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":8080", nil)
}
```






