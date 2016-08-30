# Make An Example

[![codecov](https://codecov.io/gh/GarthDB/make-an-example/branch/master/graph/badge.svg)](https://codecov.io/gh/GarthDB/make-an-example) [![Inline docs](http://inch-ci.org/github/GarthDB/make-an-example.svg?branch=master)](http://inch-ci.org/github/GarthDB/make-an-example) [![Code Climate](https://codeclimate.com/github/GarthDB/make-an-example/badges/gpa.svg)](https://codeclimate.com/github/GarthDB/make-an-example) [![Issue Count](https://codeclimate.com/github/GarthDB/make-an-example/badges/issue_count.svg)](https://codeclimate.com/github/GarthDB/make-an-example/issues) [![Dependency Status](https://dependencyci.com/github/GarthDB/make-an-example/badge)](https://dependencyci.com/github/GarthDB/make-an-example) [![npm version](https://badge.fury.io/js/make-an-example.svg)](https://badge.fury.io/js/make-an-example)

---

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
