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
     * @public
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
     * @public
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
     * @public
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
     * @public
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
          after: () => ( utils.println( 'All tests passed!\n\n', 32 ) )
        } );
      }
    }

    /**
     * Tests a test (which is defined by a name and a tester field)
     * Formats the message in a tab and aligns the 'passed' or error string horizontal for each test.
     * @public
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
     * A static method to test that a function throws an error. Should be wrapped inside a tester.
     * @public
     *
     * @param {function} tester
     * @param {string} [message]
     */
    static throws( tester, message ) {
      utils.reverseTester( message || 'throw test failed', tester )();
    }

    /**
     * A generic unit test function.
     * @public
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @param {boolean} predicate
     * @param {string} [message]
     */
    static ok( predicate, message ) {
      utils.assert( predicate, message || 'unit test failed.' );
    }

    /**
     * A generic unit test function that tests a predicate is not truthy.
     * @public
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @param {boolean} predicate
     * @param {string} [message]
     */
    static notOk( predicate, message ) {
      utils.assert( !predicate, message || 'unit test failed.' );
    }

    /**
     * A unit test function that tests that two values are exactly equal.
     * @public
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @param {*} a - value 1
     * @param {*} b - value 2
     * @param {string} [message] - optional message to add on to the error
     */
    static equals( a, b, message ) {
      utils.assert( !message || typeof message === 'string', `invalid message: ${ message }` );

      this.ok( a === b, message || `Expected: ${ b }, result: ${ a }` );
    }

    /**
     * A unit test function that tests that two values are approximately equal (within epsilon distance).
     * @public
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @param {number} a - value 1
     * @param {number} b - value 2
     * @param {string} [message] - optional message to add on to the error
     * @param {number=0.000001} [epsilon] - a and b must be within this distance
     */
    static approximate( a, b, message, epsilon = 0.000001 ) {
      utils.assert( typeof a === 'number', `invalid 1st arg: ${ a }` );
      utils.assert( typeof b === 'number', `invalid 2nd arg: ${ b }` );
      utils.assert( !message || typeof message === 'string', `invalid message: ${ message }` );
      utils.assert( typeof epsilon === 'number' && epsilon > 0 && epsilon < 1, `invalid epsilon: ${ epsilon }` );

      this.ok( Math.abs( a - b ) < epsilon, message || `Expected: ${ b }, result: ${ a }` );
    }

    /**
     * A unit test function that tests that the values of two arrays are approximately equal (within epsilon distance).
     * @public
     *
     * NOTE: This uses conventional error handling. For the purposes of this module, this should only be called inside
     *       of a tester.
     *
     * @param {*[]} a - array 1
     * @param {*[]} b - array 2
     * @param {string} [message] - optional message to add on to the error
     * @param {number=0.000001} [epsilon] - a and b must be within this distance
     */
    static arrayApproximate( a, b, message, epsilon = 0.000001 ) {
      utils.assert( Array.isArray( a ), `invalid 1st arg: ${ a }` );
      utils.assert( Array.isArray( b ), `invalid 1st arg: ${ b }` );

      const aSorted = a.slice().sort();
      const bSorted = b.slice().sort();
      const errorMessage = message || `Expected: ${ b }, result: ${ a }`;

      this.equals( a.length, b.length, errorMessage + ' (length different)' );
      for ( let i = 0; i < a.length; i++ ) {
        this.approximate( aSorted[ i ], bSorted[ i ], errorMessage + ' (index ' + i + ')' );
      }
    }
  }

  return truenit;
} )();