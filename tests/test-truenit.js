// Copyright © 2019 Brandon Li. All rights reserved.

/* eslint no-console: 0 */

/**
 * Entry point for truenit tests. To run, run `npm test` || `node tests/test-truenit.js`.
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
  const truenit = require( '../src/truenit' );
  const utils = require( '../src/utils' );

  //----------------------------------------------------------------------------------------
  // Test 1: Register passing tests start.
  //----------------------------------------------------------------------------------------

  line();
  printBold( 'Test 1...\n\n' );

  truenit.registerTest( 'Module_1_should_pass', () => {
    truenit.ok( 5 === 5, 'will not be called' );
  } );

  truenit.registerTest( 'Module_2_should_pass_but_has_a_long_name_but_should_still_format_nicely', () => {
    truenit.ok( typeof 'str' === 'string', 'will not be called' );
  } );

  truenit.registerTest( 'Module_3', () => {
    truenit.notOk( false, 'will not be called' );
  } );

  truenit.start();
  truenit.clearTests(); // clear all registered tests for the next test

  printBold( 'Test 1 passed!\n' );

  //----------------------------------------------------------------------------------------
  // Test 2: don't register multiple tests that pass and start.
  //----------------------------------------------------------------------------------------
  line();
  printBold( 'Test 2...\n\n' );

  truenit.test( 'Module_1_should_pass', () => {
    truenit.notOk( 6 === 5, 'will not be called' );
  } );

  truenit.test( 'Module_2_should_pass_but_has_a_long_name_but_will_not_format_nicely_since_not_registered', () => {
    truenit.ok( typeof 'str' === 'string', 'will not be called' );
  } );

  truenit.test( 'Module_3', () => {
    truenit.ok( true, 'will not be called' );
  } );

  truenit.start(); // shouldn't log anything

  printBold( '\nTest 2 passed!\n' );

  //----------------------------------------------------------------------------------------
  // Test 3: don't register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  line();
  printBold( 'Test 3:\n\n',  );

  truenit.test( 'Module_1_should_pass', () => {
    truenit.ok( 5 === 5, 'will not be called' );
  } );

  truenit.test( 'Module_will_fail', () => {
    truenit.notOk( 5 === 6, 'will not be called' );
  } );


  truenit.throws( 'Module_will_throw_error', () => {
    truenit.ok( 6 === 5, 'will not be called' );
  } );

  printBold( '\nTest 3 passed!\n' );


  //----------------------------------------------------------------------------------------
  // Test 4: register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  line();
  printBold( 'Test 4:\n\n',  );

  truenit.registerTest( 'Module_1_should_pass', () => {
    truenit.notOk( 7 === 5, 'will not be called' );
  } );

  truenit.registerThrowTest( 'Module_will_fail', () => {
    truenit.ok( 5 === 6, 'will not be called' );
  } );

  const moduleNotTested = 'ModuleNotTested';
  const moduleNotTester = () => {
    truenit.ok( 6 === 5, 'will not be called' );
  };

  truenit.registerTest( moduleNotTested, moduleNotTester );
  truenit.removeTest( moduleNotTested, moduleNotTester );


  truenit.registerTest( 'Module_1_should_pass', () => {
    truenit.ok( 5 === 5, 'will not be called' );
  } );

  truenit.start();

  printBold( '\nTest 4 passed!\n' );


  utils.print( '\nAll Test Passed. Bye!\n', 32 );


  //----------------------------------------------------------------------------------------
  // Helpers
  //----------------------------------------------------------------------------------------

  /**
   * Prints a line.
   */
  function line() {
    utils.println( '————————————————————————————————————————————————————————————————————————————\n\n', 2 );
  }
  /**
   * Prints in bold and underlined.
   */
  function printBold( text ) {
    utils.print( '\x1b[1m\x1b[4m' + text, 1 );
  }
} )();