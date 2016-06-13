---
layout: post
title: "How to Build a Website from Scratch"
description: "Here are the following steps to build a website from scratch. Simple and easy step by step tutorial on how to build a website from scratch."
category: tips
---

Websites are incredibly easy to set up and manage. During this tutorial I'll show you how to set up your own server with WordPress.  

With **two months free hosting**
<!--more-->


<br>

### Step one: Domain Name

A domain name identifies your website on the internet. 

For example: **example.com**

The best and cheapest domain name provider currently is <a href="https://www.namecheap.com/?aff=101622
"
 rel="nofollow">Namecheap.com</a>

To regiester a domain name with them first <a href="https://www.namecheap.com/myaccount/signup.aspx?aff=101622">sign-up</a>

Once signed in simply click **Domains** >> **Registration**

![Namecheap register domain name](/images/namecheap.png)

Enter the domain name you want for your website in the search bar. 

![Namecheap domain name](/images/namecheapdomain.png)

Most users will want to a .com domain name so select the first one and check out.

![Namecheap buy](/images/namecheapbuy.png)

<br>

### Step two: Hosting

The best and cheapest option is a VPS from <a href="https://m.do.co/c/071f9b7064b3" rel="nofollow">DigitalOcean.com</a>

They charge $5.00 per month but using <a href="https://m.do.co/c/071f9b7064b3">this link</a> you will get $10.00 credit.

**In other words two months free hosting.**

After creating your digitalocean account follow these steps to get set up with wordpress.

<br>

#### 1. Create a New Droplet (VPS)

**Droplets** >> **Create Droplet** 

![Droplet creat button](/images/dropletcreate.png)

#### 2. Select One-click Apps 

By default you should be in the Distributions tab. Click **One-click Apps**

And select **LAMP on 14.04**

![LAMP stack](/images/LAMP.png)

Scroll down and choose a size. I'd go with the $5.00/mo 

![LAMP size](/images/LAMPsize.png)

The rest should be left as default but these are the configurations I'd recommend

* **"Choose a datacenter region":** Pick where you want your VPS to be located. I'd go with **New York** 

* **"Select additional options":** Leave them all unchecked 

* **"Add your SSH keys":** SSH keys are the safest way to login to your VPS but for now we'll use a password. Leave it as default. 

* **"How many Droplets?":** 1

* **"Choose a hostname":** mydroplet

Click **Create**

<br>

### Step three: Installing Wordpress

You'll be given the IP of your server. For example:

![My Droplet](/images/mydroplet.png)

And if you copy/paste it into your web browser:

![My Droplet Apache](/images/mydropletapache.png)

Now let's access our server and point apache to WordPress instead of the default page.

<br>

#### Step 1. Get Your Server's password 

Login to the email you signed up with digital ocean. 

You'll find a new email with your password information.

![Droplet email](/images/dropletemail.png)

![Droplet email two](/images/dropletemail2.png)

<br>

#### Step 2. SSH into your VPS

SSH allows you to to connect to your VPS safely. No data to or from can be tampered with or read.

Linux/Mac users already have an SSH client 

Windows users can use <a href="https://www.digitalocean.com/community/tutorials/how-to-log-into-your-droplet-with-putty-for-windows-users">putty</a>

```bash
$ ssh root@yourvpsip 
```

You'll be prompted for your password. Use the one sent to you in the email.

Once you successfully SSH you'll be outputed a message like this:

```bash
You are required to change your password immediately (root enforced)
-------------------------------------------------------------------------------------
Thank you for using DigitalOcean's LAMP Application.
Your web root is located at /var/www/html and can be seen from http://yourvpsip/
The details of your PHP installation can be seen at http://yourvpsip/info.php
Your MySQL root user's password is password
You are encouraged to run mysql_secure_installation to ready your server for production.
-------------------------------------------------------------------------------------
You can find more information on using this image here: http://do.co/lampapp 
--------
```

- Take note of where your web root is located as this is where we'll install Wordpress. For me it's **/var/www/html** 

- And also take note of MySQL root user's password. 

Lastly you'll be asked to change your password. So do that and DONT loose it.

<br>

#### Step 3. Run mysql_secure_installation

