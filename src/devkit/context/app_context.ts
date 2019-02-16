/**
 * 应用上下文
 * @author Witt<jiwt@inspur.com>
 */
import { Injectable } from '@angular/core';
import { FrameContext } from '../frame/index';
import { Context } from './context';


@Injectable()
class AppContext extends Context {

  /**
   * FrameContext字典
   */
  private frameContexts: Map<string, FrameContext> = new Map<string, FrameContext>();

  /**
   * 构造函数
   */
  constructor() {
    super();
  }

  /**
   * 注册FrameContext
   */
  regFrameContext(frameId: string, frameContext: FrameContext): void {

    // @todo: 存在问题
    // 1、第二次进入的时候，模块还是以前的模块，但组件重新进行了初始化；
    // 2、导致重复注册报错，待验证。
    // if (this.frameContexts.has(frameId) === true) {
    //   throw Error(`${frameId}类型的ComponentContext已经存在，请检查！`);
    // }
    this.frameContexts.set(frameId, frameContext);
  }

  /**
   * 获取FrameContext
   * @param frameId 框架id
   */
  getFrameContext(frameId: string): FrameContext {
    if (this.frameContexts.has(frameId) === false) {
      throw Error(`找不到${frameId}对应的FrameworkContext，请检查！` );
    }
    return this.frameContexts.get(frameId);
  }
}

export { AppContext };
