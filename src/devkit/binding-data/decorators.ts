/**
 * 绑定装饰器相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Type } from '@angular/core';
import { TypeDecorator, makeDecorator } from '../metadata/index';
import { Repository } from '../repository/index';
import { Entity } from '../entity/index';

/**
 * NgBindingData装饰器名称
 * @formType {string}
 */
export const NG_BINDING_DATA = 'NgBindingData';

/**
 * NgBindingData
 */
export interface NgBindingData {

  // /**
  //  * 关联entity类型
  //  */
  // entity: Type<Entity>;

  /**
   * 关联repository类型
   */
  repository: Type<Repository<any>>;
}

/**
 * NgBindingContextDecorator
 */
export interface NgBindingDataDecorator {

  (obj?: NgBindingData): TypeDecorator;

  new(obj?: NgBindingData): NgBindingData;

}

/**
 * NgBindingContext
 */

// export const NgBindingData: NgBindingDataDecorator =
//   makeDecorator(NG_BINDING_DATA, (obj: NgBindingData) => obj);
export function NgBindingData(options: NgBindingData) {
  const decoratorFactory = makeDecorator(NG_BINDING_DATA, (obj: NgBindingData) => obj);
  return decoratorFactory(options);
}
