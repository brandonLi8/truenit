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

  utils.println( '|———————————————————————————————————————————————————————————————————————————|\n', 1 );
  utils.print( '| Test 1...                                                                 |\n', 0, 1 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————|\n\n', 1 );

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

  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );
  utils.print( '| Test 1 passed!                                                            \n', 1, 32 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );

  //----------------------------------------------------------------------------------------
  // Test 2: don't register multiple tests that pass and start.
  //----------------------------------------------------------------------------------------
  utils.println( '|———————————————————————————————————————————————————————————————————————————|\n', 1 );
  utils.print( '| Test 2...                                                                 |\n', 0, 1 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————|\n\n', 1 );

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

  utils.println( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );
  utils.print( '| Test 2 passed!                                                            \n', 1, 32 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );

  //----------------------------------------------------------------------------------------
  // Test 3: don't register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  utils.println( '|———————————————————————————————————————————————————————————————————————————|\n', 1 );
  utils.print( '| Test 3...                                                                 |\n', 0, 1 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————|\n\n', 1 );
  truenit.test( 'Module_1_should_pass', () => {
    truenit.ok( 5 === 5, 'will not be called' );
  } );

  truenit.test( 'Module_will_fail', () => {
    truenit.notOk( 5 === 6, 'will not be called' );
  } );


  truenit.throws( 'Module_will_throw_error', () => {
    truenit.ok( 6 === 5, 'will not be called' );
  } );

  utils.println( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );
  utils.print( '| Test 3 passed!                                                            \n', 1, 32 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );


  //----------------------------------------------------------------------------------------
  // Test 4: register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  utils.println( '|———————————————————————————————————————————————————————————————————————————\n' );
  utils.print( '| Test 4...                                                                 \n', 0 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n\n' );

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

  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 32 );
  utils.print( '| Test 4 passed!                                                            \n', 32 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 32 );
  

  utils.println( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );
  utils.print( '| All Tests Passed! Bye!                                                    \n', 1, 32 );
  utils.print( '|———————————————————————————————————————————————————————————————————————————\n', 1, 32 );

} )();