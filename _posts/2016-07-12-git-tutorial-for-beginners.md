---
layout: post
title: "Git Tutorial for Beginners"
description: "Learn Git in this simple to follow tutorial for beginners."
category: tutorials
---

Git is a [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control) system that allows users to collaborate on a project without relying on a central server.  

<!--more-->

Anyone can clone the repository (project) and get the entire repo's history. In other words, everyone has a complete backup of the project. 

> Install [Git](https://git-scm.com/) before proceeding

### Demystifying Github 

We'll create our own central repository where anyone can push/pull/clone from.

Create 3 folders named **a**, **b**, **c**:

```bash
$ mkdir a b c
```

```
|-- a
|-- b
|-- c
```

**a** is where the developers push their work to (represents [Github](https://github.com/))

**b** and **c** represent two different developers working on the project

<br>

**cd** into **a** and initialize it as a bare repo (sharing repo like Github):

```bash
$ cd a 
$ git init --bare
```

Now the developers can push their code here.

<br>

Clone the repo into **b** and **c**:

```bash
$ cd b
$ git clone ../a .
```

```bash
$ cd c 
$ git clone ../a .
```

<br>

Inside of **b** create a new file and push it to the central server (a):

```bash
# Creates a new file named hello.txt
$ echo "hello world" >> hello.txt
```

Before pushing the new file, Git requires you to take a snapshot of your changes by "committing" with a message of your changes.

Git also needs to know what changes to commit by adding the file to the "staging" area:

```bash
# Adds the file to the staging area
$ git add hello.txt

# Commits the changes in the staging area
# With a message for other developers to know what changed
$ git commit -m "Added a new file"
```

Now we can push our changes to the central server (a): 

```bash
# origin is an alias for the full URL of /a 
# master the current branch you're working on
$ git push origin master
```

Branches in Git allow developers to modify the code without overriding the original project.  

Git by default creates a master branch, but you can make more and merge (combine) the changes with the master branch later on.

<br>

The **c** developer needs to pull the latest changes made by **b**:

```bash
# fetches the new changes and merges them with your own code
$ git pull 
```

Now c has the file added by b "hello.txt"

<br>

And that's the basics of Git. There are many more commands that you should learn such as undoing a commit or removing a file from the staging area so I recommend continuing [here](https://git-scm.com/documentation).

Thanks for reading!
