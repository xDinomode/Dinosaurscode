---
layout: post
title: "Git Tutorial for Beginners"
description: "Learn Git in this simple to follow tutorial for beginners."
category: tutorials
---

Git is a [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control) system that allows users to collaborate on a project without relying on a central server.  

<!--more-->

Anyone can clone a repository (project) and get the entire repo's history. In other words, everyone has a complete backup of the project. 

> Install [Git](https://git-scm.com/) before proceeding

### Demystifying Github 

We'll mimic an entire Git workflow using only three folders.   

**github** will be the folder to push/pull/clone from just like the real Github  

**dev1** represents a developer 

**dev2** represents another developer

Create the 3 folders:

```bash
$ mkdir github dev1 dev2
```

```
|-- github 
|-- dev1
|-- dev2
```

<br>

**cd** into **github** and initialize it as a [bare repo](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server) (sharing repo like Github):

```bash
$ cd github 
$ git init --bare
```

A bare repository sits on a server and allows developers to push/pull to it. This is the equivalent to the real Github.

<br>

**dev1** and **dev2** both want to work on the same project so they both clone the bare repository: 

```bash
$ cd dev1 
$ git clone ../github .
```

```bash
$ cd dev2 
$ git clone ../github .
```

<br>

Inside of **dev1** create a new file and push it to the central server (github):

```bash
# dev1 creates a new file named hello.txt
$ echo "hello world" >> hello.txt
```

Before pushing the new file, Git requires you to take a snapshot of your changes by "committing" with a message of your changes.

Git also needs to know what changes to commit by adding the file to the "staging" area:

```bash
# Adds the new file to the staging area
$ git add hello.txt

# Commits the changes in the staging area
# with a message for other developers to know what changed
$ git commit -m "Added a new file"
```

Now we can push our changes to the central server (github): 

```bash
# origin is an alias for the URL of /github 
# master is the current branch you're working on
$ git push origin master
```

[Branches](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches) in Git allow developers to modify the existing code without making changes to the original. So in case you modify the project and later on decide you don't want those changes you can simply delete the branch.  

Git by default creates a master branch and it's wise not to work in it, but instead create a new branch and merge it with the master later on.

<br>

**dev2** needs to pull the latest changes made by **dev1**:

```bash
# fetches the new changes and merges them with your own code
$ git pull 
```

Now dev2 has the file added by dev1 "hello.txt"

<br>

And that's the basics of Git. There are many more commands that you should learn such as undoing a commit or removing a file from the staging area so I recommend continuing [here](https://git-scm.com/documentation).

Thanks for reading!
