import { isEqual, keys, values, isPlainObject, remove } from 'lodash-es';
import { Modification, ModifyType } from './types';

/**
 * 实体数据变更集
 * @author Lucas Huang <huangxiuling@inspur.com>
 */
export class ChangeSet {

    /**
     * 变更集合
     */
    protected changeSet: Modification[] = [];

    /**
     * 构造函数
     */
    constructor() {
    }

    /**
     * 将变更集添加到集合中
     * ### 使用示例
     * ```
     * const changeSet = new ChangeSet();
     * const modify = new Modification('newValue', ModifyType.ValueChange, [1, 'title'], 'oldValue');
     * changeSet.append(modify)
     * ```
     * @param changeItem 变更数据
     */
    append(changeItem: Modification) {
        this.updateChanges(changeItem);
    }

    /**
     * 清空变更集合
     */
    private clear() {
        this.changeSet = [];
    }

    /**
     * 更新变更集合
     * @param changeItem 变更记录
     */
    private updateChanges(changeItem: Modification) {
        const value = changeItem.value;

        switch (changeItem.type) {
            case ModifyType.Add:

                // 1、如果已经存在相同路径的Add变更，将两次新增的数据合并，存在该场景？？
                // 2、如果没有，则新增一条Add变更。
                const item = this.findNewAddItemsPath(changeItem.path);
                if (item) {
                    item.value = item.value.concat(value);
                } else {
                    this.changeSet.push(changeItem);
                }
                break;
            case ModifyType.ValueChange:

                // 1、如果存在相同路径的ValueChange类型的变更集，则更新值；
                // 2、如果存在涵盖该ValueChange变更的Add变更，则更新Add变更对应的数据；
                // 3、其他情况，新增一条ValueChange变更。
                const modItem = this.findModifyItemsPath(changeItem.path);
                if (modItem) {
                    modItem.value = value;
                } else {
                    const newitem = this.findNewAddItemsPath(changeItem.path);
                    if (newitem) {
                        newitem.value = Object.assign({}, newitem.value, value);
                    } else {
                        this.changeSet.push(changeItem);
                    }
                }
                break;
            case ModifyType.Remove:
                const delItem = this.findRemoveItemsPath(changeItem.path);

                // 从集合中删除所有path 中包含 [keyfield]:xxxxxxx 的记录
                const val = keys(value)[0] + ':' + values(value)[0];
                remove(this.changeSet, function (n) {
                    return n.path.indexOf(val) > -1;
                });

                // 从未提交、新增的数据集合中删除
                let isNewAdded = false;
                const newItem = this.findNewAddItemsPath(changeItem.path);
                if (newItem) {
                    isNewAdded = remove(newItem.value, value).length > 0;
                    if (!newItem.value.length) {
                        this.removeChangeItem(newItem.path);
                    }
                }

                if (!isNewAdded) {
                    if (delItem) {
                        delItem.value = delItem.value.concat(value);
                    } else {
                        if (isPlainObject(value)) {
                            changeItem.value = [value];
                        }
                        this.changeSet.push(changeItem);
                    }
                }
                break;
        }
    }

    /**
     * 根据path获取Add类型的变更记录
     * @param path 变更路径
     */
    private findNewAddItemsPath(path: any[]) {
        return this.changeSet.find((value, index) => {
            return isEqual(path, value.path) && value.type === ModifyType.Add;
        });
    }

    /**
     * 根据path获取ValueChange类型的变更记录
     * @param path 变更路径
     */
    private findModifyItemsPath(path: any[]) {
        return this.changeSet.find((value, index) => {
            return isEqual(path, value.path) && value.type === ModifyType.ValueChange;
        });
    }

    /**
     * 根据path获取Remove类型的变更记录
     * @param path 变更路径
     */
    private findRemoveItemsPath(path: any[]) {
        return this.changeSet.find((value, index) => {
            return isEqual(path, value.path) && value.type === ModifyType.Remove;
        });
    }

    /**
     * 根据path获取变更记录
     * @param path 变更路径
     */
    private getItemByPath(path: any[]): Modification {
        return this.changeSet.find((item, index) => {
            return isEqual(item.path, path);
        });
    }

    /**
     * 根据path查找是否存在对应的变更记录
     * @param path 变更路径
     */
    private hasPath(path: any[]): boolean {
        const changeItem = this.getItemByPath(path);
        return changeItem !== undefined;
    }

    /**
     * 移除path对应的变更记录
     * @param path 变更路径
     */
    private removeChangeItem(path: string[]): boolean {
        return remove(this.changeSet, (value) => {
            return isEqual(path, value.path);
        }).length > 0;
    }

    /**
     *  获取所有的变更记录
     */
    get changes(): Modification[] {
        return this.changeSet;
    }

}
