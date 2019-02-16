import { Injectable } from '@angular/core';
// import { NotifyService } from '@farris/ui';

/**
 * 通知服务
 */
@Injectable()
class FormNotifyService {

  /**
   * 构造函数
   * 注入@farris/ui的NotifyService
   */
  // constructor(private notifyService: NotifyService) {
  // }

  /**
   * 信息提示
   * @param content 内容
   */
  public default(content: string) {
    console.log(`DEFAULT: ${content}`);
    // return this.notifyService.default(content);
  }

  /**
   * 信息提示
   * @param content 内容
   */
  public info(content: string) {
    console.log(`INFO: ${content}`);
    // return this.notifyService.info(content);
  }

  /**
   * 成功提示
   * @param content 内容
   */
  public success(content: string) {
    console.log(`SUCCESS: ${content}`);
    // this.notifyService.success(content);
  }

  /**
   * 警告提示
   * @param content 内容
   */
  public warning(content: string) {
    console.log(`WARN: ${content}`);
    // this.notifyService.warning(content);
  }

  /**
   * 错误提示
   * @param content 内容
   */
  public error(content: string) {
    console.log(`ERROR: ${content}`);
    // this.notifyService.error(content);
  }
}

export { FormNotifyService };
