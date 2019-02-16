/**
 * BindingObject相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Subject } from 'rxjs/Subject';
import { Map } from 'immutable';

import {Change, ChangeType, ViewChange, ViewChangeType} from './changes';
import { BindingProperty, BindingPropertyType } from './binding_property';
import { BindingList } from './binding_list';
import { PropertyUtil } from './property_util';

/**
 * BindingObject是Entity的一个影射，它将Entity内的数据转换为不可变对象，并用于界面绑定。
 *
 * ### 扩展属性类型
 *
 * Entity支持对象、集合相互嵌套，BindingObject也是一样，一个BindingObjec可以包含以下三类属性：
 * - 普通属性：number、string、boolean等简单类型；
 * - 对象属性：BindingObject类型，它是子Entity的影射；
 * - 集合属性：BindingList类型，它是子EntityList的影射。
 *
 * ### 变更订阅
 *
 * BindingObject拥有两种类型的变更流：
 * - changes：当实体属性值发生变化或者通过编码的形式修改BindingObject属性值时想该变更流中发送变更；
 * - viewChanges：当界面层引起BindingObject的属性值发生变化时，会触发类变更，我们内部会将此类变更同步到Entity上。
 */
class BindingObject {

  /**
   * immutable值对象
   */
  private innerValues: Map<string, any>;

  /**
   * 父对象或父列表
   */
  public parent: BindingList | BindingObject;

  /**
   * 实体引起的变更
   */
  public changes: Subject<Change>;

  /**
   * 界面层引起的变更流
   */
  public viewChanges: Subject<ViewChange>;

  /**
   *  属性集合
   */
  public properties: BindingProperty[];

  /**
   * 主键名
   */
  public primaryKey: string;

  /**
   * 构造函数
   * @param {BindingProperty[]} properties 属性集合
   */
  constructor(properties: BindingProperty[]) {
    this.properties = properties;
    this.primaryKey = PropertyUtil.getPrimaryKey(properties);

    this.innerValues = Map<string, any>();
    this.changes = new Subject<Change>();
    this.viewChanges = new Subject<ViewChange>();
  }

  /**
   * 根据属性名获取属性值
   * @param   {string} propertyName 属性名
   * @returns {any}
   */
  public getValue(propertyName: string): any {
    return this.innerValues.get(propertyName);
  }

  /**
   * 设置属性值
   * @param {string}  propertyName      属性名
   * @param { any }   propertyValue     属性值
   * @param {boolean} emitEventToView   是否通知View层去更新界面，默认为false
   * @param {boolean} emitEventToEntity 是否通知Entity层去更新值，默认为false
   */
  public setValue(propertyName: string, propertyValue: any, emitEventToView: boolean = false, emitEventToEntity: boolean = false) {
    this.innerValues = this.innerValues.set(propertyName, propertyValue);
    if (emitEventToView === true) {
      this.changes.next({
        type: ChangeType.ValueChanged,
        path: [propertyName],
        value: propertyValue
      });
    }

    if (emitEventToEntity) {
      const viewChange = {
        type: ViewChangeType.ValueChanged,
        path: [propertyName],
        value: propertyValue,
      };
      this.viewChanges.next(viewChange);
    }
  }

  /**
   * 将BindingObject实例转换成JSON对象
   */
  public toJSON(): any {
    const result = {};
    this.properties.forEach((property: BindingProperty) => {
      const propName = property.name;
      if (property.type === BindingPropertyType.List) {
        const list: BindingList = this[propName];
        result[propName] = list.toJSON();
      } else if (property.type === BindingPropertyType.Object) {
        const object: BindingObject = this[propName];
        result[propName] = object.toJSON();
      } else {
        result[propName] = this.getValue(propName);
      }
    });

    return result;
  }
}

export { BindingObject };
