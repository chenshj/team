/**
 * 变更记录
 */
export class Modification {
    /**
     * 实体变更路径。如：[1, 'name']
     * 说明： 1 为实体主键ID， name 为属性名称
     */
    path?: string[];

    /**
     * 原值
     */
    preValue?: any;

    /**
     * 变更后的新值
     *
     * value 值类型会根据 type(变更类型)的不同而不同，当type 为以下类型时：
     * - Add: value的值为json 对象
     * - ValueChange: value的值为string\number\boolean等简单数据
     * - Remove: value的值为键值对{[key:string]: value} key为主键字段
     *
     */
    value: any;

    /**
     * 变更类型
     */
    type: ModifyType;

    /**
     * 数据是否通过验证
     */
    isValid?: boolean;

    /**
     * 数据验证结果
     */
    errors?: { [type: string]: string };

    /**
     * 构造函数
     * @param value 新值
     * @param modifyType 变更类型
     * @param path 变更路径
     * @param preValue 旧值
     */
    constructor(value: any, modifyType: ModifyType, path?: string[], preValue?: any) {
        this.type = modifyType;
        this.value = value;
        this.preValue = preValue;
        this.path = path;
    }
}

/**
 * 变更类型
 */
export enum ModifyType {

  /**
     * 添加
     */
    Add = 'ADD',

    /**
     * 删除
     */
    Remove = 'REMOVE',

    /**
     * 修改
     */
    ValueChange = 'VALUE_CHANGE',

    /**
     * 加载
     */
    Load = 'LOAD',

    /**
     * 未改变
     */
    UnChanged = 'UNCHANGED'
}
