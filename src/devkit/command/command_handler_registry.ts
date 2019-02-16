/**
 * 命令处理注册器相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable, Optional, Inject } from '@angular/core';
import { MetadataUtil } from '../metadata/index';
import { NG_COMMAND_HANDLER, NgCommandHandler } from './decorators';
import { COMMAND_HANDLERS_TOKEN, CommandHandler } from './command_handler';


/**
 * 命令处理注册器
 */
@Injectable()
class CommandHandlerRegistry {

  /**
   * CommandHandler Map
   */
  private handlerMap: Map<string, CommandHandler>;

  /**
   * 构造函数
   * @param handlers 命令处理实例数组
   */
  constructor(@Optional() @Inject(COMMAND_HANDLERS_TOKEN)handlers: CommandHandler[]) {
    const self = this;
    this.handlerMap = new Map<string, CommandHandler>();
    if (handlers) {
      handlers.forEach((handler: CommandHandler) => {
        self.regist(handler);
      });
    }
  }

  /**
   * 添加命令处理
   * @param  commandName    命令名称
   * @param  commandHandler 命令处理实例
   */
  public set(commandName: string, commandHandler: CommandHandler) {
    if (this.handlerMap.has(commandName)) {
      throw new Error(commandName + '对应的CommandHandler已经存在');
    }
    this.handlerMap.set(commandName, commandHandler);
  }

  /**
   * 获取命令处理
   * @param   commandName 命令名称
   * @returns 命令处理实例
   */
  public get(commandName: string): CommandHandler {
    if (this.handlerMap.has(commandName) === false) {
      throw new Error('找不到' + commandName + '对应的CommandHandler');
    }
    return this.handlerMap.get(commandName);
  }

  /**
   * 注册命令处理
   * @param handlers 命令处理实例
   */
  public regist(commandHandler: CommandHandler) {

    // 根据metadata获取对应的Command名称
    const handlerMetadata: NgCommandHandler =
      MetadataUtil.getClassMetadataByName(commandHandler.constructor, NG_COMMAND_HANDLER);
    if (!handlerMetadata) {
      throw new Error('CommandHandler必须指定要处理的命令名称');
    }
    const commandName = handlerMetadata.commandName;
    this.set(commandName, commandHandler);
  }

}

export { CommandHandlerRegistry };