This program secures your MySQL installation.

But first update your machine 

```bash
$ sudo apt-get update && sudo apt-get upgrade -y
```

<br>

Then run mysql_secure_installation

```bash
$ mysql_secure_installation
```

<br>

Enter MySQL's root password (in the output when you ssh)

Then type **Y** or **n** for each question as below.

* Change the root password? [Y/n] n
* Remove anonymous users? [Y/n] Y 
* Disallow root login remotely? [Y/n] y
* Remove test database and access to it? [Y/n] Y
* Reload privilege tables now? [Y/n] Y

<br>

#### Step 4. Install Wordpress 

Download and Decompress WordPress 


```bash
$ cd ~
$ wget http://wordpress.org/latest.tar.gz
$ tar xzvf latest.tar.gz
```

<br>

#### Step 5. Create the Database

Log into MySQL with the root password provided in the ouput when you SSH'd inot your VPS  

```bash
$ mysql -u root -p
```

Create the database 
 
```bash
> CREATE DATABASE wordpress;
```

Create a new user that gets access to the wordpress database

Replace password with your own strong password

```bash
> CREATE USER wordpressuser@localhost IDENTIFIED BY 'password'
```

Give wordpressuser access to the database

```bash
> GRANT ALL PRIVILEGES ON wordpress.* TO wordpressuser@localhost;
```

Commit the changes and exit 

```bash
> FLUSH PRIVILEGES;
> exit
```

<br>

#### Step 6. Configure Wordpress

Copy the file wp-config-sample.php into wp-config.php and open it for editing.

```bash
$ cd ~/wordpress
$ cp wp-config-sample.php wp-config.php
$ nano wp-config.php
```

<br>

Fill in the values of these parameters with the information for the database you created. It should look like this:


```bash
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpressuser');

/** MySQL database password */
define('DB_PASSWORD', 'password');
```

Save and close the file

<br>

#### Step 7. Copy Files to the Root

```bash
$ sudo rsync -avP ~/wordpress/ /var/www/html/
$ cd /var/www/html
```

Change the ownership of the files for security.

```bash
$ sudo chown -R www-data:www-data *
```

Create a directory for your uploads such as images

```bash
$ mkdir /var/www/html/wp-content/uploads
```

<br>

#### Step 8. Delete index.html 

Delete the file index.html inside /var/www/html

```bash
$ rm index.html 
```

And restart apache 

```bash
$ sudo service apache2 restart
```

Type in your IP into the url and set up wordpress 

![WordPress Setup](/images/wordpresssetup.png)

Your website now has wordpres installed and running!

![WordPress Installed](/images/wordpressinstalled.png)

<br>

### Last Step: Point your domain name to the ip

Follow [this simple tutorial](https://www.namecheap.com/support/knowledgebase/article.aspx/1162/46/how-can-i-point-my-domain-name-to-my-home-servers-ip) from namecheap's website

Or

Select **Domain List** from the left sidebar and click on the **Manage** button next to your domain: 

![Namecheap Domain List](https://namecheap.simplekb.com//SiteContents/2-7C22D5236A4543EB827F3BD8936E153E/media/nctutmanage.png)

Navigate to the **Advanced DNS** tab at the top of the page: 

![Namecheap Advanced DNS](https://namecheap.simplekb.com//SiteContents/2-7C22D5236A4543EB827F3BD8936E153E/media/advanced_dns.png)

Find the Host records section and click on the **Add New Record** button 

But first click the trash can icon next to the records there by default

![Namecheap Add New Record](https://namecheap.simplekb.com//SiteContents/2-7C22D5236A4543EB827F3BD8936E153E/media/addnewrecord.png)

Select **A Record** for Type and enter the Host you would like to point to an IP address: 

For example:

Host: **@** will point to example.com (no www)

Host: **www** wil point to www.example.com

Host: **blog** will point to blog.example.com


![Name cheap a record](https://namecheap.simplekb.com//SiteContents/2-7C22D5236A4543EB827F3BD8936E153E/media/pointtest.png)

It typically takes 30 minutes for dns servers to refresh their cache. So in thirty minutes your website will be available at example.com! 

### Thank You For Reading and Good Luck With Your Website!
