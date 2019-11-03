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
   *   - Contain an option to colorize the output of the message using a template (which defaults to true).
   *     The user can specify the color based on a number code (see below).
   *
   * @param {*} message
   * @param {number} [color] - the code for the color. See below:
   *
   *   ## Normal Codes   | ## Fg Codes       |  ## Bg Codes
   *     0 - Reset       |   30 - FgBlack    |   40 - BgBlack
   *     1 - Bright      |   31 - FgRed      |   41 - BgRed
   *     2 - Di          |   32 - FgGreen    |   42 - BgGreen
   *     3 - Underscore  |   33 - FgYellow   |   43 - BgYellow
   *     4 - Blink       |   34 - FgBlue     |   44 - BgBlue
   *     5 - Reverse     |   35 - FgMagenta  |   45 - BgMagenta
   *     6 - Hidden      |   36 - FgCyan     |   46 - BgCyan
   *                     |   37 - FgWhite    |   47 - BgWhite
   *
   * @param {boolean} [useTemplate] - if true, will ignore the color code and print exactly what the message contains.
   */
  function print( message, color = 0, useTemplate = true ) {

    // Attempt type coercion of message.
    assert( message !== null && message !== undefined, `invalid message: ${ message }` );
    assert( typeof color === 'number', `invalid color: ${ color }` );
    assert( typeof useTemplate === 'boolean', `invalid useTemplate: ${ useTemplate }` );

    // Determine which message type to use.
    const printMessage = ( useTemplate === true ) ? `\x1b[${ color }m${ message }\x1b[0m` : `${ message }`;

    // Use process.stdout.write to allow for same line printing
    process.stdout.write( printMessage );
  }

  /**
   * See print() (above). Prints but but on a new line.
   *
   * @param {*} message
   * @param {number} [color] - see print() (above)
   * @param {boolean} [useTemplate] - see print() (above)
   */
  function println( message, color, useTemplate ) {
    print( `${ message }\n`, color, useTemplate );
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
    try { task(); }
    catch( error ) {
      // Catch any errors while executing task and reformat the error message.
      print( `${error}`, 31 );
      process.exit( 1 );
    }
  };

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

    assert( typeof string === 'string', `invalid string: ${string}` );
    assert( typeof numberOfSpaces === 'number' && numberOfSpaces >= 0, `invalid numberOfSpaces: ${numberOfSpaces}` );

    return `${ ' '.repeat( numberOfSpaces ) }${ string }`;
  }

  //========================================================================================
  // Export the utilities as a object (no instance is needed)
  //========================================================================================
  module.exports = { assert, print, println, wrap, preSpace };
} )();