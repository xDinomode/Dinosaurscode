---
layout: post
title: "Selenium 2 Using Node.JS"
description: "Selenium 2 tutorial using Node.js to automate browser actions during application development."
category: tutorials
---

Selenium 2 is used primarily for testing web applications by automating the web browser's actions. 

<!--more-->

For instance, forms must be filled in and submitted constantly. Selenium 2 can automate the browser to do it instead.  

### Installation 

Install [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver) using npm:

```bash
$ npm install selenium-webdriver
```

You must download (link above) a driver for the browser and add it to the PATH. This tutorial uses Firefox which should not require a driver unless you have the latest version.

The latest version of Firefox (47), as of this writing, requires [marionette](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver): 

> [Download](https://github.com/mozilla/geckodriver/releases) and extract the geckodriver binary; rename it to **wires** and add it to your PATH.

### Examples

Open a webpage: 

```javascript
var webdriver = require('selenium-webdriver');
// these 3 lines are required with firefox 47+ 
var Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
var capabilities = Capabilities.firefox();
capabilities.set('marionette', true);

var driver = new webdriver.Builder().withCapabilities(capabilities).build();

driver.get('https://youtube.com');
```

Input text into a search form and click submit: 

```javascript
var webdriver = require('selenium-webdriver');
// these 3 lines are required with firefox 47+ 
var Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
var capabilities = Capabilities.firefox();
capabilities.set('marionette', true);

var driver = new webdriver.Builder().withCapabilities(capabilities).build();

driver.get('https://youtube.com');

driver.findElement(webdriver.By.id('masthead-search-term')).sendKeys('cats');
driver.findElement(webdriver.By.id('search-btn')).click();
```

![Selenium 2 Youtube Search](/images/selenium2.gif)

