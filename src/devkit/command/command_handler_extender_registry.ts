/**
 * 命令处理扩展注册器相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable, Optional, Inject } from '@angular/core';
import { MetadataUtil } from '../metadata/index';
import { NG_COMMAND_HANDLER_EXTENDER, NgCommandExtender } from './decorators';
import { COMMAND_HANDLER_EXTENDERS_TOKEN, CommandHandlerExtender } from './command_handler_extender';

/**
 * 命令处理扩展注册器
 */
@Injectable()
class CommandHandlerExtenderRegistry {

  /**
   * CommandHandlerExtender实例Map
   * - key：命令名称
   * - value：命令扩展实例
   */
  private extendersMap: Map<string, CommandHandlerExtender[]>;

  /**
   * 构造函数
   * @param extenders 命令扩展实例数组
   */
  constructor(@Optional() @Inject(COMMAND_HANDLER_EXTENDERS_TOKEN)extenders: CommandHandlerExtender[]) {
    const self = this;
    this.extendersMap = new Map<string, CommandHandlerExtender[]>();
    if (extenders) {
      extenders.forEach((extender: CommandHandlerExtender) => {
        self.regist(extender);
      });
    }
  }

  /**
   * 获取命令扩展实例数组
   * @param   commandName 命令名称
   * @returns 命令处理扩展实例数组
   */
  get(commandName: string): CommandHandlerExtender[] {
    if (this.extendersMap.has(commandName) === false) {
      return [];
    }
    return this.extendersMap.get(commandName);
  }

  /**
   * 添加命令扩展
   * @param commandName Command名称
   * @param extender    CommandHandlerExtender实例
   * @return void
   */
  set(commandName: string, extender: CommandHandlerExtender) {
    if (this.extendersMap.has(commandName)) {

      // 如果commandName对应的扩展已经存在，则在扩展数组中追加
      this.extendersMap.get(commandName).push(extender);
    } else {

      // 如果不存在，则创建新的扩展数组，并追加
      this.extendersMap.set(commandName, [extender]);
    }
  }

  /**
   * 注册命令扩展
   * @param extender CommandHandlerExtender实例
   */
  regist(extender: CommandHandlerExtender) {

    // 通过元数据获取要扩展的Comamnd名称
    const extenderMetadata: NgCommandExtender =
      MetadataUtil.getClassMetadataByName(extender.constructor, NG_COMMAND_HANDLER_EXTENDER);
    if (!extenderMetadata) {
      throw new Error('CommandHandlerExtender必须指定要扩展的命令名称');
    }
    const commandName = extenderMetadata.commandName;

    // 添加到Map中
    this.set(commandName, extender);
  }

}

export { CommandHandlerExtenderRegistry };
