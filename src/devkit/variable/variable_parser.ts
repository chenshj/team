/**
 * session变量解析
 * @author Witt <jiwt@inspur.com>
 */

import { Injectable, InjectionToken } from '@angular/core';

/**
 * 变量解析接口
 */
interface VariableParser {
  parse(expression: string, context: any): any;
}

const VARIABLE_PARSERS = new InjectionToken<VariableParser>('variable parsers');

export { VariableParser, VARIABLE_PARSERS };
