# Make An Example

A simple helper library for getting function names and parameters used in tests make examples for better documentation.

It is not recommended to keep the library in published code.

## Installation

Maybe install it globally, so you don't have to install it in each project. Don't save it in a project.

```sh
npm install -g make-an-example
```

## Usage

If you had a function like this:

```js
function aFunc(arg1, arg2) {
  return arguments;
}
```

You could use make-an-example like this

```js
import example from 'make-an-example';

function aFunc(arg1, arg2) {
  example(aFunc, arguments);
  return arguments;
}
```

When your function is called in a test like this:

```js
const args = aFunc('value 1', 'value 2', 'extra 1', 'extra 2');
```

`example()` would write this to the console:

```text
---
aFunc
arg1 argument:
value 1
arg2 argument:
value 2
Extra Argument [0]:
extra 1
Extra Argument [1]:
extra 2
```
