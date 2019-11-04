// Copyright © 2019 Brandon Li. All rights reserved.

/**
 * Utilities for the truenit source code (see `./truenit.js`). All of these utilities are PRIVATE facing.
 *
 * This module should be loaded as a object with utility classes (no instance is necessary).
 *
 * @author Brandon Li <brandon.li820@gmail.com>
 */

( () => {
  'use strict';

  //----------------------------------------------------------------------------------------
  /**
   * A generic assertion function.
   *
   * NOTE: This uses conventional error handling. For the purposes of this module, all assertions should be
   *       wrapped (see wrap( task )) in a try-catch hierarchy then reprinted into the terminal if caught.
   *
   * @param {boolean} predicate - can be truthy
   * @param {string} [message]
   */
  function assert( predicate, message ) {
    if ( !predicate ) {
      // Use the default message if a message isn't provided
      throw new Error( message || 'Assertion failed.' );
    }
  }

  //----------------------------------------------------------------------------------------
  /**
   * Alternative to `console.log` for printing into the terminal. Instead, print will:
   *   - Not assume each message is on a newline. The user must specify if there is a newline via `\n`
   *   - Contain an option to colorize the output of the message and stylize. The user can specify the colors based on
   *     number codes (see below).
   *
   * @param {*} message
   * @param {...number} [colors] - the codes for the colors and styles (can pass multiple).
   *
   *   ## Styles         | ## Foreground     |  ## Background
   *     0 - Reset       |   30 - FgBlack    |   40 - BgBlack
   *     1 - Bright      |   31 - FgRed      |   41 - BgRed
   *     2 - Dim         |   32 - FgGreen    |   42 - BgGreen
   *     3 - Underscore  |   33 - FgYellow   |   43 - BgYellow
   *     4 - Blink       |   34 - FgBlue     |   44 - BgBlue
   *     5 - Reverse     |   35 - FgMagenta  |   45 - BgMagenta
   *     6 - Hidden      |   36 - FgCyan     |   46 - BgCyan
   *                     |   37 - FgWhite    |   47 - BgWhite
   *
   * NOTE: You can pass in multiple color codes via spread notation.
   *       For instance, `print( 'hello world', 1, 31, 41 )` will print the bright and red with a red background.
   *
   * NOTE: If no color codes are passed in, it prints normally with color code 0.
   */
  function print( message, ...colors ) {
    // Attempt type coercion of message.
    assert( message !== null && message !== undefined, `invalid message: ${ message }` );
    assert( Array.isArray( colors ) && colors.every( code => typeof code === 'number' ),
      `invalid colors: ${ colors }` );

    //----------------------------------------------------------------------------------------
    // Format the message via ANSI escape codes.
    let printMessage = '';
    colors.forEach( code => {
      printMessage += `\x1b[${ code }m`;
    } );
    printMessage += `${ message }\x1b[0m`;

    // Use process.stdout.write to allow for same line printing
    process.stdout.write( printMessage );
  }

  /**
   * See print() (above). Prints but but on a new line.
   *
   * @param {*} message
   * @param {...number} [colors] - see print() (above).
   */
  function println( message, ...colors ) {
    print( `\n${ message }`, ...colors );
  }

  //----------------------------------------------------------------------------------------
  /**
   * Alternative error handling methodology by wrapping a task (function) in a try-catch hierarchy. Caught errors
   * will simply be printed (see print()) then `process.exit( 1 );` will be called to end the process.
   *
   * This is used to improve Node's ugly error handling.
   *
   * @param {function} task - task to be wrapped and executed
   */
  function wrap( task ) {
    try {
      task();
    }
    catch( error ) {
      // Catch any errors while executing task and reformat the error message.
      print( `${ error }`, 31 );
      process.exit( 1 );
    }
  }

  //----------------------------------------------------------------------------------------
  /**
   * Convenience function that wraps a test, but allows for custom behavior before and after the task.
   * Also allows for custom behavior if a failure occurs.
   *
   * @param {object} config {
   *    tester: {function} - task that tests the test
   *    [before]: {function} - called before the tester
   *    [after]: {function} - called after the tester
   *    [failure]: {number} - number of spaces prepended before the fail stack.
   * }
   */
  function test( config ) {
    wrap( () => {

      assert( !config || Object.getPrototypeOf( config ) === Object.prototype, `invalivd config: ${ config }` );
      assert( typeof config.tester === 'function', `invalid config.tester: ${ config.tester }` );
      assert( !config.before || typeof config.before === 'function', `invalid config.before: ${ config.before }` );
      assert( !config.after || typeof config.after === 'function', `invalid config.after: ${ config.after }` );
      assert( !config.failure || typeof config.failure === 'number', `invalid config.failure: ${ config.failure }` );

      config.before && config.before();

      try {
        config.tester();
      }
      catch( error ) {
        print( preSpace( '', config.failure || 0 ) );
        assert( false, `FAILED \n\n${ error.stack }\n\n` );
      }

      config.after && config.after();
    } );
  }

  //----------------------------------------------------------------------------------------
  /**
   * Reverses a tester such that it expects to throw an error. If no error is thrown while executing tester, the
   * reverseTest will throw an error and vise versa.
   *
   * NOTE: This uses assert to verify the validity of arguments. This should only be called somewhere inside of a
   *       wrapped (see wrap( task )) try-catch hierarchy.
   *
   * @public
   *
   * @param {string} name - the name of the test
   * @param {function} tester
   */
  function reverseTester( name, tester ) {
    assert( typeof name === 'string', `invalid name: ${ name }` );
    assert( typeof tester === 'function', `invalid tester: ${ tester }` );

    return () => {
      try {
        tester();
      }
      catch( error ) {
        return; // do nothing and exit
      }
      // No error happened, which is wrong
      throw new Error( `${ name } test did not throw.` );
    };
  }

  //----------------------------------------------------------------------------------------
  /**
   * Adds a variable amount of spaces before a string. This is a convenience helper function.
   *
   * NOTE: This uses assert to verify the validity of arguments. This should only be called somewhere inside of a
   *       wrapped (see wrap( task )) try-catch hierarchy.
   *
   * @param {string} string
   * @param {number} numberOfSpaces
   */
  function preSpace( string, numberOfSpaces ) {

    assert( typeof string === 'string', `invalid string: ${ string }` );
    assert( typeof numberOfSpaces === 'number' && numberOfSpaces >= 0, `invalid numberOfSpaces: ${ numberOfSpaces }` );

    return `${ ' '.repeat( numberOfSpaces ) }${ string }`;
  }

  //----------------------------------------------------------------------------------------
  /**
   * Convenience function that creates a testing sting that is used throughout the project.
   *
   * NOTE: This uses assert to verify the validity of arguments. This should only be called somewhere inside of a
   *       wrapped (see wrap( task )) try-catch hierarchy.
   *
   * @param {string} name
   * @param {boolean} tab - if true, a tab is inserted before the string.
   */
  function newTestString( name, tab = false ) {
    return `${ tab ? '   ': '' }Testing ${ name }...  `;
  }

  //========================================================================================
  // Export the utilities as a object (no instance is needed)
  //========================================================================================
  module.exports = { assert, print, println, wrap, test, reverseTester, preSpace, newTestString };
} )();