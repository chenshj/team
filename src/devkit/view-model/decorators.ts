import { makePropDecorator } from '../metadata/index';
import { CommandParams,  } from '../command/index';

/**
 * ----------------------------------------
 * NgCommand
 * ----------------------------------------
 */

/**
 * 命令装饰器名称
 * @type {string}
 */
export const NG_COMMAND = 'NgCommand';

/**
 * 命令描述
 */
export interface NgCommand {

  /**
   * 命令名称
   */
  name: string;

  /**
   * 命令参数
   */
  params?: CommandParams;

  /**
   * 框架id
   * 通过frameId确定命令执行的上下文，不指定则默认为当前Frame。
   */
  frameId?: string;
}


/**
 * 命令装饰接口
 */
export interface NgCommandDecorator {
  (ngCommand?: NgCommand): any;
  new(ngCommand?: NgCommand): any;
}

/**
 * 命令装饰器工厂
 * @type {any}
 */
export const NgCommand: NgCommandDecorator =
  makePropDecorator(NG_COMMAND, (obj: NgCommand) => obj);
