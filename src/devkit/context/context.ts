import { Injectable } from '@angular/core';

@Injectable()
class Context {

  /**
   * 上下文变量
   */
  params: Map<string, any> = new Map<string, any>();

  /**
   * 获取变量
   */
  getParam(key: string): any {
    return this.params.get(key);
  }

  /**
   * 设置变量
   */
  setParam(key: string, value: any) {
    this.params.set(key, value);
  }
}

export { Context };
