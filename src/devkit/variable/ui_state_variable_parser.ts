/**
 * session变量解析
 * @author Witt <jiwt@inspur.com>
 */

import { Injectable } from '@angular/core';
import { VariableParser } from './variable_parser';
import { AppContext } from '../context/index';
import { ParseUtil } from './parse_util';

/**
 * 数据变量解析
 */
@Injectable()
class UIStateVariableParser implements VariableParser {

  /**
   * 解析变量
   * @param expression 变量：格式心如：/frameId/componentId/stateName
   * @param context 上下文
   */
  public parse(expression: string, context: any): any {

    const appContext = ParseUtil.getAppContext(context);
    const paths = this.extractPaths(expression);

    // 1、单个的表达式：直接求值
    if (paths.length === 1 && expression === `{UISTATE~${paths[0]}}`) {
      return this.getUIState(paths[0], appContext);
    }

    // 2、其他情况：字符串替换
    paths.forEach( path => {
      const searchValue = `{UISTATE~${path}}`;
      const replaceValue = this.getUIState(path, appContext);
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
    const UI_STATE_PATTERN_G = /\{UISTATE~(\S+)\}/g;
    const uiStateVariables = expression.match(UI_STATE_PATTERN_G);
    if (uiStateVariables === null) {
      return [];
    }

    // 提取后边的路径
    const UI_STATE_PATTERN = /\{UISTATE~(\S+)\}/;
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
  private getUIState(path: string, appContext: AppContext) {
    const parts = path.split('/').filter((part: string) => {
      return part !== '';
    });
    const [frameId, componentId, stateName] = parts;
    const frameContext = appContext.getFrameContext(frameId);
    const state = frameContext.uiState.getState(componentId, stateName);
    return state;
  }
}

export { UIStateVariableParser };
