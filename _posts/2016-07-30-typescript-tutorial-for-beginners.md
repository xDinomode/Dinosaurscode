---
layout: post
title: "TypeScript Tutorial for Beginners"
description: "Learn what TypeScript is and how web developers can use it in their own development. Simple tutorial for beginners."
category: tutorials
---

[TypeScript](https://www.typescriptlang.org/) enables developers to use the latest features of JavaScript by transpiling **.ts** files into older **.js** versions that browsers or Node.js can understand.

<!--more-->

It also makes programming large applications easier to manage because it enforces static typing (variables declared with a type).

### Installing TypeScript

Install globally using [npm](https://nodejs.org/en/):

```bash
$ npm install -g typescript
```

Now that the compiler is installed use it to convert .ts into .js:

```javascript
// main.ts
let firstName: string = "John";

console.log(firstName);
```

```bash
# creates main.js
$ tsc main.ts
$ node main.js
John
```

We used **let** an ECMAScript 2015 feature and it transpiled into var if you take a look at main.js:

```javascript
// main.js
var firstName = "John";
console.log(firstName);
```

### Types

TypeScript enforces type safety either by declaring the type **firstName: string** or if you omit the type it is assigned by TypeScript. 

Try changing it to a number and you'll get a compile time error: 

```javascript
// main.ts
let firstName: string = "John";
firstName = 2;
console.log(firstName);
```

```bash
main.ts(3,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

Make the variable of type **any** to be allowed to change type:

```javascript
// main.ts
let firstName: any = "John";
firstName = 2;
console.log(firstName);
```

### Classes

Variables should not be defined globally to prevent name clashes with other libraries. Classes encapsulate the variables to prevent this.  

TypeScript adds to JavaScript ES6 classes with public, private, and proteced variables. 
 
```javascript
// person.ts
export class Person {
    public firstName: string = "John";
}
```

```javascript
// main.ts
import {Person} from "./person"

let john: Person = new Person();

console.log(john.firstName);
// compile main.ts using tsc
// tsc main.ts
```

### More 

There's so much more to TypeScript and for a full in depth tutorial go [here](https://www.typescriptlang.org/docs/tutorial.html).
