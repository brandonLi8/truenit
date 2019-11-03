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
  const registeredTests = []; // array of the tests that have been registered and ready to test.

  //----------------------------------------------------------------------------------------

  class truenit {

    /**
     * Registers a test to the registeredTests array. All tests should be registered before calling `truenit.start()`.
     * This is done so the formatting of the output is aligned.
     *
     * @param {string} name - the name of the test. This is what is part of the output.
     * @param {function} tester - the function that executes the test. Called when `truenit.start()` is called.
     * @returns {truenit} for chaining
     */
    static registerTest( name, tester ) {
      // Wrap the registering of the task so that errors are correctly formatted.
      utils.wrap( () => {

        utils.assert( typeof name === 'string', `invalid name: ${ name }` );
        utils.assert( typeof tester === 'function', `invalid tester: ${ tester }` );

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
     * @returns {truenit} for chaining
     */
    static removeTest( name, tester ) {
      // Wrap the registering of the task so that errors are correctly formatted.
      utils.wrap( () => {

        utils.assert( typeof name === 'string', `invalid name: ${ name }` );
        utils.assert( typeof tester === 'function', `invalid tester: ${ tester }` );

        for ( let i = 0; i < registeredTests.length; i++ ) {
          const test = registeredTests[ i ];

          if ( test.name === name && test.tester === tester ) {
            // remove the test from the array
            registeredTests.splice( i, 1 );
            return;
          }
        }
        utils.assert( false, 'test was not found' );
      } );
      return truenit;
    }

    /**
     * Tests each tests in registeredTests If there aren't any tests, nothing happens.
     *
     * @returns {truenit} for chaining
     */
    static start() {

      if ( registeredTests.length > 0 ) {

        utils.test( {

          // Test each test in registeredTests
          tester: () => ( registeredTests.forEach( test => ( truenit.test( test.name, test.tester ) ) ) ),

          // Print before and after testing
          before: () => ( utils.print( '\x1b[1m\x1b[4mTesting all...\n', 0 ) ),
          after: () => ( utils.println( '\n\x1b[1mAll tests passed!\n\n', 32 ) )
        } );
      }
    }

    /**
     * Tests a test (which is defined by a name and a tester field)
     * Formats the message in a tab and aligns the 'passed' or error string horizontal for each test.
     *
     * @param {string} name - the name of the test
     * @param {function} tester
     * @returns {truenit} for chaining
     */
    static test( name, tester ) {

      // Wrap the registering of the task so that errors are correctly formatted.
      utils.wrap( () => {

        utils.assert( typeof name === 'string', `invalid name: ${ name }` );
        utils.assert( typeof tester === 'function', `invalid tester: ${ tester }` );

        //----------------------------------------------------------------------------------------
        // Keep a flag of whether or not the test is registered.
        let testIsRegistered = false;
        registeredTests.forEach( test => {

          if ( test.name === name && test.tester === tester ) testIsRegistered = true;

        } );

        //----------------------------------------------------------------------------------------
        // Get the longest test string to calculate where the error/passed string is located
        let longestTestString = utils.newTestString( name, testIsRegistered ).length;

        if ( testIsRegistered ) {
          registeredTests.forEach( test => {

            const testString = utils.newTestString( test.name, true );

            if ( testString.length > longestTestString ) longestTestString = testString.length;
          } );
        }

        //----------------------------------------------------------------------------------------
        // Calculate the number of spaces to prepend to the after message
        const testString = utils.newTestString( name, testIsRegistered );
        const spacesPrepended = longestTestString - testString.length;

        //----------------------------------------------------------------------------------------
        // Test the tester
        utils.test( {
          tester,
          // Print before and after testing
          before: () => ( utils.println( testString, testIsRegistered ? 2 : 0 ) ),
          after: () => ( utils.print( utils.preSpace( 'Passed.', spacesPrepended ) ) ),
          failure: spacesPrepended
        } );

        if ( !testIsRegistered ) utils.println( '\n' );

      } );
    }

    /**
     * A generic unit tester function.
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @public
     *
     * @param {boolean} predicate
     * @param {string} [message]
     */
    static ok( predicate, message ) {
      utils.assert( predicate, message || 'unit test failed.' );
    }
  }

  module.exports = truenit;
} )();