import { FrameContext } from '../frame/index';
import { Command } from './command';

/**
 * Command上下文
 */
class CommandContext {

  /**
   * 命令实例
   */
  command: Command;

  /**
   * 组件上下文
   */
  frameContext: FrameContext;

  /**
   * 执行结果
   * 记录每一个task执行的结果
   */
  results: {[taskName: string]: any} = {};

  /**
   * 构造函数
   * @param command 命令
   * @param frameContext 框架上下文
   */
  constructor(command: Command, frameContext: FrameContext) {
    this.command = command;
    this.frameContext = frameContext;
  }

}

export { CommandContext };
