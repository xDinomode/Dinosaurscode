---
layout: post
title: "React.js Tutorial for Beginners"
description: "Learn React.js with this simple tutorial aimed at beginners."
category: tutorials
---

Learn the basics of React.js with code examples. Aimed at beginners or anyone that's interested in learning about React. 

<!--more-->

### Step 1: Get the required modules

React.js requires three modules to work

* [react](https://fb.me/react-15.1.0.js") 
* [react-dom](https://fb.me/react-dom-15.1.0.js)
* [babel](https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.js)  

Create **index.html**: 

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello React</title>
	<!--React-->
        <script src="https://fb.me/react-15.1.0.js"></script>
	<!--React-dom-->
        <script src="https://fb.me/react-dom-15.1.0.js"></script>
	<!--Babel-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/  browser.js"></script>
    </head>

    <body>

    </body>
</html>
```

Add a script inside body 

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello React</title>
        <script src="https://fb.me/react-15.1.0.js"></script>
        <script src="https://fb.me/react-dom-15.1.0.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/  browser.js"></script>
    </head>

    <body>
        <script type="text/babel">
            // Code in here
        </script>
    </body>
</html>
```

### Step 2: Add Components

[Components](https://facebook.github.io/react/docs/component-api.html) are parts of your web app. A login system can be broken down into one root component with several child components.

![React Components](/images/reactcomponents.png)

This is how components are created in React 

```javascript
var MyComponent = React.createClass({
	render: function(){
		return <h1>Hello World</h1>
	}
});
```

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello React</title>
        <script src="https://fb.me/react-15.1.0.js"></script>
        <script src="https://fb.me/react-dom-15.1.0.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.js"></script>
    </head>

    <body>
        <!--Components will be rendered in this div-->
        <div id="box"></div>

        <script type="text/babel">
            // Create a root component
            var MyComponent = React.createClass({
                render: function() {
                    return <h1>A root component.</h1>    
                } 
            })
            
            // Render the component into the DOM with id of box
            ReactDOM.render(<MyComponent />, document.getElementById("box"))    
        </script>
    </body>
</html>
```

Components have values that are instantiated in the **getInitialState** function. 

```javascript
var MyComponent = React.createClass({
	// Instantiates the values
	getInitialState: function(){
		return {
			username: "Dino"
		}
	},
	render: function(){
		// Insert the value using this.state 
		return <h1>Hello { this.state.username }</h1>
	}
});

```

Root components can have several child components. Each one with its own value. 

```javascript
var MyComponent = React.createClass({
	// Instantiates the values
	getInitialState: function(){
		return {
			username: "Dino"
		}
	},
	render: function(){
		// Insert the value using this.state 
		return (
			// Rendering more that one component
			// Requires a div 
			<div>
			<h1>Hello { this.state.username }</h1>
			<MyChildComponent />
			</div>
		)
	}
});
var MyChildComponent = React.createClass({
	// Instantiates the values
	getInitialState: function(){
		return {
			button: "Sign up"
		}
	},
	render: function(){
		// Insert the value using this.state 
		return <input type="button" value={ this.state.button } />
	}
});

```

![Child Component](/images/childcomponent.png)

Components can pass values to their children using properties.

```javascript
var MyComponent = React.createClass({
	getInitialState: function(){
		return {
			username: "Dino"
		}
	},
	render: function(){
		return (
			<div>
			<h1>Hello { this.state.username }</h1>
			// Pass a value using a property
			<MyChildComponent anyName={ this.state.username }/>
			</div>
		)
	}
});
var MyChildComponent = React.createClass({
	getInitialState: function(){
		return {
			button: "Sign up"
		}
	},
	render: function(){
		// Get the value using this.props
		return <input type="button" value={ this.props.anyName } />
	}
});

```

And that's the basics of React.js. For more info I highly recommend continuing with the [offical docs](https://facebook.github.io/react/docs/getting-started.html)

Thanks for reading!
