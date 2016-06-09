---
layout: post
title: Golang Web App to Production
description: "Learn how to deploy a Go web app to your server. Using supervisor to keep it up and running."
category: go
---


In this tutorial I'll show how to deploy your go web app to production. I'm running on a Ubuntu 14.04 machine. 

<!--more-->

<br>

### Step 1. Install [supervisor](http://supervisord.org/installing.html) 

```bash
sudo apt-get install supervisor
```

<br>

### Step 2. Create a supervisor group

```bash
$ sudo addgroup --system supervisor

#insert a user. I used ubuntu since it's not root for me
$ sudo adduser <yourusernotroot> supervisor
$ logout
$ groups
```

<br>

### Step 4. Modify /etc/supervisor/supervisord.conf 

Open **/etc/supervisor/supervisord.conf**

Most of this is default simply modify the parts I added a comment on.

```bash
; supervisor config file

[unix_http_server]
file=/var/run/supervisor.sock   ; (the path to the socket file)
#make sure this is 0770
#also don't paste these comments into your file!
chmod=0770                       ; sockef file mode (default 0700)
#make sure to chown to supervisor
chown=root:supervisor		;

[supervisord]
logfile=/var/log/supervisor/supervisord.log ; (main log file;default $CWD/supervisord.log)
pidfile=/var/run/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
childlogdir=/var/log/supervisor            ; ('AUTO' child log dir, default $TEMP)

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///var/run/supervisor.sock ; use a unix:// URL  for a unix socket

[include]
files = /etc/supervisor/conf.d/*.conf

```

<br>

### Step 3. Create your app conf inside /etc/supervisor/conf.d

Create a file inside **/etc/supervisor/conf.d/app.conf**

Remember **NOT** to add the comments that start with # inside your file

```bash
[program:app]
#The location of your binary file after running "go build app.go"
#app.go is the name of my go main file but yours may differ
command=/work/src/github.com/xdinomode/shrimpcoder/app
autostart=true
autorestart=true
startretries=10
#the user you inserted into supervisor group. I used ubuntu
user=ubuntu 
#directory of where your binary is located 
directory=/work/src/github.com/xdinomode/shrimpcoder/
redirect_stderr=true
stdout_logfile=/var/log/supervisor/app.log # the name of the log file.
stdout_logfile_maxbytes=50MB
stdout_logfile_backups=10
```

Restart supervisor 

```bash
$ sudo service supervisor restart
```

If it doesn't work check the error logs 

```bash
$ sudo tail /var/log/supervisor/supervisord.log 
```

<br>

### Step 5. Start your app using supervisorctl

You'll be managing your app using supervisorctl. 

```bash
# restart your app 
$ supervisorctl reload

# check the status of your app
$ supervisorctl status app
```

If it doesn't work check the logs **/var/log/supervisor/supervisord.log** or run **supervisorctl tail app**

<br>

### Additional info 

You'll need to install go on your production server. 

Set the GOPATH to your workspace. /work in my case.

Copy your local development files to production. I used scp.

Use **go get** to install any missing packages on production.

