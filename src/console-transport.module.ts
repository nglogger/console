'use strict';
/** Imports */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ConsoleTransport } from './console-transport.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe,
    ConsoleTransport
  ]
})
export class ConsoleTransportModule { }
