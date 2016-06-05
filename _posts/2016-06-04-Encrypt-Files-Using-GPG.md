---
layout: post
description: "Learn how to encrypt files and folders such images/text files/ etc.. using GPG. "
title: "Encrypt Files Using GPG - How To"
category: How-to
---

### Step 1. [Install GPG](https://www.gnupg.org/download/) 

#### Windows Users:

[Download Gpa4win](https://www.gpg4win.org/download.html) and during the installation make sure to check **GPA** as a component.

![GPA](/images/gpgwindows.png)

### Step 2. Create a public/private key

#### Windows Users:

Open the program GPA and click **keys > New key...**

![New key pub/priv](/images/gpgwindowskey.png)

#### Linux Users: 

```bash
$ gpg --gen-key
```

- Select option **(1) RSA and RSA (default)**

- Set the key size to **4096**

- Set the key to never expire option **0**

- Real name: Enter some name here

- Email address: Enter email here (doesn't have to be real)

- Comment: Just hit enter

- Create a passphrase

After this you'll receive a message that states "We need to generate a lot of random bytes..." 

Simply move your mouse around for a while and or use your computer normally. It will generate the key in a couple of minutes.

### Step 3. Begin Encrypting 

#### Windows Users: 

Simply open up the **Clipboard** and selected **files > *choose a file > encrypt**

#### Linux Users:

Find your key's id 

```bash
$ gpg --list-keys 
```

![gpg id](/images/gpgid.png)

Mine is, for example, pub 4096R/**35624565**

And encrypt any file using: 

```bash
# replace -r #number with your key id
$ gpg -r 35624565 -e encryptme.txt 
```

You'll now have an encrypted file with a file extension of .gpg

![encrypted text](/images/gpgencryptedtext.png)

And to decrypt:

```bash 
# replace -r with your key id
$ gpg -r 35624565 -d encryptme.txt 
```
