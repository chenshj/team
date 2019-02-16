/**
 * 命令处理器工厂相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable } from '@angular/core';
import { FrameContext } from '../frame/frame_context';
import { CommandHandler } from './command_handler';
import { CommandHandlerRegistry } from './command_handler_registry';
import { CommandHandlerExtender } from './command_handler_extender';
import { CommandHandlerExtenderRegistry } from './command_handler_extender_registry';

/**
 * 命令处理器工厂
 */
@Injectable()
class CommandHandlerFactory {

  /**
   * 构造函数
   * @param handlerRegistry  命令处理注册器
   * @param extenderRegistry 命令处理扩展注册器
   */
  constructor(
    private handlerRegistry: CommandHandlerRegistry,
    private extenderRegistry: CommandHandlerExtenderRegistry,
    private frameContext: FrameContext
  ) {
  }

  /**
   * 创建命令处理器
   * @param   commandName 命令名称
   * @returns 对应的命令处理器实例
   */
  public create(commandName: string): CommandHandler {
    const rawHandler = this.handlerRegistry.get(commandName);
    rawHandler.init(this.frameContext);
    const extenders  = this.extenderRegistry.get(commandName);

    // 遍历extenders，依次对handler进行扩展
    return extenders.reduce((handler: CommandHandler, extender: CommandHandlerExtender) => {
      return extender.extend(handler);
    }, rawHandler);
  }

}

export { CommandHandlerFactory };
