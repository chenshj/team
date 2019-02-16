import { Injectable } from '@angular/core';
// import { LoadingService, LoadingComponent } from '@farris/ui';

/**
 * 加载提示Helper
 * 1、包装@farris/ui的LoadingService；
 * 2、提供针对表单的快捷方法；
 */
@Injectable()
class FormLoadingService {

  /**
   * 加载中组件实例
   */
  // private loadingCmp: LoadingComponent;

  /**
   * 构造函数
   * 注入@farris/ui的LoadingService
   */
  // constructor(private loadingService: LoadingService) {
  // }

  /**
   * 显示加载中
   */
  public show() {
    console.log('loading shown ....');
    // if (this.loadingCmp) {
    //   this.loadingCmp.close();
    // }
    // this.loadingCmp =  this.loadingService.show();
    // return this.loadingCmp;
  }

  /**
   * 隐藏加载中
   */
  public hide() {
    console.log('loading hidden ....');
    // if (!this.loadingCmp) {
    //   return;
    // }
    // return this.loadingCmp.close();
  }
}

export { FormLoadingService };
