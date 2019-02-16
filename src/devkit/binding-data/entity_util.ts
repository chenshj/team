import { Repository } from '../repository/index';
import { Entity, EntityList } from '../entity/index';
import { Modification, ModifyType } from '../changeset/index';
import { ViewChange } from './changes';
import { BindingList } from './binding_list';
import { BindingObject } from './binding_object';
import { BindingProperty, BindingPropertyType } from './binding_property';
import { BindingObjectFactory } from './binding_object_factory';

/**
 * 实体操作工具类
 */
class EntityUtil {

  /**
   * 将entity的数据加载到bindingObject中，并保持两者同步。
   * @param {Entity}        entity        实体对象
   * @param {BindingObject} bindingObject 绑定对象
   */
  static loadEntity(entity: Entity, bindingObject: BindingObject) {

    // 遍历bindingObject的properties进行赋值
    bindingObject.properties.forEach((property: BindingProperty) => {
      const propertyName = property.name;
      if (property.type === BindingPropertyType.List) {
        this.loadEntityList(entity[propertyName], bindingObject[propertyName]);
      } else if (property.type === BindingPropertyType.Object) {
        this.loadEntity(entity[propertyName], bindingObject[propertyName]);
      } else {
        bindingObject.setValue(propertyName, entity[propertyName], false, false);
      }
    });

    this.setUpEntityPipeline(entity, bindingObject);
  }

  /**
   * 建立entity和bindingObject之间的关联
   * @param {Entity}        entity        实体对象
   * @param {BindingObject} bindingObject 绑定对象
   */
  static setUpEntityPipeline(entity: Entity, bindingObject: BindingObject) {

    // 监听entity变更
    entity.onValueChanged.subscribe((modification: Modification) => {
      if (modification.type !== ModifyType.ValueChange || modification.path.length === 0) {
        return;
      }
      const propertyName =  modification.path[modification.path.length - 1];

      // 值没有发生变化，不再设置
      // TODO: 通过bindingObject修改entity属性值时，entity总会触发一个变更回来，如果不截获这个重复的变更，会导致重复或死循环
      if (bindingObject.getValue(propertyName) === modification.value) {
        return;
      }
      bindingObject.setValue(propertyName, modification.value, true, false);
    });

    // 监听bindingObject变更
    bindingObject.viewChanges.subscribe((viewChange: ViewChange) => {
      const propertyName = viewChange.path[0];

      // 如果BindingObject上的属性值和Entity上对应属性值一样，则不再设置
      if (entity[propertyName] === viewChange.value) {
        return;
      }
      entity[propertyName] = viewChange.value;
    });
  }

  /**
   * 将entityList中的Entity对象转换为BindingObject对象，加载到bindingList中，并保持entityList和bindingList同步。
   * @param {EntityList<any>} entityList  实体列表
   * @param {BindingList}     bindingList 绑定列表
   */
  static loadEntityList(entityList: EntityList<any>, bindingList: BindingList) {
    this.loadEntities(entityList.items, bindingList);

    this.setUpEntityListPipeline(entityList, bindingList);
  }

  /**
   * 建立entityList和bindingList之间的关联
   * @param {EntityList<any>} entityList  实体列表
   * @param {BindingList}     bindingList 绑定列表
   */
  static setUpEntityListPipeline(entityList: EntityList<any>, bindingList: BindingList) {

    entityList.onListChanged.subscribe((modification: Modification) => {
      switch (modification.type) {
        case ModifyType.Add:

          // 添加实体
          this.appendEntities(<Entity[]>modification.value, bindingList);
          break;
        case ModifyType.Remove:

          // 删除实体（value格式待商榷，目前value的格式为 { primaryKey: primaryValue}）
          const id = modification.value[bindingList.primaryKey];
          bindingList.removeByIds([id]);
          // this.removeEntities(<Entity[]>modification.value, bindingList);
          break;
        default:
          break;
      }
    });
  }

  /**
   * 监听repository变化，保持repository和bindingList同步。
   * @param {Repository<any>} repository  实体仓库
   * @param {BindingList}     bindingList 绑定列表
   */
  static loadRepository(repository: Repository<any>, bindingList: BindingList) {

    // 初次加载
    const entities = Array.from(repository.entityCollection.toArray());
    this.loadEntities(entities, bindingList);

    // 监听变化
    repository.entityCollectionChange.subscribe((modification: Modification) => {
      switch (modification.type) {
        case ModifyType.Load:
          this.loadEntities(<Entity[]>modification.value, bindingList);
          break;
        case ModifyType.Add:
          this.appendEntities(<Entity[]>modification.value, bindingList);
          break;
        case ModifyType.Remove:
          this.removeEntities(<Entity[]>modification.value, bindingList);
          break;
        default:
          break;
      }
    });
  }

  /**
   * 将entities中的Entity对象转换为BindingObject对象，并加载到bindingList中
   * @param {Entity[]}    entities    实体数组
   * @param {BindingList} bindingList 绑定列表
   */
  static loadEntities(entities: Entity[], bindingList: BindingList) {
    const bindingObjects = this.createBindingObjects(entities, bindingList);
    bindingList.load(bindingObjects);
  }

  /**
   * 将entities中的Entity对象转换为BIndingObject对象，并追加到bindingList中
   * @param {Entity[]}    entities    实体数组
   * @param {BindingList} bindingList 绑定列表
   */
  static appendEntities(entities: Entity[], bindingList: BindingList) {
    const bindingObjects = this.createBindingObjects(entities, bindingList);
    bindingList.append(bindingObjects);
  }

  /**
   * 从bindingList移除entities对应的BindingObject对象
   * @param {Entity[]}    entities    实体数组
   * @param {BindingList} bindingList 绑定列表
   */
  static removeEntities(entities: Entity[], bindingList: BindingList) {
    if (entities === null || entities.length === 0) {
      return;
    }

    // 归集要删除的id数组
    const primaryKey = bindingList.primaryKey;
    const ids = [];
    entities.forEach((entity: Entity) => {
      ids.push(entity[primaryKey]);
    });
    bindingList.removeByIds(ids);
  }

  /**
   * 将entities中的Entity对象转换为BindingObject对象
   * @param {Entity[]}    entities    实体数组
   * @param {BindingList} bindingList 绑定列表
   */
  static createBindingObjects(entities: Entity[], bindingList: BindingList) {

    if (entities === null || entities.length === 0) {
      return [];
    }

    const bindingObjects = [];
    entities.forEach((entity: Entity) => {
      const bindingObject = BindingObjectFactory.create(bindingList.properties);
      this.loadEntity(entity, bindingObject);
      bindingObjects.push(bindingObject);
    });
    return bindingObjects;
  }
}

export { EntityUtil };
