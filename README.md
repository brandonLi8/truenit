<!-- Copyright © 2019 Brandon Li. All rights reserved. -->

<!--===========================================================================
#
# IMPORTANT: This file was generated by `grunt generate-readme`. This is meant
#            to be a general template, and CAN/SHOULD be modified to suite
#            your repository.
#
# IMPORTANT: `grunt generate-readme` is a custom command (Found
#            https://github.com/brandonLi8/grunt-config/Gruntfile.js). Your 
#            repository's Gruntfile must extend to this Gruntfile to run the 
#            command.
#
# IMPORTANT: Your package.json determines the content of this file. See
#            `../grunt-commands/generate.js` for documentation on setup.
# 
# @author Brandon Li brandon.li820@gmail.com
#
#===========================================================================-->

# [Truenit](https://github.com/brandonLi8/truenit)

[![Build Status](https://travis-ci.org/brandonLi8/truenit.svg?branch=master)](https://travis-ci.org/brandonLi8/truenit)
[![npm version](https://badge.fury.io/js/truenit.svg)](https://badge.fury.io/js/truenit)

<blockquote align="left">
  <em>Truenit</em> (<code>/ˈtruːnɪt/</code>) is a lightweight, easy-to-use, dependency-free Javascript unit testing library with a simple, yet powerful API.<br>
</blockquote>


## When should I use Truenit?

* You want to execute your tests locally during development.
* You want to execute your tests on every save on a continuous integration server.
* You love your CLI and a pretty output
* You want to use [RequireJS](https://requirejs.org/) or [Node](https://nodejs.org/en/) or anything for your source files.

## Getting started
(1) `truenit` is available on [npm](https://www.npmjs.com/package/truenit). To install it and its dependencies, type:
```bash
$ npm install truenit --save-dev
```

### Usage
(1) Import the library in your test file:
```javascript
const truenit = require( 'truenit' );
```
(2) Register tests with functions that test your test.
```javascript

truenit.registerTest( 'Module1', () => {
  truenit.notOk( 6 === 5, 'message if it fails' ); // customize your test!
} );

truenit.registerThrowTest( 'Module2', () => { // tests that the function throws an error!
  truenit.ok( 6 === 5, 'message if it fails' );
} );
```
(3) Run the tests and the file.
```
truenit.start();
```

(4) Enjoy the output.
![image](https://user-images.githubusercontent.com/42391580/68091911-d8cb2780-fe42-11e9-898f-8889253019e2.png)
![image](https://user-images.githubusercontent.com/42391580/68091926-ff895e00-fe42-11e9-96e2-87b5c35e90e4.png)


## Individual tests
You can also individually test one at a time:
```
truenit.test( 'Module1', () => {
  truenit.notOk( 6 === 5, 'message if it fails' ); // customize your test!
} );
```

### Get Involved

Contact me via <a href="mailto:brandon.li820@gmail.com" target="_blank"> email</a>.

Help improve the app by creating a <a href="https://github.com/brandonLi8/truenit/issues" target="_blank">New Issue</a>.

#### License
See the <a href="https://github.com/brandonLi8/truenit/LICENSE" target="_blank">LICENSE</a>

© 2019 [Brandon Li](https://brandonwli.com)