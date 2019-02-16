/**
 * 绑定数据相关定义
 * @author Witt<jiwt@inspur.com>
 */

import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Repository } from '../repository/index';
import { Change } from './changes';
import { BindingProperty } from './binding_property';
import { BindingList } from './binding_list';
import { BindingListFactory } from './binding_list_factory';
import { PropertyUtil } from './property_util';
import { EntityUtil } from './entity_util';

/**
 * BindingData用于直接和界面绑定，它持有一个不可变的数据集合（BindingList），数据集合中是一个个不可变的数据对象（BindingObject），
 * 其中BindingList是Repository持有的实体集合在界面绑定层的一个影射，BindingObject是Entity在绑定层的一个影射。
 * 我们通过将实体集合、实体转换成不可变数据结构，提高了Angular的界面渲染效率，减少了绑定层改变引用类型的属性值产生的副作用，
 * 同时通过BindingData、BindingList、BingObject等的封装，我们提供了一些方便界面层的访问数据的API，提供了友好的变更流来和界面交互。
 *
 * ### 定义BindingData

 * 由于BindingData是Repository内实体集合的影射，所以我们需要知道实体来自于哪个Repository，需要知道实体的结构是什么样的，
 * 我们通过NgBindingData注解来指定它们。一个简单的BindingData定义如下：
 * ```ts
 * @Injectable()
 * @NgBindingData({
 *   entity: DeptEntity,
 *   repository: DeptRepository
 * })
 * class BindingDataDemoBindingData extends BindingData {
 *   constructor(injector: Injector) {
 *     super(injector);
 *   }
 * }
 * ```
 *
 * ### 模板中使用BindingData
 *
 * 1、绑定列表数据
 *
 * 通过BindingData的list属性可以访问它持有的列表数据，数据是一个BindingList对象。
 * ```html
 * <tr *ngFor="let dept of deptBindingList">
 *   <th scope="row">{{dept.id}}</th>
 *   <td>{{dept.code}}</td>
 *   <td>{{dept.name}}</td>
 * </tr>
 * ```
 *
 * 2、绑定当前行上的属性
 *
 * BindingData将列表当前行上的数据影射到了它自己身上，并且随着当前行的改变而改变。
 * ```html
 * {{bindingData.name}}
 * ```
 */

@Injectable()
class BindingData {

  /**
   * 可绑定的属性描述
   */
  public properties: BindingProperty[];

  /**
   * 数据列表
   */
  public list: BindingList;

  /**
   * 变更集
   */
  public get changes(): Subject<Change> {
    return this.list.changes;
  }

  /**
   * 初始化
   * @param repository
   */
  public init(repository: Repository<any>) {
    this.properties = PropertyUtil.getProperties(repository.entityType);
    this.list = BindingListFactory.create(this.properties);
    EntityUtil.loadRepository(repository, this.list);
    this.extendProperties(this.properties);
  }

  /**
   * 获取paths对应的属性值
   * @param   {string[]} paths 属性路径数组
   * @returns {any} 属性值
   */
  public getValue(paths: string[]) {
    let target: any = this.list;
    paths.forEach((path: string) => {
      target = target[path];
    });
    return target;
  }

  /**
   * 根据路径指定BindingData后代节点的属性值
   * 该方法的第一个参数是一个路径数组，路径的起点是BindingData的某个属性名（这个属性是映射了BindingData持有的BindingList的当前行的某个属性），
   * 终点是某个层级的属性名。
   *
   * 我们来通过一个比较复杂的BindingData结构来演示路径的写法。假设我们有一个存储员工信息的BindingData，内部的数据如下：
   * ```json
   * ```
   *
   * 可以看到BindingData持有持有一个员工集合，集合内只有一个员工，当然这个员工就是当前行，
   * 员工的后代节点中，诸如edus(教育履历)、jobs(工作履历）是一个BindingList类型的属性，假设他们的当前行和初始时的一样，都是第一行。
   * ```ts
   * // 返回:张三
   * bindingData.getValue(['name']);

   * // 返回：zhangsan@163.com
   * bindingData.getValue(['contactInfo']['email']);
   *
   * // 返回：济南
   * bindingData.getValue(['contactInfo']['address']['city']);
   *
   * // 返回：济南大学
   * bindingData.getValue(['edus']['schoolName']);
   *
   * // 返回：济南
   * bindingData.getValue(['edus']['schoolAddress']['city']);

   * // 返回：语文
   * bindingData.getValue(['edus']['grades']['subject']);
   * ```
   * @param {string[]} paths 属性路径数组
   * @param {any}      value 属性值
   * @param { emitEventToView } 如果设置为true，则发送事件通知订阅它的组件、指令去更新界面，默认为false。
   * @param { emitEventToEntity } 如果设置为true，则同步去更新Entity上对应的字段，默认为true。
   */
  public setValue(paths: string[], value: any, emitEventToView: boolean = false, emitEventToEntity: boolean = true) {
    if (!paths || paths.length === 0) {
      throw Error('路径不能为空');
    }

    const parentPaths = paths.slice(0, paths.length - 1);
    const propName = paths[paths.length - 1];

    let parent = this.getValue(parentPaths);
    if (!parent) {
      throw Error('找不到要设置的对象');
    }
    if (parent instanceof BindingData) {
      parent = parent.list.currentItem;
    } else if (parent instanceof BindingList) {
      parent = parent.currentItem;
    }
    parent.setValue(propName, value, emitEventToView, emitEventToEntity);
  }

  /**
   * 扩展BindingData属性，映射BindingData所持有的绑定列表当前行的属性，减少绑定层级。
   * @param {BindingProperty[]} properties 关联实体的属性集合
   */
  private extendProperties(properties: BindingProperty[]) {
    properties.forEach( (property: BindingProperty) => {
      const propName = property.name;
      Object.defineProperty(this, propName, {
        get: () => {
          return this.list.currentItem[propName];
        },
        set: (value: any) => {
          this.list.currentItem[propName] = value;
        }
      });
    });
  }
}

export { BindingData };
