import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
// import { EventBusProxy } from './event_bus_proxy';
import { EventPipe } from './event_pipe';
import { EventContext } from './event_context';
import { IEmitable } from './types';
import { EventBusProxy } from './event_bus_proxy';

@Injectable()
export class EventBus implements IEmitable {

  private proxyMap: WeakMap<object, EventBusProxy>;
  private eventPipesMap: Map<string, Map<string, Map<string, EventPipe>>>;

  constructor() {
    this.proxyMap = new WeakMap<object, EventBusProxy>();
    this.eventPipesMap = new Map<string, Map<string, Map<string, EventPipe>>>();
  }

  private getEventPipe(target: string, tokenValue: string, eventName: string): EventPipe {
    const eventPipesMapByToken = this.eventPipesMap.get(target);
    if (eventPipesMapByToken) {
      const eventPipesMapByName = eventPipesMapByToken.get(tokenValue);
      if (eventPipesMapByName) {
        const eventPipe = eventPipesMapByName.get(eventName);
        if (eventPipe) {
          return eventPipe;
        }
      }
    }
    return null;
  }

  registerEventPipe(emitter: object, tokenValue: string, eventName: string) {
    const emitterType = emitter.constructor.name;

    if (!this.eventPipesMap.has(emitterType)) {
      this.eventPipesMap.set(emitterType, new Map<string, Map<string, EventPipe>>());
    }

    const eventPipesMapByToken = this.eventPipesMap.get(emitterType);

    if (!eventPipesMapByToken.has(tokenValue)) {
      eventPipesMapByToken.set(tokenValue, new Map<string, EventPipe>());
    }

    const eventPipesMapByName = eventPipesMapByToken.get(tokenValue);

    if (!eventPipesMapByName.has(eventName)) {
      eventPipesMapByName.set(eventName, new EventPipe(eventName, tokenValue, emitter));
    }
    const eventPipe = eventPipesMapByName.get(eventName);
    return eventPipe;
  }

  getProxy(owner: any, eventTokenValueProvider: () => any): EventBusProxy {
    if (!this.proxyMap.has(owner)) {
      this.proxyMap.set(owner, new EventBusProxy(this, owner, eventTokenValueProvider));
    }
    return this.proxyMap.get(owner);
  }

  post(emitter: object, tokenValue: string, eventName: string, eventArgs: any) {
    const eventPipe = this.getEventPipe(emitter.constructor.name, tokenValue, eventName);
    if (!eventPipe) {
      throw new Error(`Can not find ${emitter.constructor.name}'s event
       '${eventName}' registration with token '${tokenValue}' `);
    }
    eventPipe.post(eventArgs);
  }

  register(target: string, tokenValue: string, eventName: string, handler: (value: any) => void, caller: object) {
    const eventPipe = this.getEventPipe(target, tokenValue, eventName);
    if (eventPipe) {
      eventPipe.subscribe(handler, caller);
    }
  }
}
