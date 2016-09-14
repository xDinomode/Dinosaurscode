---
layout: post
title: "Using Go with Redis"
description: "A simple introduction on how to use Go with Redis. Uses the Go client garyburd/redigo."
category: go
---

In this demonstration you'll learn how to use Go with Redis. First and foremost **go get** [garyburd/redigo](https://github.com/garyburd/redigo) for connecting with the Redis-server.

```bash
$ go get github.com/garyburd/redigo
```

Next make sure you have [Redis](http://redis.io/) installed and the redis-server running. 

```bash
$ redis-server
```

### Connecting to Redis

The function redis.Dial() returns a [redis.Conn](https://godoc.org/github.com/garyburd/redigo/redis#Conn) type that is used to send commands to the redis-server and get back a response.

```go
package main

import "fmt"
import "github.com/garyburd/redigo/redis"

func main() {
    // Connect to the default port
    conn, err := redis.Dial("tcp", ":6379")
    if err != nil {
        panic(err.Error())    
    }
    defer conn.Close()

    // Send Redis a ping command and wait for a pong
    pong, _ := conn.Do("PING")
    fmt.Println(pong)
    
    // Output: PONG
}
```

### Storing and retrieving data

Try setting a string

```go
ok, _ := conn.Do("SET", "name", "john")
fmt.Println(ok)

// Output: OK
```

Now try retrieving that value

```go
name, _ := conn.Do("GET", "name")
fmt.Println(name)

// Output: [106 111 104 110]
```

Oh no! That's not correct. 

Sometimes you have to explicitly convert the response to the correct type using either [type assertion](https://golang.org/ref/spec#Type_assertions) or the redigo [helper functions](https://godoc.org/github.com/garyburd/redigo/redis#hdr-Reply_Helpers).

```go
// Notice the redis.String() wrapper
name, _ := redis.String(conn.Do("GET", "name"))
fmt.Println(name)

// Output: john
```

### Encoding into json

You can store a more complex data type such as a struct by encoding it into json.

```go
// Encode the struct as json and save in a list 

type User struct {
    Name string
    Age  int
}

user1 := User{"John", 22}

encoded, _ := json.Marshal(user1)

conn.Do("LPUSH", "users", encoded)
```

Now decode it into a struct 

```go
// Grab out of redis and decode into a struct 

type User struct {
    Name string
    Age  int
}

var unencoded *User 

// Grabs the entire users list into an []string named users
users, _ := redis.Strings(conn.Do("LRANGE", "users", 0, -1))
// Grab one string value and convert it to type byte
// Then decode the data into unencoded
json.Unmarshal([]byte(users[0]), &unencoded)
fmt.Println(unencoded.Name)

// Output: John
```

### Lastly, you should use a Pool in your web app 

Your http handlers should grab a connection from the [Pool](https://godoc.org/github.com/garyburd/redigo/redis#Pool) and close it when done.

```go
package main

import "github.com/garyburd/redigo/redis"
import "net/http"

// Global pool that handlers can grab a connection from
var pool = newPool()

// Pool configuration
func newPool() *redis.Pool {
	return &redis.Pool{
		MaxIdle:   80,
		MaxActive: 12000,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", ":6379")
		},
	}
}

func home(res http.ResponseWriter, req *http.Request) {
	// Grab a connection and make sure to close it with defer 
	conn := pool.Get()
	defer conn.Close()

	pong, _ := redis.Bytes(conn.Do("PING"))
	res.Write(pong)
}

func main() {
	http.HandleFunc("/", home)
	http.ListenAndServe(":8080", nil)
}
```
