/**
 * 绑定属性相关定义
 * @author Witt<jiwt@inspur.com>
 */

/**
 * 属性类型
 */
export enum BindingPropertyType {

  /**
   * 简单类型
   */
  Plain  = 'Plain',

  /**
   * 对象类型
   */
  Object = 'Object',

  /**
   * 列表类型
   */
  List   = 'List'
}


/**
 * 绑定属性
 */
export interface BindingProperty {

  /**
   * 属性名称
   */
  name: string;

  /**
   * 属性类型
   */
  type: BindingPropertyType;

  /**
   * 对应实体类型，当属性类型为Object、List类型时，设置该属性。
   */
  entityType?: any;

  /**
   * 是否为主键
   */
  isPrimaryKey?: boolean;

}
