---
layout: post
title: "Send Email Using Python 3.4"
description: "Learn how to send email with Python. Smtp Gmail specifically."
category: python
---

Today I'll be demonstrating how to send email using python. 

The only requirements are a Gmail account and Python 3.4.

# 1. Copy paste this into a .py file 

Replace fromaddr with your email, toaddr with the recipient's email, and enter your password for your gmail in "YOUR_PASSWORD_HERE"

```python
import smtplib

fromaddr = "YOUR_EMAIL_HERE@gmail.com"
toaddr = "RECIPIENT_EMAIL@gmail.com"

msg = "Hello this is an an automted script, please ignore"

server = smtplib.SMTP("smtp.gmail.com:587")
server.starttls()
server.login(fromaddr, "YOUR_PASSWORD_HERE")
server.sendmail(fromaddr, toaddr, msg)
```

# 2. By default Gmail wont let your program send email

So login and go to [https://www.google.com/settings/security/lesssecureapps](https://www.google.com/settings/security/lesssecureapps)

And click "Turn on" 

![gmail allow](/images/gmailpython.png)

# 3. Run it

Run it from the command line 

```python
python sendemail.py
```
