import { EventStore } from './event_store';
import { Injectable } from '@angular/core';
import { Entity } from '../entity';
import { Modification } from '../changeset';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventSourceService {
    /**
     * 实体ID，事件溯源字典
     */
    private eventMap: Map<number, EventStore>;
    constructor() {
        this.eventMap = new Map<number, EventStore>();
    }


    /**
     * 记录实体的变更记录集
     * @param entity 要记录变更的实体
     * @param id 实体id，用于查询变更记录
     */
    public addEntity(entity: Entity, id: number) {
        const eventStore = new EventStore(entity);
        this.eventMap.set(id, eventStore);
    }



    /**
     * 删除实体的 变更记录集
     * @param id 实体ID
     */
    public removeEntity(id: number) {
        this.eventMap.delete(id);
    }


    /**
  * 获取实体的变更记录
  * @param id 实体ID
  */
    public getChangeSet(id: number): Observable<Modification[]> {
        // return Observable.of(this.eventMap.get(id).getChanges()).observeOn(Scheduler.asap, 100);
        return null;
    }


    /**
     * 指定实体回退到指定版本
     * @param id 实体ID
     * @param modification 要回退的变更记录
     */
    public backToChange(id: number, modification: Modification) {
        this.eventMap.get(id).backToChange(modification);
    }


    /**
     * @returns number 实体数量
     */
    public getEntityNum(): number {
        return this.eventMap.size;
    }
}
