import { AppContext } from '../context';

/**
 * 解析辅助工具类
 */
class ParseUtil {

  /**
   * 获取应用上下文
   */
  static getAppContext(context: any): AppContext {
    if (context.constructor.name === 'CommandContext') {
      return context.frameContext.appContext;
    } else if (context.constructor.name === 'FrameContext') {
      return context.appContext;
    } else  if (context.constructor.name === 'AppContext') {
      return context;
    } else {
      throw new Error('上下文中找不到AppContext，请检查！');
    }
  }
}

export { ParseUtil };
