/**
 * session变量解析
 * @author Witt <jiwt@inspur.com>
 */

import { Injectable } from '@angular/core';
import { VariableParser } from './variable_parser';

/**
 * 命令变量解析
 * {COMMAND~/params/key}
 * {COMMAND~/results/taskName}
 */
@Injectable()
class CommandVariableParser implements VariableParser {

  /**
   * 构造函数
   */
  public constructor() {
  }

  /**
   * 解析变量
   * @param expression 变量：格式形如：/frameId/componentId/stateName
   * @param context 上下文
   */
  public parse(expression: string, context: any): any {
    const paths = this.extractPaths(expression);

    // 1、单个的表达式：直接求值
    if (paths.length === 1 && expression === `{COMMAND~${paths[0]}}`) {
      return this.getValue(paths[0], context);
    }

    // 2、其他情况：字符串替换
    paths.forEach( path => {
      const searchValue = `{COMMAND~${path}}`;
      const replaceValue = this.getValue(path, context);
      expression = expression.replace(searchValue, replaceValue);
    });

    return  expression;
  }

  /**
   * 提取Session变量名
   * 变量格式：{}
   */
  private extractPaths(expression: string): string[] {
    const paths: string[]  = [];

    // 查找所有的uiState变量字符串
    const UI_STATE_PATTERN_G = /\{COMMAND~(\S+)\}/g;
    const uiStateVariables = expression.match(UI_STATE_PATTERN_G);
    if (uiStateVariables === null) {
      return [];
    }

    // 提取后边的路径
    const UI_STATE_PATTERN = /\{COMMAND~(\S+)\}/;
    uiStateVariables.forEach( sessionVariable =>  {
      const pathMatches = sessionVariable.match(UI_STATE_PATTERN);
      if (pathMatches != null && pathMatches.length === 2) {
        paths.push(pathMatches[1]);
      }
    });

    return paths;
  }

  /**
   * 获取UIState
   */
  private getValue(path: string, context: any) {
    if (context.constructor.name !== 'CommandContext') {
      throw new Error('当前上下文不支持COMMAND变量，请检查！');
    }
    const parts = path.split('/').filter((part: string) => {
      return part !== '';
    });

    const [type, name] = parts;
    if (type === 'params') {
      return context.command.params[name];
    } else if (type === 'results') {
      return context.results[name];
    }
  }
}

export { CommandVariableParser };
