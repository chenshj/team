/**
 * 命令处理扩展相关
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable, InjectionToken } from '@angular/core';
import { CommandHandler } from './command_handler';

/**
 * 命令处理扩展抽象类
 *
 * CommandHandler由一个个Task串联而成，这些Task不是一成不变，
 * 通过CommandHandlerExtender可以在不同的时机对它扩展，
 * 通过它我们可以在任务之后新增一个任务或者替换掉原来的一个任务。
 *
 * ### 定义并注册扩展
 *
 * **定义一个扩展**
 *
 * 按如下步骤可以实现一个扩展：
 * - 继承CommandHandlerExtender抽象基类；
 * - 实现extend方法，在其内部对任务进行扩展、替换；
 * - 添加NgCommandHandlerExtender指定要扩展的命令。
 *
 * ```ts
 * @Injectable()
 * @NgCommandHandlerExtender({
 *    commandName: 'formLoad'
 *  })
 * class FormLoadExtender extends CommandHandlerExtender {
 *
 *   extend(handler: CommandHandler): CommandHandler {
 *
 *     // 扩展一个任务
 *     handler.extendTask('loadData', (originalResult) => {
 *       console.log('do sth. to the original result');
 *     });
 *
 *     // 替换一个任务
 *     handler.extendTask('transitState', () => {
 *       console.log('transit to other state');
 *     });
 *
 *     return handler;
 *   }
 * }
 * ```
 * 在extend方法内部：
 * - 通过extendTask方法扩展任务，一个任务可以被多次扩展，多个扩展依次附加到原来的任务之上；
 * - 通过replaceTask方法替换任务，一个任务可以被多次替换，以最后一个替换为准。
 *
 * **注册扩展**
 *
 * 我们将包含FormLoadHandlerExtender的数组传递给CommandModule.setup方法，
 * 由它来统一进行注册。
 * ```ts
 * @NgModule({
 *   imports: [
 *     CommandModule.setup([FormLoadHandler], [FormLoadHandlerExtender])
 *   ]
 * })
 * class SimpleModule {}
 * ```
 */
@Injectable()
abstract class CommandHandlerExtender {

  /**
   * 扩展方法
   * @param handler 要扩展的命令处理器
   */
  abstract extend(handler: CommandHandler): CommandHandler;

}


/**
 * 命令处理器扩展注入Token
 */
const COMMAND_HANDLER_EXTENDERS_TOKEN = new InjectionToken<CommandHandlerExtender>('@farris/devkit CommandHandler Extenders');

export { CommandHandlerExtender, COMMAND_HANDLER_EXTENDERS_TOKEN };
