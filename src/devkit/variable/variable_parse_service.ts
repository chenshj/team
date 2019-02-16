/**
 * 变量解析服务
 * @author Witt<jiwt@inspur.com>
 */

import { Inject, Injectable } from '@angular/core';
import { VariableParser, VARIABLE_PARSERS } from './variable_parser';


/**
 * 变量解析服务
 * 职责：
 * 1、解析字符串中的变量，并替换成相应的值；
 * 2、对表达式进行求值。
 *
 * @todo 对表达式求值的部分和表达式功能重叠，是否转移到表达式中？
 */
@Injectable()
class VariableParseService {

  /**
   * 解析器集合
   */
  private parsers: VariableParser[];

  /**
   * 构造变量解析服务
   * @param parsers 解析器集合
   */
  constructor(@Inject(VARIABLE_PARSERS) parsers: VariableParser[]) {
    this.parsers = parsers;
  }

  /**
   * 解析表达式
   * @param expression 表达式
   * @param context 上下文
   */
  public parse(target: any, context?: any): any {

    if (typeof target === 'string' && target.length > 0) {

      // 字符串，直接解析
      return this.parseExpression(target, context);

    } else if (Array.isArray(target)) {

      // 遍历数组
      target.forEach((item, itemIndex) =>  {
        if (typeof item === 'string') {
          target[itemIndex] = this.parseExpression(item, context);
        } else {
          this.parse(item, context);
        }
      });

    } else if (typeof target === 'object' && target !== null) {

      // 遍历对象可枚举属性
      const keys = Object.keys(target);
      keys.forEach(key => {
        if (typeof target[key] === 'string') {
          target[key] = this.parseExpression(target[key], context);
        } else {
          this.parse(target, context);
        }
      });
    }

    return target;
  }

  /**
   * 表达式求值
   */
  public evaluate(expression: string, context?: any): any {
    const parsedExpression = this.parse(expression, context);
    return (new Function('return ' + parsedExpression))();
  }

  /**
   * 解析表达式
   * @param expression 表达式
   * @param context 上下文
   */
  private parseExpression(expression: string, context: any): string {
    this.parsers.forEach(parser => {
      if (typeof expression === 'string') {
        expression = parser.parse(expression, context);
      }
    });
    return expression;
  }
}

export { VariableParseService };
