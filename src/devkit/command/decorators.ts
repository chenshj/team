import { TypeDecorator, makeDecorator, makePropDecorator } from '../metadata/index';

/**
 * ----------------------------------------
 * NgCommandHandler
 * ----------------------------------------
 */

/**
 * 命令处理装饰器名称
 */
export const NG_COMMAND_HANDLER = 'NgCommandHandler';

/**
 * 命令处理描述
 */
export interface NgCommandHandler {

  /**
   * 要处理的名称
   */
  commandName: string;
}

/**
 * 命令处理装饰器接口
 */
export interface NgCommandHandlerDecorator {
  (handler?: NgCommandHandler): TypeDecorator;
  new(handler?: NgCommandHandler): NgCommandHandler;
}

/**
 * 命令处理装饰器工厂
 */

// export const NgCommandHandler: NgCommandHandlerDecorator =
//   makeDecorator(NG_COMMAND_HANDLER, (handler: NgCommandHandler) => handler);
export function NgCommandHandler(options: NgCommandHandler) {
  const decoratorFactory = makeDecorator(NG_COMMAND_HANDLER, (handler: NgCommandHandler) => handler);
  return decoratorFactory(options);
  }

/**
 * ----------------------------------------
 * NgCommandHandlerExtender
 * ----------------------------------------
 */

/**
 * 命令处理扩展装饰器名称
 */
export const NG_COMMAND_HANDLER_EXTENDER = 'NgCommandHandlerExtender';

/**
 * 命令处理扩展描述
 */
export interface NgCommandExtender {
  commandName: string;
}

/**
 * 命令处理扩展装饰器接口
 */
export interface NgCommandHandlerExtenderDecorator {
  (extender?: NgCommandExtender): TypeDecorator;
  new(extender?: NgCommandExtender): NgCommandExtender;
}

/**
 * 命令处理扩展装饰器工厂
 */
export function NgCommandHandlerExtender(options: NgCommandExtender) {
  const decoratorFactory = makeDecorator(NG_COMMAND_HANDLER_EXTENDER, (extender: NgCommandExtender) => extender);
  return decoratorFactory(options);
}
