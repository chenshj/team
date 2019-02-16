import { Modification, ModifyType } from '../changeset/index';
import { Subject } from 'rxjs/Subject';
import { Entity } from '../entity/index';

/**
 * 实体集合
 * @todo：应该用EntityList代替。
 */
class EntityCollection<T extends Entity> {

  /**
   * 内部实体Set
   */
  private readonly innerEntitySet: Set<T>;

  /**
   * 内部实体Map
   */
  private readonly innerEntityMap: Map<string, T>;


  /**
   * Entity集合变更流
   */
  public collectionChanged: Subject<Modification>;

  /**
   * 构造函数
   */
  constructor(private primaryKey: string) {
    this.innerEntitySet = new Set<T>();
    this.innerEntityMap = new Map<string, T>();
    this.collectionChanged = new Subject<Modification>();
  }

  /**
   * 实体数量
   */
  public count(): number {
    return this.innerEntitySet.size;
  }

  /**
   * 是否包含指定主键值的实体
   * @param id 主键值
   */
  public has(id: string): boolean {
    return this.innerEntityMap.has(id);
  }

  /**
   * 清空全部实体
   */
  public clear() {
    this.innerEntityMap.clear();
    this.innerEntitySet.clear();
    this.notifyCollectionChanged(new Modification([], ModifyType.Load));
  }

  /**
   * 转换为数组
   */
  public toArray() {
    return Array.from(this.innerEntitySet);
  }

  /**
   * 批量加载实体
   */
  public loadEntities(entities: any[]) {

    this.innerEntityMap.clear();
    this.innerEntitySet.clear();

    entities.forEach(entity => {
        this.innerEntitySet.add(entity);
        this.innerEntityMap.set(entity[this.primaryKey], entity);
    });
    this.notifyCollectionChanged(new Modification(entities, ModifyType.Load));

  }

  /**
   * 追加实体
   * @param entity 要追加的实体
   */
  public addEntity(entity: T) {
    this.verifyEntityToAdd(entity);
    this.innerEntitySet.add(entity);
    this.innerEntityMap.set(entity[this.primaryKey], entity);
    this.notifyCollectionChanged(new Modification([entity], ModifyType.Add));
  }

  /**
   * 批量追加实体
   * @param entity
   */
  public addEntities(entities: T[]) {
    if (!entities) {
      return;
    }
    const entitiesToAdd: T[] = [];
    entities.forEach(entity => {
        this.verifyEntityToAdd(entity);
        entitiesToAdd.push(entity);
    });
    entitiesToAdd.forEach(entity => {
        this.innerEntitySet.add(entity);
        this.innerEntityMap.set(entity[this.primaryKey], entity);
    });
    this.notifyCollectionChanged(new Modification(entitiesToAdd, ModifyType.Add));
  }



  /**
   * 根据主键值获取实体
   */
  getEntityById(identity: string): T {
    const entity = this.innerEntityMap.get(identity);
    if (!entity) {
        throw new Error(`Can not find the entity with identity of '${identity}'`);
    }
    return entity;
  }

  /**
   * 返回符合指定条件的实体集合
   * @param predicate 条件谓词
   */
  getEntities(predicate: (value: T, index: number, array: T[]) => T): T[] {
    const entities: T[] = Array.from(this.innerEntitySet);
    const matchedEntities = entities.filter(predicate);
    return matchedEntities;
  }

  /**
   * 获取全部实体
   */
  getAllEntities(): T[] {
    return Array.from(this.innerEntitySet);
  }

  /**
   * 根据主键值删除对应实体
   * @param identity 主键值
   */
  removeEntityById(identity: string): T {
    this.verifyEntityToRemove(identity);
    const entityToRemove = this.innerEntityMap.get(identity);
    this.innerEntityMap.delete(identity);
    this.innerEntitySet.delete(entityToRemove);
    this.notifyCollectionChanged(new Modification([entityToRemove], ModifyType.Remove));
    return entityToRemove;
  }

  removeEntitiesByIds(id: string) {
  }

  /**
   * 删除符合条件的实体集合
   */
  public removeEntities(predicate: (value: T, index: number, array: T[]) => T): T[] {
    const entitiesToRemove = Array.from(this.innerEntitySet).filter(predicate);
    entitiesToRemove.forEach(entityToRemove => {
        this.innerEntityMap.delete(entityToRemove[this.primaryKey]);
        this.innerEntitySet.delete(entityToRemove);
    });
    this.notifyCollectionChanged(new Modification(entitiesToRemove, ModifyType.Remove));
    return entitiesToRemove;
  }

  /**
   * 验证实体是否能够添加
   */
  private verifyEntityToAdd(entity: T): boolean {
    if (this.has(entity[this.primaryKey])) {
        throw new Error(`The repository already had an item with the save identity of '${entity[this.primaryKey]}'`);
    }
    return true;
  }

  /**
   * 验证实体是否能移除
   */
  private verifyEntityToRemove(identity: string): boolean {
    if (!this.has(identity)) {
        throw new Error(`The entity with identity of '${identity} dose not exsit.'`);
    }
    return true;
  }

  /**
   * 实体集合变更流
   */
  private notifyCollectionChanged(modification: Modification) {
    this.collectionChanged.next(modification);
  }

}

export { EntityCollection };
