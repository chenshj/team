/**
 * 绑定列表工厂相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { BindingList } from './binding_list';
import { BindingProperty } from './binding_property';

/**
 * BindingList工厂用于创建一个空的BindingList对象，并将当前行的属性影射到BindingList对象上。
 *
 * **示例代码**
 * ```ts
 * const deptProperties: BindingProperty[] = PropertyUtil.getProperties(DeptEntity);
 * const deptList = BindingListFactory.create(deptProperties);
 * ```
 */
class BindingListFactory {

  /**
   * 创建BindingList实例，并扩展其属性
   * @param {BindingProperty[]} bindingProperties 绑定属性集合
   */
  static create(bindingProperties: BindingProperty[]): BindingList {
    const bindingList = new BindingList(bindingProperties);
    this.extendProperties(bindingList, bindingProperties);
    return bindingList;
  }

  /**
   * 扩展BindingList属性，将当前行上的属性映射到列表上
   * @param {BindingList}       bindingList       要扩展的绑定列表
   * @param {BindingProperty[]} bindingProperties 绑定属性集合
   */
  static extendProperties(bindingList: BindingList, bindingProperties: BindingProperty[]) {

    bindingProperties.forEach( (bindingProperty: BindingProperty) => {
      const propertyName = bindingProperty.name;
      Object.defineProperty(bindingList, propertyName, {
        get: () => {
          return bindingList.currentItem[propertyName];
        }
      });
    });
  }
}

export { BindingListFactory };

