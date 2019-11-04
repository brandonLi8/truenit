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

# [Truenit](https://www.npmjs.com/package/truenit)

<!---------------------------------------------------------------------------->
<!-- Badges -->
[![Build Status](https://travis-ci.org/brandonLi8/truenit.svg?branch=master)](https://travis-ci.org/brandonLi8/truenit)
[![npm version](https://badge.fury.io/js/truenit.svg)](https://badge.fury.io/js/truenit)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FbrandonLi8%2Ftruenit.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FbrandonLi8%2Ftruenit?ref=badge_shield)



<!---------------------------------------------------------------------------->
<!-- Description -->
<blockquote align="left"><b>
  <em>Truenit</em> (<code>/ˈtruːnɪt/</code>) is a lightweight, easy-to-use, dependency-free Javascript unit testing library with a simple, yet powerful API.</b>
</blockquote>



<!---------------------------------------------------------------------------->
<!-- Purposes -->
## When should I use Truenit?

* You want to execute your tests locally during development with a CLI (command line interface).
* You want to execute your tests on every save on a continuous integration server.
* You want to use [RequireJS](https://requirejs.org/) or [Node](https://nodejs.org/en/) or anything else for your source files.

## Installation
**`truenit`** is available on [npm](https://www.npmjs.com/package/truenit). To install it and its dependencies, run:
```bash
$ npm install truenit --save-dev
```


<!---------------------------------------------------------------------------->
<!-- Normal Usage -->
## Usage
#### 1. Import the library in your test file:
```javascript
const truenit = require( 'truenit' );
```
#### 2. Register tests with functions that test your test.
```javascript
// Registers a test to be tested later so that the output is aligned.
truenit.registerTest( 'Module1', () => {

  // Do whatever tests here with Module1.
  // Example:
  truenit.notOk( 6 === 5, 'message if it fails' );
  
} );

// Registers a test that should throw an error.
truenit.registerThrowTest( 'Module2', () => {

  // Do whatever tests here with Module2 that throws an error.
  // Example:
  truenit.ok( 6 === 5, 'message if it fails' );
  
} );
```
#### 3. Run the tests and the file.
```
truenit.start();
```

#### 4. Enjoy the output.
```bash
$ npm test

Testing all...

   Testing Module1...     Passed.
   Testing Module2...     Passed.
   Testing Node...        Passed.
   Testing ScreenView...  Passed.
   Testing Property...    Passed.
   Testing OtherClass...  Passed.
   Testing S...           Passed.
   
 All tests passed!
 
$ _
```


<!---------------------------------------------------------------------------->
<!-- Individual Tests -->
## Individual tests
You can also individually test one at a time:
```javascript
// Tests immediately when called, but doesn't align the result with other tests.
truenit.test( 'Module1', () => {

  // Do whatever tests here with Module1.
  // Example:
  truenit.notOk( 6 === 5, 'message if it fails' );
  
} );

// Tests immediately that the function errors.
truenit.throws( 'Module2', () => {

  // Do whatever tests here that should error with Module2.
  // Example:
  truenit.ok( 6 === 5, 'will not be called' );
  
} );

```


<!---------------------------------------------------------------------------->
<!-- Documentation: Quick Links for users and future developers -->
## Documentation
- [API Model](https://github.com/brandonLi8/truenit/blob/master/docs/api-model.md) for a full comprehensive documentation of the **entire** API.
- [Truenit Test File](https://github.com/brandonLi8/truenit/blob/master/tests/test-truenit) for an example.
- [Implementation Notes](https://github.com/brandonLi8/truenit/blob/master/docs/implementation-notes.md) for future developers.
- [New Release Guide](https://github.com/brandonLi8/truenit/blob/master/docs/new-release-guide.md)
- [Code Style Guideline](https://github.com/brandonLi8/truenit/blob/master/docs/code-style-guideline.md)


<!---------------------------------------------------------------------------->
<!-- Contact information. Use <a></a> tags to open the links in a new tab -->
## Get Involved
Contact me via <a href="mailto:brandon.li820@gmail.com" target="_blank"> email</a>.

Help improve **truenit** by creating a <a href="https://github.com/brandonLi8/truenit/issues" target="_blank">New Issue</a>.


<!---------------------------------------------------------------------------->
<!-- Copyright -->
<sub>Copyright © 2019 [Brandon Li](https://brandonwli.com). All Rights Reserved.&nbsp;&nbsp;<b>|</b>&nbsp;&nbsp;See the <a href="https://github.com/brandonLi8/truenit/LICENSE" target="_blank">LICENSE</a></sub>