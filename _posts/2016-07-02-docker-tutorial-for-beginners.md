---
layout: post
title: "Docker Tutorial for Beginners"
description: "A quick and simple docker tutorial for beginners. Learn the basics of creating your own image."
category: tutorials
---

Docker's core concepts are <i>containers</i> and <i>images</i>.

<!--more-->

**Images** are the software inside your container.

**Containers** are a running instance of an image.

> You should have [docker](https://docs.docker.com/engine/installation/#installation) installed and running before proceeding 

### How to get images 

You can pull (download) or push (upload) images to and from [Docker Hub](https://hub.docker.com/explore)

![Docker Hub](/images/dockerhub.png)

You can also use your terminal to search for images instead. 

```bash
docker search <image name>
```

![Docker Search](/images/dockersearch.png)

Let's get the Debian image since it's ~500MB smaller than Ubuntu.

```bash
docker pull debian 
```

To view all your images run 

```bash
docker images
```

and you will see the Debian image you just pulled.

![Docker Images](/images/dockerlistimages.png)

### How to start containers 

Containers are built from images using the run command. 

```bash
docker run <image-id>
```

The image's ID was listed in the previous command. In my case 

```bash
docker run 1b088884749b
```

You wont receive output because the container ran and stopped. But it was created. 

```bash
docker ps -a
```

![Docker Container](/images/dockercontainer.png)

### How to make your own image

Creating your own image allows you to share your project with others. 

Let's create our own image built on top of the base image (Debian) and install vim on it.

The following command allows us to run commands within the image.  

```bash
docker run -it <image-id> /bin/bash
```

After which you'll be inside the container 

```bash
root@<container-id>:/# 
```

Update the package manager and install Vim

```bash
apt-get update -y && apt-get install -y vim
```

You can now exit the container 

```bash
exit
```

In order to convert the container into an image you must commit the changes 

```bash
docker commit <container-id> <your-images-name>
```

Remember to get the container id by running docker ps -a. The one you just exited out of will be the first one on top.

Running docker images will list your images including the new one you created.

![Docker Self Image](/images/dockerselfimage.png)

This image can now be pushed to Docker Hub for others to pull.

<br>

Now that you know the basics, I recommend heading over to the [docs](https://docs.docker.com/) for more info.

Thanks for reading and good luck!
