'use strict';
/* Imports */
import { NgModule } from '@angular/core';

import { ConsoleTransport } from './console-transport.service';


@NgModule({
  providers: [
    ConsoleTransport
  ]
})
export class ConsoleTransportModule { } // tslint:disable-line:no-unnecessary-class
