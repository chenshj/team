/**
 * CommandBus相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable } from '@angular/core';
import { Command } from './command';
import { CommandHandlerFactory } from './command_handler_factory';

/**
 * CommandBus用于派发Command，它接受一个Command实例，查找对应的CommandHandler，并执行。
 * ViewModel内部有两种方式使用CommandBus派发Command：
 * - 通过NgCommand注解装饰的方法，在被调用时会自动派发注解指定的Command；
 * - 通过commandBus属性获得CommandBus实例，编码的方式派发Command。
 *
 * ### 编码方式派发任务
 *
 * 我们可以在ViewModel的方法中构造Command实例并派发它。
 * ```ts
 * @Injectable()
 * @NgViewModel({
 * })
 * class SimpleViewModel extends ViewModel {
 *
 *   public remove(id: string) {
 *     const removeCommand: Command = {
 *       name: 'remove',
 *       params: { id: id }
 *     };
 *     this.commandBus.dispatch(removeCommand);
 *   }
 * }
 * ```
 * ### Command是如何被派发的？
 *
 * **Command名称的应用**
 *
 * 要了解Command的派发过程，我们我们需要了解一个重要的概念：Command名称。
 * Command名称是一个Command的唯一标识，它是CommandModule中各个组成部分之间的纽带，贯穿了Command的整个生命周期。
 *
 * - 创建Comamnd示例时必须为其指定一个名称；
 * - 使用NgCommand注解将Command绑定到ViewModel的一个方法上时，需要指定命令名称；
 * - 使用NgCommandHandler注解指定CommandHandler要处理的Command时，需要指定Command名称；
 * - 使用NgCommandHandlerExtender指定要扩展的CommandHandler时，需要指定CommandHandler对应的Command名称
 *
 * **CommandHandler、CommandHandlerExtender的注册**
 *
 * - 使用CommandModule的setup方法，将所有的CommandHandler、CommandHandlerExtender加入到模块Providers中；
 * - 创建CommandHandlerRegistry，并注入所有的CommandHandler实例；
 * - 创建CommandHandlerExtenderRegistry，并注入所有的CommandHandlerExtender实例。
 * 经过以上三个步骤，所有的CommandHandler、CommandHandlerExtender均已被实例化，并被注册到了响应的Registry中。
 *
 * **Command的派发**
 *
 * - ViewModel上响应用户操作，调用CommandBus派发动作；
 * - CommandBus调用CommandHandlerFactory创建对应的CommandHandler示例；
 * - CommandHandlerFactory按Command名称到CommandHandlerRegistry查找对应的CommandHandler实例；
 * - CommandHandlerFactory按Command名称到CommandHandlerExtenderRegistry查找对应的CommandHandlerExtender实例集合；
 * - CommandHandlerFactory使用Extender对CommandHanler实例进行扩展，并返回扩展之后的CommandHandler实例；
 * - CommandBus中执行CommandHandler的execute方法，执行具体的任务。
 */
@Injectable()
class CommandBus {

  /**
   * handler工厂
   */
  private handlerFactory: CommandHandlerFactory;

  /**
   * 构造函数
   */
  public constructor(handlerFactory: CommandHandlerFactory) {
    this.handlerFactory = handlerFactory;
  }

  /**
   * 派发命令
   * @param command 要派发的命令
   */
  public dispatch(command: Command) {
    const commandName = command.name;
    const handler = this.handlerFactory.create(commandName);
    handler.execute(command);
  }

}

export { CommandBus };
