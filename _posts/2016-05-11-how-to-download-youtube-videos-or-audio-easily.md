---
layout: post
description: "Learn how to download Youtube videos or audio easily from the command line. Using youtube-dl you can download the best quality youtube videos easily."
title: "Learn To Download Youtube Videos/Audio Easily"
category: tips
---

Using [youtube-dl](https://rg3.github.io/youtube-dl/) we can easily download Youtube videos or just the audio.

### 1. Install [youtube-dl](https://rg3.github.io/youtube-dl/)

Go to the Github repo and scroll down until you see Installation

Windows users simply click "download a .exe file"

Add the youtube-dl.exe to your PATH or simply run the commands from where it's located

![install youtube-dl](/images/youtubedlinstall.png)

### 2. Download the video from the command line/terminal

First grab the Youtube URL

![youtube url](/images/youtubedldownload.PNG)

youtube-dl followed with the url to download the full video

```shell
$ youtube-dl youtubeurlhere
```

![youtube cmd](/images/youtubedlcmd.PNG)

![download](/images/youtubdownload.PNG)

### 3. Or custom download it

You can view the different format options to download a smaller file or only audio

using the -F option will output different formats. Select one using the -f followed by the format code

```shell
$ youtube-dl -F youtubeurlhere
```

![format youtube](/images/youtubeformat.PNG)

once you find a format you want simply

```shell
$ youtube-dl -f formatcode youtubeurlhere
```

![new format](/images/youtubedlformat.PNG)
