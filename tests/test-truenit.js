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


  //----------------------------------------------------------------------------------------
  // Test 1: register multiple tests that pass and start.
  //----------------------------------------------------------------------------------------
  console.log( '//----------------------------------------------------------------------------------------' );
  console.log( 'Testing test 1:\n' );

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

  console.log( 'Test 1 passed!' );
  console.log( '//----------------------------------------------------------------------------------------' );



  //----------------------------------------------------------------------------------------
  // Test 2: don't register multiple tests that pass and start.
  //----------------------------------------------------------------------------------------
  truenit.clearTests(); // clear all registered tests

  console.log( '//----------------------------------------------------------------------------------------' );
  console.log( 'Testing test 2:\n' );

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

  console.log( 'Test 2 passed!' );
  console.log( '//----------------------------------------------------------------------------------------' );

  //----------------------------------------------------------------------------------------
  // Test 3: don't register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  truenit.clearTests(); // clear all registered tests

  console.log( '//----------------------------------------------------------------------------------------' );
  console.log( 'Testing test 3:\n' );

  truenit.test( 'Module_1_should_pass', () => {
    truenit.ok( 5 === 5, 'will not be called' );
  } );

  truenit.test( 'Module_will_fail', () => {
    truenit.notOk( 5 === 6, 'will not be called' );
  } );


  truenit.throws( 'Module_will_throw_error', () => {
    truenit.ok( 6 === 5, 'will not be called' );
  } );

  console.log( 'Test 3 passed!' );
  console.log( '//----------------------------------------------------------------------------------------' );



  //----------------------------------------------------------------------------------------
  // Test 4: register multiple tests with some that fail and start.
  //----------------------------------------------------------------------------------------
  truenit.clearTests(); // clear all registered tests

  console.log( '//----------------------------------------------------------------------------------------' );
  console.log( 'Testing test 4:\n' );

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

  console.log( 'Test 4 passed!' );
  console.log( '//----------------------------------------------------------------------------------------' );


  console.log( 'All Test Passed. Bye!' );
} )();