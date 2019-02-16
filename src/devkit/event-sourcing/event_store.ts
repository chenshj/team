import { Entity } from '../entity';
import { EventSourcing } from '.';
import { Modification } from '../changeset';

/**
 * 聚合Entity和EventSourcing
 */
export class EventStore {
    /**
     * 要记录变更的实体
     */
    private entity: Entity;
    private eventSource: EventSourcing;

    constructor(entity: Entity) {
        this.entity = entity;
        this.eventSource = new EventSourcing();
        entity.onValueChanged.subscribe(
            (modification: Modification) => {
                // @todo：没有该方法，临时屏蔽
                // this.eventSource.append(modification);
            }
        );
    }

    /**
     * 获取该实体的所有变更记录
     * @returns 变更记录集
     */
    public getChanges(): Modification[] {
        return this.eventSource.getChanges();
    }


    /**
     * 回退变更记录
     * @param modification 要回退的变更记录
     */
    public backToChange(modification: Modification) {
        this.entity.setChanges(modification);
    }
}
