import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

// import { MessagerService } from '@farris/ui';
/**
 * 表单消息服务
 *
 * 1、包装@farris/ui的消息服务；
 * 2、提供针对表单的快捷方法；
 */
@Injectable()
class FormMessageService {

  /**
   * 构造函数
   * 注入@farris/ui的LoadingService
   */
  // constructor(private messagerService: MessagerService) {
  // }

  /**
   * 确认弹框
   */
  public confirm(content: string): Observable<boolean> {
    const result$ = new Subject<boolean>();
    // this.messagerService.question(
    //   content,
    //   () => { result$.next(true); },
    //   () => { result$.next(false); }
    // );
    // return result$ as Observable<boolean>;
    return of(true);
  }

  /**
   * 消息弹框
   */
  public info(content: string) {
    // this.messagerService.info(content);
  }

  /**
   * 错误弹框
   */
  public error(content: string) {
    // this.messagerService.error(content);
  }

  /**
   * 警告弹框
   */
  public warning(content: string) {
    // this.messagerService.warning(content);
  }
}

export { FormMessageService };

