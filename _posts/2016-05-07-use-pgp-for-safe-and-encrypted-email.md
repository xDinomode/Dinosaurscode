---
layout: post
title: "Use PGP For Safe and Encrypted Email"
description: "How to use PGP for safe and encrypted email."
category: tips
---

Encryption is the only way to safely exchange information without worrying about it being tampered with or spied on.

# 1. Install [GPG4Win](https://www.gpg4win.org/)

![gpg4win](/images/gpg4win.png)

### Make sure to check GPA in the installation

![gpg4win gpa](/images/gpg4wingpa.png)

# 2. Start up GPA

![gpa](/images/gpa.png)

Create your public/private key pair **keys > New key...**

![gpanew](/images/gpanew.png)

Enter a name

![gpanewname](/images/gpanewname.png)

Enter an email

![gpganewemail](/images/gpanewemail.png)

Create a backup

![gpgbackup](/images/gpganewcopy.png)

Set a password for your key

![gpgpassword](/images/gpganewpassword.png)

# 3. Share your public key to the world and NEVER share your private key!

Your public key is used to encrypt messages that only your private key can decrypt.

So **export** the key to share it.

![keyexport](/images/gpganewexport.png)

![key](/images/gpganewkey.png)

# 4. Test it out

Hit **clipboard** in the menu

Type anything in and then hit **encrypt**

![clipboard](/images/gpganewclipboard.png)

Your message is now encrypted and can only be decrypted by your private key!

![encrypted](/images/gpganewencrypted.png)

Hit **Decrypt**

### In a real world scenario you'd exchange public keys with someone else and import their key into GPA. Then you'd use their key to encrypt a message to them.

### After which you'd send them the message starting from ----BEGIN PGP MESSAGE---- to ----END PGP MESSAGE----. Doesn't matter if anyone can read this because it's encrypted and only the receiver can decrypt it.
