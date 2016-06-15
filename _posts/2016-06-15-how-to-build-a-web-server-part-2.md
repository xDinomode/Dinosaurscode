---
layout: post
title: "How to Build a Web Server Part 2"
description: "This is part two of how to build a web server. In this part we'll set up SSH and the basic security for any VPS."
category: tips
---

In this tutorial we'll be creating SSH keys to login to the VPS.

<!--more-->


Find your password and IP in your email's inbox after creating a droplet:

![Droplet email two](/images/dropletemail2.png)

Write down the **IP Address**, **Username**, and **Password**  

<br>

### CREATE SSH KEYS 

Skip this part if you just want to use the password provided by digitalocean (highly unrecommended).

Windows users should use Putty for SSH and Puttygen to create your keys. Follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users)

<br>

#### Create the RSA Keys 

```bash
ssh-keygen -t rsa -b 4096 
```

When you're prompted to "Enter a file which to save the key," press Enter. This accepts the default file location.

Also a password is optional but not required.

<br>

#### Copy the Puplic Key 

First login to your VPS using the password provided in the email and you'll be asked to change it. Do that.

```bash
ssh root@yourVPSip
```

Once your password is changed type **exit**

<br>

Run this command to copy your key to the VPS

```bash
ssh-copy-id root@yourVPSip
```

Disable password authentication for security reasons.

```bash
ssh root@yourVPSip
```

Edit this file

```bash
sudo nano /etc/ssh/sshd_config
```

Make sure this file has these two lines inside

```bash
PermitRootLogin without-password
PasswordAuthentication no
```

Restart ssh 

```bash
sudo service ssh restart
```

<br>

### CREATE A FIREWALL

We'll allow port 80 for HTTP requests and port 22 for SSH.

By default there will be no rules set on your firewall but just for good measure run these commands

```bash
sudo iptables -P INPUT ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -F
sudo iptables -L
```

You should see this outputed 

```bash
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination  
```

Now let's add rules 

We put this rule first because we want to make sure the connections already being used are matched, accepted, and pulled out of the chain before reaching any DROP rules.


```bash
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
```

Allow SSH

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

Allow HTTP

```bash
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
```

Allow Loopback

```bash
sudo iptables -I INPUT 1 -i lo -j ACCEPT
```

Lastly block any connections that don't match 

```bash
sudo iptables -P INPUT DROP
```

In order to save these rules even on reboot we need iptables-persistent

```bash
sudo apt-get update
sudo apt-get install iptables-persistent
```

You'll be asked if you want to save the current rules. Yes Enter

<br>

### INSTALL FAIL2BAN

fail2ban will ban anyone attempting to brute force the SSH login. Install it: 


```bash
sudo apt-get install fail2ban -y
```

Configure fail2ban 

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Open jail.local and apply these rules

```bash
sudo nano /etc/fail2ban/jail.local
```

There are lots of bots that will attempt to brute force so increase the ban time

```bash
bantime = 3600
```

Save the file and restart fail2ban

```bash
sudo service fail2ban restart
```

### DONE!

Your VPS is ready to install a web server such as Nginx or Apache. You may stop here or follow the next tutorial that will install Nginx and serve a simple NodeJS web app.

<br>

In the [next tutorial ]({% post_url 2016-06-15-how-to-build-a-web-server-part-3 %}) we'll build a NodeJS web app.














