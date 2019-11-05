// Copyright © 2019 Brandon Li. All rights reserved.

/**
 * Main entry point for the project (file when `require( 'truenit' )` is called).
 * Contains the public facing code for this project.
 *
 * This module is built as a static class (no instance is necessary).
 *
 * ## Future Maintainers:
 *  - See `../README.md` for an overview of the project
 *  - See `../docs/implementation-notes.md` before updating.
 *  - See `../docs/api-model.md` for an overview of the entire API.
 *  - See `../tests/test-truenit.js` for tests and an example of the API.
 *  - See `../docs/new-release-guide.md` for new releases.
 *  - See `../docs/code-style-guideline.md` for the code style guideline.
 *
 * @author Brandon Li <brandon.li820@gmail.com>
 */

module.exports = ( () => {
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
     * Registers a test to the registeredTests array such that it expects a error to be thrown. Errors if no error
     * is thrown.
     *
     * @param {string} name - the name of the test. This is what is part of the output.
     * @param {function} tester - the function that executes the test. Called when `truenit.start()` is called.
     */
    static registerThrowTest( name, tester ) {
      utils.wrap( () => {
        this.registerTest( name, utils.reverseTester( name, tester ) );
      } );
    }

    /**
     * Clears all registered tests and does nothing if there aren't any registered tests.
     * @public
     * @returns {truenit} for chaining
     */
    static clearTests() {

      while( registeredTests.length ) {
        registeredTests.pop();
      }
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
          before: () => ( utils.print( 'Testing all...\n\n', 0, 4 ) ),
          after: () => ( utils.println( 'All tests passed!\n\n', 32, ) )
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
          before: () => ( utils.print( testString, testIsRegistered ? 2 : 0 ) ),
          after: () => ( utils.print( utils.preSpace( 'Passed.\n', spacesPrepended ) ) ),
          failure: spacesPrepended
        } );
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

    /**
     * A generic unit tester function that tests a predicate is falsy.
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @public
     *
     * @param {boolean} predicate
     * @param {string} [message]
     */
    static notOk( predicate, message ) {
      utils.assert( !predicate, message || 'unit test failed.' );
    }

    /**
     * Wraps a tester inside of try-catch hierarchy such that it expects to throw an error and tests that it does.
     * @public
     *
     * @param {string} name - the name of the test
     * @param {function} tester
     */
    static throws( name, tester ) {
      utils.wrap( () => {
        truenit.test( name, utils.reverseTester( name, tester ) );
      } );
    }
  }

  return truenit;
} )();