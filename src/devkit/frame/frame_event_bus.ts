import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { FrameEvent } from './frame_event';


/**
 * 框架事件总线
 */
@Injectable()
class FrameEventBus {

  /**
   * @todo 暂不实现对订阅的注销
   */
  private subscriptions: any;

  /**
   * 事件流
   */
  public events: Subject<FrameEvent> = new Subject<FrameEvent>();


  /**
   * 注册事件处理
   */
  on(eventType: string, eventHandler: any, frameId: string) {
    this.events.filter((event: FrameEvent) => {
      if (event.type !== eventType) {
        return false;
      }
      return !event.frameIds || event.frameIds.indexOf(frameId) > -1;
    }).subscribe(eventHandler);
  }

  /**
   * 取消事件处理
   */
  off(eventType: string, frameId: string): void {
    throw new Error('暂不实现');
  }

  /**
   * 触发事件
   */
  trigger(eventType: string, eventData?: any, frameIds?: string[]) {
    const event: FrameEvent = {
      type: eventType,
      data: eventData,
      frameIds: frameIds
    };
    this.events.next(event);
  }
}

export { FrameEventBus };
