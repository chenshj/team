import { Injectable } from '@angular/core';
import { VariableParseService } from '../../variable/index';
import { CommandContext } from '../command_context';

/**
 * 任务函数
 * @params result 上一步执行结果
 * @params context 执行上下文
 */
type LinkFunc = (context: CommandContext) => boolean;

/**
 * 任务链接
 */
class TaskLink {

  /**
   * 源任务
   */
  from: string;

  /**
   * 目标任务
   */
  to: string;

  /**
   * 执行条件
   * 1、表达式；
   * 2、布尔值；
   * 3、函数
   */
  condition: string | boolean| LinkFunc;

  /**
   * 构造函数
   */
  constructor(from: string, to: string, condition: string | boolean| LinkFunc) {
    this.from = from;
    this.to   = to;
    this.condition = condition;
  }

  /**
   * 是否能够
   */
  public canLink(context: CommandContext): boolean {
    const type = typeof this.condition;
    let canLink;
    switch (type) {
      case 'boolean':
        canLink = this.condition as boolean;
        break;
      case 'function':
        canLink = (<LinkFunc>this.condition)(context);
        break;
      case 'string':
        const parseService = context.frameContext.injector.get<VariableParseService>(VariableParseService);
        canLink = parseService.evaluate(this.condition as string, context);
        break;
      default:
        canLink = false;
        break;
    }
    return canLink;
  }
}

export { LinkFunc, TaskLink };
