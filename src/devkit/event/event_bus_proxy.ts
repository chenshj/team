import { EventToken } from './event_token';
import { PROP_METADATA, ANNOTATIONS } from '../metadata/index';
import { NgEventOn, EventListeningConfig, NgEventBus } from './decorator';
import { IEmitable } from './types';

export class EventBusProxy {

  constructor(private eventBus: IEmitable, private host: object, private eventTokenValueProvider: () => any) {
  }

  post(eventName: string, data: any) {
    const eventTokenValue = this.eventTokenValueProvider();
    const eventToken = new EventToken(eventName, eventTokenValue);
    this.eventBus.post(this.host, eventTokenValue, eventName, data);
  }

  register(events: string[]) {
    const constructor = this.host.constructor;
    const propMetadatas = constructor[PROP_METADATA] as object;
    const eventsDeclaration = events;
    if (!eventsDeclaration || !eventsDeclaration.length) {
      throw new Error(`The event's declaration is needed.`);
    }
    const eventHandlerMap = new Map<string, (value: any) => void>();
    for (const propertyName in propMetadatas) {
      if (propMetadatas.hasOwnProperty(propertyName)) {
        const metadatas = propMetadatas[propertyName] as any[];
        metadatas.forEach(propMetadata => {
          if (propMetadata.ngMetadataName === 'NgEventOn') {
            const ngEventOn = propMetadata as NgEventOn;
            const watchingEventName = ngEventOn.watch;
            const eventHandler = this.host[propertyName];
            eventHandlerMap.set(watchingEventName, eventHandler);
          }
        });
      }
    }
    const typeMetadatas = constructor[ANNOTATIONS] as any[];
    const eventListeningConfigs: EventListeningConfig[] = [];
    typeMetadatas.forEach((metadata) => {
      if (!metadata) {
        return;
      }
      if (metadata.ngMetadataName === 'NgEventBus') {
        const ngEventBus = metadata as NgEventBus;
        eventListeningConfigs.push(...ngEventBus.watch);
      }
    });

    eventsDeclaration.forEach(eventName => {
      this.eventBus.registerEventPipe(this.host, this.eventTokenValueProvider(), eventName);
    });

    eventListeningConfigs.forEach(config => {
      const watchingToken = new EventToken(config.eventName, config.tokenValue);
      const eventHandler = eventHandlerMap.get(config.eventName);
      if (eventHandler) {
        this.eventBus.register(config.target, config.tokenValue, config.eventName, eventHandler, this.host);
      }
    });
  }

  watchToken(eventName: string, eventTokenValue: any) {
    throw new Error('Method has not implemented.');
    // const eventToken = this.watchingMapByEvent.get(eventName);
    // if (eventToken == null) {
    //   throw new Error(`Event '${eventName}' has not registed.`);
    // }
    // eventToken.changeToken(eventTokenValue);
  }
}

