// Copyright © 2019 Brandon Li. All rights reserved.

/**
 * Main file that contains the public facing code for this project.
 *
 * This module should be loaded as a static class (no instance is necessary).
 *
 * ## Future Maintainers:
 *  - see `https://github.com/brandonLi8/truenit/blob/master/README.md` for an overview of the project
 *  - see `https://github.com/brandonLi8/truenit/blob/master/docs/implementation-notes.md` before updating.
 *
 * @author Brandon Li <brandon.li820@gmail.com>
 */

( () => {
  'use strict';

  // modules
  const utils = require( './utils' );

  // globals
  let registeredTests = []; // array of the tests that have been registered and ready to test.

  //----------------------------------------------------------------------------------------

  class truenit {

    /**
     * Registers a test to the registeredTests array. All tests should be registered before calling `truenit.start()`.
     * This is done so the formatting of the output is aligned.
     *
     * @param {string} name - the name of the test. This is what is part of the output.
     * @param {function} tester - the function that executes the test. Called when `truenit.start()` is called.
     * @param {truenit} for chaining
     */
    static registerTest( name, tester ) {
      // Wrap the registering of the task so that errors are correctly formatted.
      utils.wrap( () => {

        util.assert( typeof name === 'string', `invalid name: ${ name }` );
        util.assert( typeof tester === 'function', `invalid tester: ${ tester }` );

        // Create an object that keeps track of the testing attributes
        const test = {
          name,
          tester
        };
        registeredTests.push( test );

      } );
      return truenit;
    }

    /**
     * Removes a test (first appearance) from the registeredTests array. If the test isn't present, an error is thrown.
     *
     * @param {string} name - the name of the test.
     * @param {function} tester - the function that executes the test.
     * @param {truenit} for chaining
     */
    static removeTest( name, tester ) {
      // Wrap the registering of the task so that errors are correctly formatted.
      utils.wrap( () => {

        util.assert( typeof name === 'string', `invalid name: ${ name }` );
        util.assert( typeof tester === 'function', `invalid tester: ${ tester }` );

        for ( let i = 0; i < registeredTests.length; i++ ) {
          const test = registeredTests[ i ];

          if ( test.name === name && test.tester === tester ) {
            // remove the test from the array
            registeredTests.splice( i, 1 );
            return;
          }
        };
        util.assert( false, 'test was not found' );
      } );
      return truenit;
    }

    /**
     * Executes the tester of each test in registeredTests. If there aren't any tests, nothing happens.
     *
     * @return {truenit} for chaining
     */
    static start() {

      //----------------------------------------------------------------------------------------
      // Make sure the alignment is correct by getting the maxTestString of each module.
      let maxTestString = 0;

      truenit.modules.forEach( module => {
        if ( util.newTestString( module.name ) > maxTestString ) {
          maxTestString = util.newTestString( module.name ).length;
        }
      } );


      truenit.test( () => {
        truenit.modules.forEach( module => {
          truenit.testModule( module.name, module.tester );
        } )
      }, 'Testing all...\n\n', 4, '\nAll tests passed!\n\n', 32 );
    }

  //   /**
  //    * Executes a tester function but wraps it with helpful messages
  //    */
  //   /**
  //    * Basic method that attempts to execute a tester. Used as a high-level wrapper to start a large
  //    * section of tests.
  //    * @public
  //    *
  //    * @param {function} tester
  //    * @param {string} [startMessage]
  //    * @param {number} [startColor]
  //    * @param {string} [endMessage]
  //    * @param {number} [endColor]
  //    * @param {string} [failedMessage]
  //    */
  //   static test( tester, startMessage, startColor, endMessage, endColor, failedMessage ) {
  //     wrap( () => {
  //       assert( typeof tester === 'function', `invalid tester: ${tester}` );
  //       assert( !startMessage || typeof startMessage === 'string', `invalid startMessage: ${startMessage}` );
  //       assert( !endMessage || typeof endMessage === 'string', `invalid endMessage: ${endMessage}` );
  //       assert( !failedMessage || typeof failedMessage === 'string', `invalid failedMessage: ${failedMessage}` );

  //       //----------------------------------------------------------------------------------------
  //       // Start testing
  //       logMessage( startMessage ? startMessage : 'starting test...\n', startColor );

  //       try {
  //         tester();
  //       }
  //       catch( error ) {
  //         assert( false, failedMessage ? failedMessage : `FAILED \n\n${error.stack}\n\n` );
  //       }
  //       logMessage( endMessage ? endMessage : 'Test passed!', endColor );
  //     } )
  //   }



  //   /**
  //    * Test method wrapper for a module. Should be wrapped inside of truenit.start().
  //    *
  //    * @param {string} name - the name of the module
  //    * @param {function} tester
  //    */
  //   static testModule( name, tester ) {
  //     wrap( () => {
  //       assert( typeof name === 'string', `invalid name: ${name}` );
  //     } );
  //     const prefix = `  Testing ${name}...  `;
  //     const numberOfSpaces = truenit.maxLength - prefix.length;
  //     const passedString = ' '.repeat( numberOfSpaces  ) + 'passed\n';

  //     truenit.latestModulePrefix = prefix;

  //     truenit.test( tester, prefix, 2, passedString, 0 );
  //   }

  //   /**
  //    * Tests that a predicate is truthy.
  //    * Should be wrapped inside of a tester.
  //    * @public
  //    *
  //    * @param {boolean} predicate
  //    * @param {string} [message]
  //    */
  //   static ok( predicate, message ) {
  //     assert( predicate, message || 'unit test failed.' );
  //   }
  // }


  // module.exports = truenit;
} )();