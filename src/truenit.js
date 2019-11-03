// Copyright © 2019 Brandon Li. All rights reserved.

/**
 * Source code for this project.
 *
 * @author Brandon Li <brandon.li820@gmail.com>
 */

( () => {
  'use strict';

  class truenit {
    /**
     * Basic method that attempts to execute a tester. Used as a high-level wrapper to start a large
     * section of tests.
     * @public
     *
     * @param {function} tester
     * @param {string} [startMessage]
     * @param {number} [startColor]
     * @param {string} [endMessage]
     * @param {number} [endColor]
     * @param {string} [failedMessage]
     */
    static test( tester, startMessage, startColor, endMessage, endColor, failedMessage ) {
      wrap( () => {
        assert( typeof tester === 'function', `invalid tester: ${tester}` );
        assert( !startMessage || typeof startMessage === 'string', `invalid startMessage: ${startMessage}` );
        assert( !endMessage || typeof endMessage === 'string', `invalid endMessage: ${endMessage}` );
        assert( !failedMessage || typeof failedMessage === 'string', `invalid failedMessage: ${failedMessage}` );

        //----------------------------------------------------------------------------------------
        // Start testing
        log( startMessage ? startMessage : 'starting test...\n', startColor );

        try {
          tester();
        }
        catch( error ) {
          assert( false, failedMessage ? failedMessage : `FAILED \n\n${error.stack}\n\n` );
        }
        log( endMessage ? endMessage : 'Test passed!', endColor );
      } )
    }

    /**
     * Test method wrapper for the start of a project.
     *
     * @param {function} tester
     */
    static start( tester ) {
      truenit.test( () => {
        truenit.modules.forEach( module => {
          truenit.testModule( module.name, module.tester );
        } )
      }, 'Testing all...\n\n', 4, '\nAll tests passed!\n\n', 32 );
    }

    static registerModule( name, tester ) {
      truenit.modules.push( { name, tester } );
    }

    /**
     * Test method wrapper for a module. Should be wrapped inside of truenit.start().
     *
     * @param {string} name - the name of the module
     * @param {function} tester
     */
    static testModule( name, tester ) {
      wrap( () => {
        assert( typeof name === 'string', `invalid name: ${name}` );
      } );

      const prefix = `Testing ${name}...`;

      let maxPrefixLength = prefix.length;
      truenit.modules.forEach( module => {
        if ( `Testing ${module.name}...  `.length > maxPrefixLength ) {
          maxPrefixLength = `Testing ${module.name}...  `.length;
        }
      } );

      const longestLength = maxPrefixLength + 'passed'.length;
      const numberOfSpaces = longestLength - prefix.length;
      const passedString = new Array( numberOfSpaces ).join( ' ' ) + 'passed\n';

      truenit.latestModulePrefix = prefix;
      truenit.maxLength = longestLength;

      truenit.test( tester, prefix, 2, passedString, 0 );
    }

    /**
     * Tests that a predicate is truthy.
     * Should be wrapped inside of a tester.
     * @public
     *
     * @param {boolean} predicate
     * @param {string} [message]
     */
    static ok( predicate, message ) {
      assert( predicate, message || 'unit test failed.' );
    }
  }

  truenit.modules = [];
  truenit.maxLength = 0;
  truenit.latestModulePrefix = 0;

  //========================================================================================
  // Helper functions
  //========================================================================================

  /**
   * Wraps a task such that any errors (which stops task) will be thrown via a log call.
   * Improves the Node.js error handling.
   *
   * @param {function} task
   */
  function wrap( task ) {
    try { task(); }
    catch( error ) {

      const passedString = new Array( truenit.maxLength - truenit.latestModulePrefix.length ).join( ' ' );

      // Catch any errors while executing task and reformat the error message.
      log( `${passedString}${error}`, 31 );
      process.exit( 1 );
    }
  };

  /**
   * A simple Assertion Function with conventional Error throwing. For the purposes of this module, all
   * assertions should be wrapped (see wrap( task )) for better error formating.
   *
   * @param {boolean} predicate
   * @param {string} [message]
   */
  function assert( predicate, message ) {
    if ( !predicate ) {
      // Use the default message if a message isn't provided
      throw new Error( message || 'Assertion failed.' );
    }
  }

  /**
   * A logger for NodeJs that allows for same line logging. Should be wrapped inside a wrapper.
   * Use to indicate a new line and to colorize the output.
   *
   * @param {string} message
   * @param {number} [color] - the code for the color. See below:
   *    Reset = 0        Bright = 1     Di = 2          Underscore = 4
   *    Blink = 5        Reverse = 7    Hidden = 8      FgBlack = 30
   *    FgRed = 31       FgGreen = 32   FgYellow = 33   FgBlue = 34
   *    FgMagenta = 35   FgCyan = 36    FgWhite = 37    BgBlack = 40
   *    BgRed = 41       BgGreen = 42   BgYellow = 43   BgBlue = 44
   *    BgMagenta = 45   BgCyan = 46    BgWhite = 47
   */
  function log( message, color=0 ) {
    assert( typeof message === 'string', `invalid message: ${message}` );
    process.stdout.write( '\x1b[' + color + 'm' + message + '\x1b[0m' );
  }

  module.exports = truenit;
} )();