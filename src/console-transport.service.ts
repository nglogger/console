'use strict';
/** Imports */
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Transport, ILevel, IScope, IMeta } from '@nglogger/core';


/** Interfaces */
export type IConsoleLevel =
  | 'error'
  | 'info'
  | 'log'
  | 'trace'
  | 'warn'
  ;


/** Constants */
const DATE_FORMAT       = 'HH:mm:ss';

const COLOR_TRANSPARENT = 'rgba(0, 0, 0, 0)';
const COLOR_WHITE       = '#ffffff';
const COLOR_BLACK       = '#1d1f21';
const COLOR_GREY        = '#bbbbbb';
const COLOR_YELLOW      = '#f0c674';
const COLOR_AQUA        = '#8abeb7';
const COLOR_RED         = '#cc6666';
const COLOR_PURPLE      = '#b294bb';
const COLOR_BLUE        = '#0074d9';

const LEVEL_STYLE: { [key in ILevel]: string } = {
  fatal:   `background: ${COLOR_RED};    color: ${COLOR_WHITE}`,
  error:   `background: ${COLOR_RED};    color: ${COLOR_WHITE}`,
  warn:    `background: ${COLOR_AQUA};   color: ${COLOR_WHITE}`,
  info:    `background: ${COLOR_YELLOW}; color: ${COLOR_WHITE}`,
  verbose: `background: ${COLOR_GREY};   color: ${COLOR_WHITE}`,
  trace:   `background: ${COLOR_GREY};   color: ${COLOR_WHITE}`,
  debug:   `background: ${COLOR_PURPLE}; color: ${COLOR_WHITE}`
};

const BRAKET_STYLE = `color:      ${COLOR_GREY}`;
const DATE_STYLE   = `color:      ${COLOR_BLACK}`;
const RESET_STYLE  = `background: ${COLOR_TRANSPARENT}; color: ${COLOR_BLACK}`;
const SCOPE_STYLE  = `color:      ${COLOR_BLUE}`;


@Injectable()
export class ConsoleTransport implements Transport {
  private _console: Console = console;

  constructor(
    private datePipe: DatePipe
  ) {}

  log(level: ILevel, scope: IScope, subject: string, meta?: IMeta): Promise<void> {
    const date = this._getDate();

    console[this._getConsoleLevel(level)](`%c[%c${date}%c]%c %c ${level} %c(%c${scope}%c)`, ...[
      BRAKET_STYLE,
      DATE_STYLE,
      BRAKET_STYLE,
      RESET_STYLE,
      this._getLevelStyle(level),
      BRAKET_STYLE,
      SCOPE_STYLE,
      BRAKET_STYLE,
    ], subject, meta ? meta : '');

    return Promise.resolve();
  }

  private _getDate(): string {
    const now = Date.now();

    const hhMmSs = this.datePipe.transform(now, DATE_FORMAT);
    const sss    = now.toString().slice(-3);

    return `${hhMmSs}.${sss}`;
  }

  private _getConsoleLevel(level: ILevel): IConsoleLevel {
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

  private _getLevelStyle(level: ILevel): string {
    const style = LEVEL_STYLE[level];

    return style !== undefined ? style : RESET_STYLE;
  }
}
