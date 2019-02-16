/**
 * 绑定列表相关定义
 * @author Witt<jiwt@inspur.com>
 */


import { List } from 'immutable';
import { Subject } from 'rxjs/Subject';

import { Change, ChangeType } from './changes';
import { BindingObject } from './binding_object';
import { BindingProperty } from './binding_property';
import { BindingObjectFactory } from './binding_object_factory';
import { PropertyUtil } from './property_util';

/**
 * BindingList是Entity集合的影射，用于和界面做绑定，它内部存储了一个Immutable的BindingObject列表。
 *
 * ### 展示列表数据
 *
 * BindingList实现了迭代器接口，这使得我们可以使用想for of对它进行遍历，在Angular中，我们可以通过NgForOf指令来将它的数据渲染到界面上。示例代码如下：
 * ```html
 * <tr *ngFor="let dept of deptBindingList">
 *   <th scope="row">{{dept.id}}</th>
 *   <td>{{dept.code}}</td>
 *   <td>{{dept.name}}</td>
 * </tr>
 * ```

 * ### 展示当前行属性
 *
 * BindingList将当前行的BindingObject属性影射到了它自己身上，减少了访问当前行的路径层级，以下两种方式获得的是同一份数据：
 * ```html
 * {{deptBindingList.name}}
 * {{deptBindingList.currentItem.name}}
 * ```
 *
 * **订阅BindingList变更**
 *
 * BindingList的变更流里的变更主要有以下几种类型：
 * - 新增对象变更；
 * - 删除对象变更；
 * - 行切换变更；
 * - 集合内对象向上冒泡的变更。
 *
 * 可以通过以下方式订阅并响应变更：
 * ```ts
 * deptBindingList.changes.subscribe((change: Change) => {
 *  console.log(change);
 * })
 * ```
 */
class BindingList {

  /**
   * immutable的BindingObject列表
   */
  private innerList: List<BindingObject>;

  /**
   * 关联实体的属性集合
   */
  public properties: BindingProperty[];

  /**
   * 主键名
   */
  public primaryKey: string;

  /**
   * 父对象
   */
  public parent: BindingObject;

  /**
   * 变更流
   */
  public changes: Subject<Change>;

  /**
   * 当前行对应的绑定对象的内码
   */
  public currentId: string | number;

  /**
   * 当前行对应的绑定对象
   * @returns {BindingObject}
   */
  public get currentItem(): BindingObject {

    // 如果currentId为null，则创建一个空结构，防止绑定报错；
    if (this.currentId === null) {
      return BindingObjectFactory.create(this.properties);
    }
    return this.findById(this.currentId);
  }

  /**
   * 绑定对象的数量
   * @returns {number}
   */
  public get length(): number {
    return this.innerList.count();
  }

  /**
   * 构造函数
   * @param {BindingProperty[]} properties
   */
  constructor(properties: BindingProperty[]) {
    this.properties = properties;
    this.primaryKey = PropertyUtil.getPrimaryKey(properties);

    this.changes = new Subject<Change>();
    this.innerList = List<BindingObject>();
    this.currentId = null;
  }

  /**
   * 添加[Symbol.iterator]，使之能通过for of遍历
   */
  [Symbol.iterator]() {
    const self = this;
    let index = -1;
    const size = this.innerList.size;

    return {
      next: function() {
        index++;
        if (index < size) {
           return { done: false, value: self.innerList.get(index) };
        }
        return {done: true, value: undefined};
      }
    };
  }

  /**
   * 批量加载绑定对象，加载之前先清空绑定列表，并重置当前行，加载之后将第一行设置为默认当前行。
   * @param {BindingObject[]} objects 要加载绑定对象数组
   */
  public load(objects: BindingObject[]): void {

    // 重置列表
    this.innerList = this.innerList.clear();
    this.currentId = null;

    if (objects.length !== 0) {
      // 加载数据
      objects.forEach((object: BindingObject) => {
        this.add(object);
      });

      // 设置默认当前行
      const firstId = objects[0][this.primaryKey];
      this.setCurrentId(firstId);
    }

    // 触发事件
    this.changes.next({
      type: ChangeType.Load,
      path: [],
      value: objects
    });
  }

