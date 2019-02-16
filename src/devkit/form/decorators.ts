import { Type } from '@angular/core';
import { makePropDecorator } from '../metadata/index';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Form } from './form';
import { ControlValueConverter } from './control_value_converter';

/**
 * ----------------------------------------
 * NgChildForm
 * ----------------------------------------
 */

/**
 * 子表单装饰器名称
 */
export const NG_CHILD_FORM = 'NgChildForm';

/**
 * 子表单描述
 */
export interface NgChildForm {

  /**
   * 子表单类型
   */
  formType: Type<Form>;
}

/**
 * 子表单装饰器
 */
export interface NgChildFormDecorator {
  (obj?: NgChildForm): any;
  new(obj?: NgChildForm): any;
}

/**
 * 子表单装饰器工厂
 */
export const NgChildForm: NgChildFormDecorator =
  makePropDecorator(NG_CHILD_FORM, (obj: NgChildForm) => obj);


/**
 * ----------------------------------------
 * NgChildFormArray
 * ----------------------------------------
 */

/**
 * 子表单数组装饰器名称
 * @type {string}
 */
export const NG_CHILD_FORM_ARRAY = 'NgChildFormArray';

/**
 * 子表单数组描述
 */
export interface NgChildFormArray {

  /**
   * 子表单数组内子表单的类型
   */
  formType: Type<Form>;

  /**
   * 多行记录
   */
  multi?: boolean;
}

/**
 * 子表单数组装饰器
 */
export interface NgFormArrayDecorator {
  (obj?: NgChildFormArray): any;
  new(obj?: NgChildFormArray): any;
}

/**
 * 子表单数组装饰器工厂
 */
export const NgChildFormArray: NgFormArrayDecorator =
  makePropDecorator(NG_CHILD_FORM_ARRAY, (obj: NgChildFormArray) => obj);


/**
 * ----------------------------------------
 * NgFormControl
 * ----------------------------------------
 */

/**
 * 表单控件装饰器名称
 * @type {string}
 */
export const NG_FORM_CONTROL = 'NgFormControl';

/**
 * 表单控件描述
 */
export interface NgFormControl {

  /**
   * 绑定字段路径
   */
  binding?: string;

  /**
   * 值转换器
   */
  valueConverter?: ControlValueConverter;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 控件值更新时机
   */
  updateOn?: 'change' | 'blur' | 'submit';

  /**
   * 同步验证器
   */
  validators?: ValidatorFn|ValidatorFn[]|null;

  /**
   * 异步验证器
   */
  asyncValidatorFn?: AsyncValidatorFn | AsyncValidatorFn | null;
}

/**
 * 表单控件装饰器
 */
export interface NgFormControlDecorator {
  (obj?: NgFormControl): any;
  new(obj?: NgFormControl): any;
}

/**
 * 表单控件装饰器工厂
 */
export const NgFormControl: NgFormControlDecorator =
  makePropDecorator(NG_FORM_CONTROL, (obj: NgFormControl) => obj);
