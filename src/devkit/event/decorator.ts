import { Type } from '@angular/core';
import { TypeDecorator, makeDecorator, makePropDecorator } from '../metadata/index';

export abstract class TagEvent {
  data: any;
  tag?: string;
}

export class EventListeningConfig {
  target: string;
  eventName: string;
  tokenValue: any;
}

/**
 * NgEventBus
 */
export interface NgEventBus {
  watch: EventListeningConfig[];
}

/**
 * NgEventBusDecorator
 */
export interface NgEventBusDecorator {
  (obj?: NgEventBus): TypeDecorator;
  new(obj?: NgEventBus): NgEventBus;
}

/**
 * NgEventBus
 */
// tslint:disable-next-line:variable-name
export const NgEventBus: NgEventBusDecorator =
  makeDecorator('NgEventBus', (dir: NgEventBus) => dir);

/**
* NgEventOn
*/
export interface NgEventOn {
  watch: string;
  tokenValue?: any;
}

/**
 * NgEventOnDecorator
 */
export interface NgEventOnDecorator {
  (obj?: NgEventOn): any;
  new(obj?: NgEventOn): NgEventOn;
}

/**
 * NgEventOn
 */
// tslint:disable-next-line:variable-name
export const NgEventOn: NgEventOnDecorator =
  makePropDecorator('NgEventOn', (dir: NgEventOn) => dir);
