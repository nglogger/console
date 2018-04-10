'use strict';
/* Imports */
import { Injectable } from '@angular/core';

import { Level, Meta, Scope, Transport } from '@nglogger/core';


/* Interfaces */
export type ConsoleLevel =
  | 'error'
  | 'info'
  | 'log'
  | 'trace'
  | 'warn'
  ;


/* Constants */
const COLOR_TRANSPARENT = 'rgba(0, 0, 0, 0)';
const COLOR_WHITE       = '#ffffff';
const COLOR_BLACK       = '#1d1f21';
const COLOR_GREY        = '#bbbbbb';
const COLOR_YELLOW      = '#f0c674';
const COLOR_AQUA        = '#8abeb7';
const COLOR_RED         = '#cc6666';
const COLOR_PURPLE      = '#b294bb';
const COLOR_BLUE        = '#0074d9';

const LEVEL_STYLE: { [key in Level]: string } = {
  fatal:   `background: ${COLOR_RED};    color: ${COLOR_WHITE}`,
  error:   `background: ${COLOR_RED};    color: ${COLOR_WHITE}`,
  warn:    `background: ${COLOR_AQUA};   color: ${COLOR_WHITE}`,
  info:    `background: ${COLOR_YELLOW}; color: ${COLOR_WHITE}`,
  verbose: `background: ${COLOR_GREY};   color: ${COLOR_WHITE}`,
  trace:   `background: ${COLOR_GREY};   color: ${COLOR_WHITE}`,
  debug:   `background: ${COLOR_PURPLE}; color: ${COLOR_WHITE}`
};

const BRAKET_STYLE = `color:      ${COLOR_GREY}`;
const COLON_STYLE  = `color:      ${COLOR_GREY}`;
const DATE_STYLE   = `color:      ${COLOR_BLACK}`;
const RESET_STYLE  = `background: ${COLOR_TRANSPARENT}; color: ${COLOR_BLACK}`;
const SCOPE_STYLE  = `color:      ${COLOR_BLUE}`;


/* Helpers */
function stubZero(val: number, count: number): string {
  const strVal = `${val}`;
  const len = strVal.length;

  if (len >= count) {
    return strVal;
  }

  let res = '';

  for (let i = 0, ii = count - len; i < ii; i++) {
    res += '0';
  }

  res += strVal;

  return res;
}


@Injectable()
export class ConsoleTransport implements Transport {
  private _console: Console = console;

  log(level: Level, scope: Scope, subject: string, meta?: Meta): void {
    const date = this._getDate();

    const consoleLevel = this._getConsoleLevel(level);
    const levelStyle = this._getLevelStyle(level);
    const template = `%c[%c${date}%c]%c %c ${level} %c(%c${scope}%c)%c:`;

    const title = [
      template,
      BRAKET_STYLE,
      DATE_STYLE,
      BRAKET_STYLE,
      RESET_STYLE,
      levelStyle,
      BRAKET_STYLE,
      SCOPE_STYLE,
      BRAKET_STYLE,
      COLON_STYLE
    ];

    if (meta !== undefined) {
      this._console[consoleLevel](...title, subject, meta);
    } else {
      this._console[consoleLevel](...title, subject);
    }
  }

  // tslint:disable-next-line:prefer-function-over-method
  private _getDate(): string {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    // tslint:disable-next-line:no-magic-numbers
    const hh = stubZero(h, 2);
    // tslint:disable-next-line:no-magic-numbers
    const mm = stubZero(m, 2);
    // tslint:disable-next-line:no-magic-numbers
    const ss = stubZero(s, 2);
    // tslint:disable-next-line:no-magic-numbers
    const sss = stubZero(ms, 3);

    return `${hh}:${mm}:${ss}.${sss}`;
  }

  // tslint:disable-next-line:prefer-function-over-method
  private _getConsoleLevel(level: Level): ConsoleLevel {
    switch (level) {
      case 'fatal':     return 'error';
      case 'error':     return 'error';
      case 'warn':      return 'warn';
      case 'info':      return 'info';
      case 'verbose':   return 'log';
      case 'trace':     return 'trace';
      case 'debug':     return 'log';
      default:          return 'log';
    }
  }

  // tslint:disable-next-line:prefer-function-over-method
  private _getLevelStyle(level: Level): string {
    const style = LEVEL_STYLE[level];

    return style !== undefined ? style : RESET_STYLE;
  }
}
