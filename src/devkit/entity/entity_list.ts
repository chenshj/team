import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { remove } from 'lodash-es';

import { Entity } from './entity';
import { EntityFactory } from './entity_factory';
import { PARENT_CLASS, PARENT_PATH, ClassType } from './types';
import { ChangeSet } from '../changeset/change_set';
import {Modification, ModifyType} from '../changeset/types';
import { Validator } from './validator/validator';
import { ValidationResult } from './validator/types';

export interface IList<T> {
    [index: number]: T;
}
/**
 * 实体集合列表
 */
export class EntityList<T extends Entity> implements IList<T>, Iterable<T> {
    /** 获取指定索引处的值 */
    [index: number]: T;

    private listChanged = new Subject<Modification>();

    /**
     * 集合改变时触发(新增、行记录修改、删除)
     * @event
     */
    onListChanged = this.listChanged.asObservable();

    private rawData: T[];
    private changeSet = new ChangeSet();

    private validator = new Validator<T>();

    /**
     * @constructor
     * @param data JSON数据集合
     * @param type 集合中的实体类型
     */
    constructor(data?: any[], type?: ClassType) {
        this.clear();
        if (data) {
            // this.loadEntities(data);
            data.forEach(item => {
                this.initEntity(EntityFactory(type, item));
            });
        }
    }

    /** 加载实体列表 */
    loadEntities(data: T[]) {
        this.clear();
        data.forEach(entity => {
            this.initEntity(entity);
        });
    }
    /** 清空 */
    clear() {
        this.rawData = [];
    }

    /** 获取项集合 */
    get items(): T[] {
        return this.rawData;
    }

    /** 列表变更集 */
    get changes() {
        return this.changeSet.changes;
    }

    /**
     * 添加实体对象到集合中，并返回新加的对象
     * @param entity 实体对象
     */
    appendNew(entity: T): T {
        const newEntity = this.initEntity(entity);

        const changeItem = {
            path: [], value: [newEntity], type: ModifyType.Add
        };

        this.setChanges(changeItem);
        return newEntity;
    }

    /**
     * 实体初始化
     * @param entity 实体
     */
    private initEntity(entity: T): T {
        entity[PARENT_CLASS] = this;
        entity[PARENT_PATH] = this[PARENT_PATH];
        entity.onValueChanged.subscribe((v: Modification) => {
            const path = v.path;
            const value = v.value;
            const preValue = v.preValue;
            const operator = v.type;
            const subChanges = { path, value, preValue, type: operator };
            this.setChanges(subChanges);
        });
        // TODO: 添加数据验证逻辑代码
        const newLength = this.rawData.push(entity);
        this[newLength - 1] = entity;

        return entity;
    }

    /**
     * 删除指定主键ID 的实体对象，返回布尔，true 删除成功，false 删除失败
     * @param primaryId 主键ID
     */
    remove(primaryId: string): boolean {
        const total = this.count();
        const deletedItem = remove(this.rawData, (item) => {
            return item.primaryValue === primaryId;
        });

        if (deletedItem && deletedItem.length) {
            const changeItem = {
                path: [],
                value: { [deletedItem[0].primaryProperty.dataField]: primaryId },
                type: ModifyType.Remove
            };

            this.updateIndex(total);
            this.setChanges(changeItem);
        }

        return deletedItem.length > 0;
    }

    /**
     * 从集合中获取指定ID值的实体对象
     * @param id 主键值
     */
    get(id: string) {
        return this.items.find(item => {
            return item.primaryValue === id;
        });
    }

    /**
     * 将变更记录添加到集合变更集中
     * @param value 变更记录
     */
    setChanges(modinfo: Modification) {
        this.listChanged.next(modinfo);
        if (modinfo.type === ModifyType.Add && modinfo.value[0] instanceof Entity) {
            modinfo.value[0] = modinfo.value[0].data;
        }
        this.changeSet.append(modinfo);
    }

    toJson() {
        return this.rawData;
    }

    /** 集合总记录数 */
    count() {
        return this.items.length;
    }

    /**
     * 获取实体对象的索引值
     */
    indexOf(entity: T): number {
        return this.items.indexOf(entity);
    }

    /**
     * 计算集合中某个属性的总和
     * @param propertyName 属性名称
     */
    sum(propertyName: string): number {
        if (this.count() === 0) {
            return 0;
        }
        return this.items.reduce((val, curr: T) => {
            return val + curr[propertyName];
        }, 0);
    }

    /**
     * 更新索引
     * @param total 总记录数
     */
    private updateIndex(total: number) {
        for (let i = 0; i < total; i++) {
            delete this[i];
        }
        this.rawData.forEach((entity, index) => {
            this[index] = entity;
        });
    }

    /**
     * 获取属性名称
     */
    private getPropertyName() {
        const path = this[PARENT_PATH];
        if (path && path.length) {
            const name = path[path.length - 1];
            return name;
        }
        return undefined;
    }

    /**
     * 集合数据验证
     */
    validate(): Observable<ValidationResult> {
        const propertyName = this.getPropertyName();
        return fromPromise(this.validator.validate(this[PARENT_CLASS], propertyName));
    }

    *[Symbol.iterator](): Iterator<T> {
        yield* this.items;
    }
}
