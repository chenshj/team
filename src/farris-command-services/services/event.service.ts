import { Injectable } from '@angular/core';
import { FrameEventBus } from '../../devkit';

/**
 * 框架事件服务
 */
 @Injectable()
class EventService {

  constructor(private eventBus: FrameEventBus) {
  }

  trigger(eventType: string, eventData?: any, frameIds?: string[]) {
    this.eventBus.trigger(eventType, eventData, frameIds);
  }
}

export { EventService };
