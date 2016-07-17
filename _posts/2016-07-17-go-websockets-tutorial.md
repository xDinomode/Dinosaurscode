---
layout: post
title: "Go WebSockets Tutorial"
description: "Using Go and gorilla/websocket to create a chat box that broadcasts messages to all clients. Simple to follow tutorial."
category: go
---

We'll be building a basic chat box using Go and [gorilla/websocket](https://github.com/gorilla/websocket).

<!--more-->

![Go WebSockets](/images/websockets.gif)

### Begin by creating the webserver

Create a websocket [upgrader](http://godoc.org/github.com/gorilla/websocket#Upgrader) to upgrade http connections to ws.

```go
package main

import "net/http"
import "github.com/gorilla/websocket"

var upgrader = websocket.Upgrader{}

// upgrades the connection to ws using the upgrader  
func wsPage(res http.ResponseWriter, req *http.Request){

}

// serves the chat box
func homePage(res http.ResponseWriter, req *http.Request){
    http.ServeFile(res, req, "index.html")    
}

func main(){
    http.HandleFunc("/ws", wsPage)
    http.HandleFunc("/", homePage)    
    http.ListenAndServe(":8080", nil)
}
```

Here's the **index.html** for the chat box. Read [this](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) for reference on how client side websocket applications work.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

    <input type="text" placeholder="message" id="textbox">
    <button id="button">Send</button>
    <div id="box"></div>

    <script>
        var socket = new WebSocket("ws://localhost:8080/ws");

        var button = document.getElementById("button");
        button.addEventListener("click", function(event){
            var text = document.getElementById("textbox").value;        
            socket.send(text);
        });

        socket.onopen = function(event){
            console.log("Socket opened successfully");
        }

        socket.onmessage = function(event){
            var box = document.createElement("div");
            box.innerHTML = event.data;
            document.getElementById("box").appendChild(box);
        }
        
        window.onbeforeunload = function(event){
            socket.close();
        }
    </script>
</body>
</html>

```

### Hub and Client

The **Hub** stores a [map](https://blog.golang.org/go-maps-in-action) of all the connected clients and also broadcasts messages to them all.

For those unfamiliar with channels read [this](https://gobyexample.com/channels). Basically, they allow [goroutines](https://gobyexample.com/goroutines) to communicate by passing data through them.


```go
type Hub struct {
    clients map[*Client]bool
    broadcast     chan []byte
    addClient     chan *Client
    removeClient  chan *Client
}

// initialize a new hub
var hub = Hub{
    broadcast:     make(chan []byte),
    addClient:     make(chan *Client),
    removeClient:  make(chan *Client),
    clients:       make(map[*Client]bool),
}

// Runs forever as a goroutine
func (hub *Hub) start() {
    for {
        // one of these fires when a channel 
        // receives data
        select {
        case conn := <-hub.addClient:
            // add a new client
            hub.clients[conn] = true
        case conn := <-hub.removeClient:
            // remove a client
            if _, ok := hub.clients[conn]; ok {
                delete(hub.clients, conn)
                close(conn.send)
            }
        case message := <-hub.broadcast:
            // broadcast a message to all clients
            for conn := range hub.clients {
                select {
                case conn.send <- message:
                default:
                    close(conn.send)
                    delete(hub.clients, conn)
                }
            }
        }
    }
}
```

The **Client** stores the client's websocket connection and sends/receives messages. 

```go
type Client struct {
    ws *websocket.Conn
    // Hub passes broadcast messages to this channel
    send chan []byte
}

// Hub broadcasts a new message and this fires 
func (c *Client) write() {
    // make sure to close the connection incase the loop exits
    defer func() {
        c.ws.Close()
    }()

    for {
        select {
        case message, ok := <-c.send:
            if !ok {
                c.ws.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }

            c.ws.WriteMessage(websocket.TextMessage, message)
        }
    }
}

// New message received so pass it to the Hub 
func (c *Client) read() {
    defer func() {
        hub.removeClient <- c
        c.ws.Close()
    }()

    for {
        _, message, err := c.ws.ReadMessage()
        if err != nil {
            hub.removeClient <- c
            c.ws.Close()
            break
        }

        hub.broadcast <- message
    }
}
```

We should now change the wsPage() handler to create a new client after upgrading the connection and storing it in the Hub.

```go
func wsPage(res http.ResponseWriter, req *http.Request) {
    conn, err := upgrader.Upgrade(res, req, nil)
    if err != nil {
        http.NotFound(res, req)
        return
    }

    client := &Client{
        ws:   conn,
        send: make(chan []byte),
    }

    hub.addClient <- client

    go client.write()
    go client.read()
}
```

And done, here's the full source code or view it on [Github](https://github.com/xDinomode/Go-Websocket-Chatbox-Example):

```go
package main

import "net/http"
import "github.com/gorilla/websocket"

var upgrader = websocket.Upgrader{}

type Hub struct {
    clients map[*Client]bool
    broadcast     chan []byte
    addClient     chan *Client
    removeClient  chan *Client
}

var hub = Hub{
    broadcast:     make(chan []byte),
    addClient:     make(chan *Client),
    removeClient:  make(chan *Client),
    clients:       make(map[*Client]bool),
}

func (hub *Hub) start() {
    for {
        select {
        case conn := <-hub.addClient:
            hub.clients[conn] = true
        case conn := <-hub.removeClient:
            if _, ok := hub.clients[conn]; ok {
                delete(hub.clients, conn)
                close(conn.send)
            }
        case message := <-hub.broadcast:
            for conn := range hub.clients {
                select {
                case conn.send <- message:
                default:
                    close(conn.send)
                    delete(hub.clients, conn)
                }
            }
        }
    }
}

type Client struct {
    ws *websocket.Conn
    send chan []byte
}

func (c *Client) write() {
    defer func() {
        c.ws.Close()
    }()

    for {
        select {
        case message, ok := <-c.send:
            if !ok {
                c.ws.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }

            c.ws.WriteMessage(websocket.TextMessage, message)
        }
    }
}

func (c *Client) read() {
    defer func() {
        hub.removeClient <- c
        c.ws.Close()
    }()

    for {
        _, message, err := c.ws.ReadMessage()
        if err != nil {
            hub.removeClient <- c
            c.ws.Close()
            break
        }

        hub.broadcast <- message
    }
}

func wsPage(res http.ResponseWriter, req *http.Request) {
    conn, err := upgrader.Upgrade(res, req, nil)

    if err != nil {
        http.NotFound(res, req)
        return
    }

    client := &Client{
        ws:   conn,
        send: make(chan []byte),
    }

    hub.addClient <- client

    go client.write()
    go client.read()
}

func homePage(res http.ResponseWriter, req *http.Request){
    http.ServeFile(res, req, "index.html")    
}

func main(){
    go hub.start()
    http.HandleFunc("/ws", wsPage)
    http.HandleFunc("/", homePage)    
    http.ListenAndServe(":8080", nil)
}

```
