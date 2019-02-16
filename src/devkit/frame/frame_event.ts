
/**
 * 上下文事件
 */
class FrameEvent {

  /**
   * 事件类型
   */
  type: string;

  /**
   * 参数
   */
  data?: any;

  /**
   * 框架id数组
   */
  frameIds?: string[];
}

export { FrameEvent };
