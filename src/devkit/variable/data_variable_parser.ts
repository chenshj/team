/**
 * 数据源变量解析
 * @author Witt <jiwt@inspur.com>
 */
import { Injectable } from '@angular/core';
import { AppContext } from '../context/index';
import { VariableParser } from './variable_parser';
import { ParseUtil } from './parse_util';

/**
 * 数据变量解析
 */
@Injectable()
class DataVariableParser implements VariableParser {

  /**
   * 解析变量
   * @param expression 表达式
   * @param context 上下文
   */
  parse(expression: string, context: any): any {
    const appContext = ParseUtil.getAppContext(context);
    const paths: string[] = this.extractPaths(expression);

    // 1、单个的表达式：直接求值
    if (paths.length === 1 && expression === `{DATA~${paths[0]}}`) {
      return this.getValue(paths[0], appContext);
    }

    // 2、其他情况：字符串替换
    paths.forEach( (path: string) => {
      const searchValue = `{DATA~${path}}`;
      const replaceValue = this.getValue(path, appContext);
      expression = expression.replace(searchValue, replaceValue);
    });

    return  expression;
  }

  /**
   * 提取路径
   */
  private extractPaths(expression: string) {
    const paths: string[]  = [];

    // 查找所有的uiState变量字符串
    const DATA_PATTERN_G = /\{DATA~(\S+)\}/g;
    const dataVariables = expression.match(DATA_PATTERN_G);
    if (dataVariables === null) {
      return [];
    }

    // 提取后边的路径
    const DATA_PATTERN = /\{DATA~(\S+)\}/;
    dataVariables.forEach( dataVariable =>  {
      const pathMatches = dataVariable.match(DATA_PATTERN);
      if (pathMatches != null && pathMatches.length === 2) {
        paths.push(pathMatches[1]);
      }
    });
    return paths;
  }

  /**
   * 获取值
   * @param path 路径：/
   */
  private getValue(path: string, appContext: AppContext): any {
    const parts = path.split('/').filter((part: string) => {
      return part !== '';
    });

    const frameContext = appContext.getFrameContext(parts[0]);
    if (!frameContext) {
      throw new Error(`${path}不正确，请检查！`);
    }

    const bindingData  = frameContext.bindingData;
    if (!bindingData) {
      throw new Error(`${path}不正确，请检查！`);
    }
    return bindingData.getValue(parts.slice(1));
  }


}

export { DataVariableParser };