  /**
   * 批量追加绑定对象，追加之后将最后一个追加的绑定对象设置为当前行。
   * @param {BindingObject[]} objects 要加载绑定对象数组
   */
  public append(objects: BindingObject[]): void {

    if (objects.length === 0) {
      return;
    }

    // 加载BindingObject
    objects.forEach((object: BindingObject) => {
      this.add(object);
    });

    // 当前行为新追加的最后1行
    const lastId = objects[objects.length - 1][this.primaryKey];
    this.setCurrentId(lastId);

    // 触发事件
    this.changes.next({
      type: ChangeType.Append,
      path: [],
      value: objects
    });
  }

  /**
   * 添加绑定对象，并建立绑定对象和绑定列表之间的关联。
   * @param {BindingObject} object
   */
  public add(object: BindingObject) {
    this.innerList = this.innerList.push(object);
    object.parent = this;

    // 监听object变更，并继续向上抛，由于list有当前行的概念，不需要在path中追加路径
    object.changes.subscribe((change: Change) => {
      this.changes.next(change);
    });
  }

  /**
   * 删除主键值数组对应的绑定对象。
   * @param {Array<string | number>} ids 主键值数组
   */
  public removeByIds(ids: Array<string|number>): void {
    if (!ids || ids.length === 0) {
      return;
    }

    let nextCurrentId = this.currentId;
    ids.forEach((id: string|number) => {

      // 如果当前行被删除，计算下一当前行
      if (id === nextCurrentId) {
        nextCurrentId = this.getCurrentIdBeforeDeleting();
      }

      // 删除对象
      const index = this.getIndexById(id);
      if (index === -1) {
        throw Error(`找不到主键为${id}的实体`);
      }
      this.innerList = this.innerList.delete(index);
    });

    // 重新设置当前行
    this.setCurrentId(nextCurrentId, true);

    // 出发行删除事件
    this.changes.next({
      type: ChangeType.Remove,
      path: [],
      value: ids
    });
  }

  /**
   * 如果当前行被删除，删除之前重新计算当前行的位置，并返回下一当前行的主键值。
   * - 如果被删除的行是最后1行，则上移1行；
   * - 其他情况，下移1行。
   */
  public getCurrentIdBeforeDeleting() {
    let nextIndex = -1;
    const currentIndex = this.getIndexById(this.currentId);
    if (currentIndex === this.length - 1) {
      nextIndex = currentIndex - 1;
    } else {
      nextIndex = currentIndex + 1;
    }
    return this.getIdByIndex(nextIndex);
  }

  /**
   * 根据主键值获取对应绑定对象
   * @param   {string | number}      id 要查找的主键值
   * @returns {BindingObject | null} 找到时返回对应BindingObject， 找不到时返回null
   */
  public findById(id: string|number): BindingObject|null {
    let target: BindingObject;
    target = this.innerList.find((item) => {
      return item.getValue(this.primaryKey) === id;
    });
    return target === undefined ? null : target;
  }

  /**
   * 将主键值为id的绑定对象设置为当前行
   * @param {string | number} id        要设置的主键值
   * @param {boolean}         emitEvent 是否发送当前行变更事件
   */
  public setCurrentId(id: string|number, emitEvent: boolean = true): void {
    if (this.currentId === id) {
      return;
    }
    const currentObj = this.findById(id);
    if (!currentObj) {

      // 找不到统一设置成null
      this.currentId = null;
    } else {
      this.currentId = id;
    }

    // 发出行切换事件
    if (emitEvent === true) {
      this.changes.next({
        type: ChangeType.SelectionChanged,
        path: [],
        value: this.currentItem
      });
    }
  }

  /**
   * 根据主键值为id的绑定对象的索引
   * @param   {string | number} id
   * @returns {number}          找到时返回对应的index，找不到时返回-1
   */
  public getIndexById(id: string| number): number {
    return this.innerList.findIndex((obj: BindingObject) => {
      return obj[this.primaryKey] === id;
    });
  }

  /**
   * 根据索引位置获取对应绑定对象的主键值
   * @reutrn 找到时返回对应主键值，找不到返回null
   */
  public getIdByIndex(index: number): string | number {

    if (index < 0 || index > this.length) {
      return null;
    }

    if (this.innerList.has(index) === false) {
      return null;
    }
    const obj = this.innerList.get(index);
    return obj[this.primaryKey];
  }

  /**
   * 转换为JSON对象
   * @returns {any[]} 普通对象数组
   */
  public toJSON(): any[] {
    const result = [];
    this.innerList.forEach((obj: BindingObject) => {
      result.push(obj.toJSON());
    });
    return result;
  }
}

export { BindingList };
