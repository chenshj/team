/**
 * 绑定对象工厂相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Change } from './changes';
import { PropertyUtil } from './property_util';
import { BindingProperty, BindingPropertyType } from './binding_property';
import { BindingObject } from './binding_object';
import { BindingListFactory } from './binding_list_factory';

/**
 * BindingObject工厂用于创建一个空的BindingObject对象，并对其属性进行扩展。
 *
 * **扩展属性处理**
 *
 * 对于要扩展的属性（BindingProperty）有三种处理：
 * - 普通属性：初始化为一个undefined，并包装get、set方法，通过set方法监听变更；
 * - 对象属性：初始化为一个空的BindingObject对象，并监听子对象的变更；
 * - 列表属性：初始化为一个空的BindingList对象，并监听子列表的变更；
 *
 * **示例代码**
 *
```ts
const empProperties = PropertyUtil.getProperties(EmpEntity);
const empBindingObject = BindingObjectFactory.create(properties);
```
 */
class BindingObjectFactory {

  /**
   * 创建BindingObject实例
   * @param   {BindingProperty[]} properties 要扩展的属性集合
   * @returns {BindingObject} 带扩展属性的空BindingObject对象
   * @
   */
  static create(properties: BindingProperty[]): BindingObject {
    const object = new BindingObject(properties);
    this.extendProperties(object, properties);
    return object;
  }

  /**
   * 扩展属性绑定对象的属性
   * @param {BindingObject}     object     要扩展的绑定对象
   * @param {BindingProperty[]} properties 绑定属性集合
   */
  static extendProperties(object: BindingObject, properties: BindingProperty[]): void {

    // 扩展BindingObject属性
    properties.forEach((property: BindingProperty) => {
      if (property.type === BindingPropertyType.List) {
        this.extendListProperty(object, property);
      } else if (property.type === BindingPropertyType.Object) {
        this.extendObjectProperty(object, property);
      } else {
        this.extendPlainProperty(object, property);
      }
    });
  }

  /**
   * 扩展列表类型的绑定属性
   * @param {BindingObject}     object     要扩展的绑定对象
   * @param {BindingProperty[]} properties 列表类型的绑定属性集合
   */
  static extendListProperty(object: BindingObject, property: BindingProperty): void {
    const propertyName = property.name;
    const childListProperties = PropertyUtil.getProperties(property.entityType);
    const childList = BindingListFactory.create(childListProperties);

    // 指定子List的parent、监听子List的changes事件
    childList.parent = object;
    childList.changes.subscribe((change: Change) => {
      change.path.unshift(propertyName);
      object.changes.next(change);
    });

    // 将子的BindingList实例赋值给当前属性
    Object.defineProperty(object, propertyName, {
      value: childList
    });
  }

  /**
   * 扩展对象类型的绑定属性
   * @param {BindingObject}     object     要扩展的绑定对象
   * @param {BindingProperty[]} properties 对象类型的绑定属性集合
   */
  static extendObjectProperty(object: BindingObject, property: BindingProperty): void {
    const propertyName = property.name;
    const childObjectProperties = PropertyUtil.getProperties(property.entityType);
    const childObject = this.create(childObjectProperties);

    // 指定子Object的parent、监听子Object的changes事件
    childObject.parent = object;
    childObject.changes.subscribe((change: Change) => {
      change.path.unshift(propertyName);
      object.changes.next(change);
    });

    Object.defineProperty(object, propertyName, {
      value: childObject
    });
  }

  /**
   * 扩展简单类型的绑定属性
   * @param {BindingObject}     object     要扩展的绑定对象
   * @param {BindingProperty[]} properties 简单类型的绑定属性集合
   */
  static extendPlainProperty(object: BindingObject, property: BindingProperty): void {
    const propertyName = property.name;
    Object.defineProperty(object, propertyName, {
      get: () => {
        return object.getValue(propertyName);
      }
    });
  }

}

export { BindingObjectFactory };
