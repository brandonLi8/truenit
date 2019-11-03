// Copyright © 2019 Brandon Li. All rights reserved.

/**
 * Source code for this project.
 *
 * @author Brandon Li <brandon.li820@gmail.com>
 */

( () => {
  'use strict';

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