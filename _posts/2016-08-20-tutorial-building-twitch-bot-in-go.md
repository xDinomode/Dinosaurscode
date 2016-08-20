---
layout: post
title: "Building a Twitch/IRC Bot in Go"
description: "Learn how to create a Twitch bot in go/golang easily and quickly."
category: go
---

Golang makes it easy to connect to servers running IRC using the [net](https://golang.org/pkg/net/) package. Thus we'll be building a Twitch Bot that echoes a user's chat input.

<!--more-->

### First get an access token

Twitch doesn't allow you to authenticate with a plain password and so you're required to use an access token. 

While it would be fun to roll out our own OAuth access token generator it's simpler to use a third-party such as [twitchapps](http://twitchapps.com/tmi) as recommended by [Twitch](https://help.twitch.tv/customer/portal/articles/1302780-twitch-irc)

![Twitchapps](/images/twitchapps.png)

Store the token you get after clicking **Connect with Twitch**


### The code

Before proceeding you should obviously have the [Go](https://golang.org/dl/) programming language installed.

First we connect to twitch's irc server:

```go
package main

import "net"
import "net/textproto"
import "strings"
import "bufio"

func main() {
    // connect to the twitch server
    conn, err := net.Dial("tcp", "irc.chat.twitch.tv:6667")
    if err != nil {
        panic(err)    
    }
}
```

Then we pass our credentials:

```go
package main

import "net"
import "net/textproto"
import "strings"
import "bufio"

func main() {
    conn, err := net.Dial("tcp", "irc.chat.twitch.tv:6667")
    if err != nil {
        panic(err)    
    }

    // token, username, channel
    conn.Write([]byte("PASS " + "oauth:yourtoken" + "\r\n"))
    conn.Write([]byte("NICK " + "yourusername" + "\r\n"))
    conn.Write([]byte("JOIN " + "#yourchannel" + "\r\n"))
    defer conn.Close()
}
```

Lastly we create an endless while loop to listen/respond to chat messages:

```go
package main

import "net"
import "net/textproto"
import "strings"
import "bufio"

func main() {
    conn, err := net.Dial("tcp", "irc.chat.twitch.tv:6667")
    if err != nil {
        panic(err)    
    }

    conn.Write([]byte("PASS " + "oauth:yourtoken" + "\r\n"))
    conn.Write([]byte("NICK " + "yourusername" + "\r\n"))
    conn.Write([]byte("JOIN " + "#yourchannel" + "\r\n"))
    defer conn.Close()

    // handles reading from the connection
    tp := textproto.NewReader(bufio.NewReader(conn))

    // listens/responds to chat messages
    for {
        msg, err := tp.ReadLine()
        if err != nil {
            panic(err)    
        }

        // split the msg by spaces 
        msgParts := strings.Split(msg, " ")

        // if the msg contains PING you're required to
        // respond with PONG else you get kicked
        if msgParts[0] == "PING" {
            conn.Write([]byte("PONG " + msgParts[1]))
            continue
        }

        // if msg contains PRIVMSG then respond 
        if msgParts[1] == "PRIVMSG" {
              // echo back the same message
              conn.Write([]byte("PRIVMSG " + msgParts[2] + " " + msgParts[3] + "\r\n"))
        }
    }
}
```

As you can see we split the message by spaces into parts because a typical irc message comes like this: 

```text
:username@username.tmi.twitch.tv PRIVMSG #channel :chatmessage
```

And we should handle it based on these parts. Most messages you'll receive are [here](https://help.twitch.tv/customer/portal/articles/1302780-twitch-irc). 

### Demo and [Source Code](https://github.com/xDinomode/TwitchBot-Example):

![Twitch Bot Demo](/images/twitchbot.gif)



