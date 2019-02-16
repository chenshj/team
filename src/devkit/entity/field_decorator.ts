import 'reflect-metadata';
import { makePropDecorator } from '../metadata/index';
import { isPlainObject } from 'lodash-es';
import { ClassType } from './types';
import { ValidateRule } from './validator';



/** 实体属性注解器名称 */
export const NG_FIELD = 'NgField';

/** 实体属性元数据选项 */
export interface NgFieldProperty {
    /** 属性名称 */
    property?: string;
    /** 字段名称 */
    dataField?: string;
    /** 是否为主键 */
    primary?: boolean;
    /** 是否为外键 */
    foreign?: boolean;
    /** 默认值 */
    defaultValue?: any;
    /** 验证规则 */
    validRules?: ValidateRule[];
}

/** 实体属性注解器 */
export interface NgFieldPropertyDecorator {
    /**
     * @constructor
     * @param obj 参数obj的值类型可以为 NgFieldProperty、string、ClassType
     *
     * 当为string 时，则设其映射字段；
     *
     * 当为ClassType时，则设置集合中的记录类型
     */
    (obj: NgFieldProperty | string | ClassType): any;
    (obj?: NgFieldProperty | string | boolean): any;
    new(obj?: NgFieldProperty | string | boolean): any;
}

function makeNgFieldDecorator(options?: NgFieldProperty | string | boolean): any {
    let metadata: NgFieldProperty = {
        primary: false,
        foreign: false
    };

    if (options) {
        const paramType = typeof options;
        switch (paramType) {
            case 'boolean':
                metadata.primary = Boolean(options);
                break;
            case 'string':
                metadata.dataField = String(options);
                break;
            case 'object':
                metadata = Object.assign(metadata, options);
                break;
        }
    }
    return metadata;
}

/**
 * 实体属性注解
 *
 * ### 使用示例
 * ```
 * export class UserEntity extends Entity {
 *      @NgField({
 *          primary: true,
 *          dataField: 'id',
 *          ...
 *      })
 *      userid: string;
 *      userName: string;
 * }
 * ```
 */
export const NgField: NgFieldPropertyDecorator = makePropDecorator(NG_FIELD, makeNgFieldDecorator);


/** NgList 注解器名称 */
export const NG_LIST = 'NgList';

/**
 * 集合类型元数据选项
 */
export interface NgListProperty {
    /** 表名 */
    tableName?: string;
    /** 字段名称 */
    dataField?: string;
    /** 实体类型 */
    type?: any;
}

/** 集合类型注解器 */
export interface NgListPropertyDecorator {
    /**
     * @constructor
     * @param obj 参数obj的值类型可以为 NgListProperty、string、ClassType
     *
     * 当为string 时，则设其映射字段；
     *
     * 当为ClassType时，则设置集合中的记录类型
     */
    (obj: NgListProperty | string | ClassType): any;
    new(obj: NgListProperty | string | ClassType): any;
}

function makeNgListDecorator(options: NgListProperty | string | ClassType): any {
    if (isPlainObject(options)) {
        return options;
    }

    const type = typeof options;
    if (type === 'string') {
        return {
            dataField: options
        };
    }

    if (type === 'function') {
        return {
            type: options
        };
    }
}

/**
 * 实体属性注解
 * ### 使用示例
 * ```
 * export class UserEntity extends Entity {
 *      @NgField({
 *          primary: true,
 *          dataField: 'id',
 *          ...
 *      })
 *      userid: string;
 *      userName: string;
 *      @NgList({
 *          dataField: 'roles',
 *          formType: Role
 *      })
 *      Roles: EntityList<Role>
 * }
 * ```
 */
export const NgList: NgListPropertyDecorator = makePropDecorator(NG_LIST, makeNgListDecorator);


/** NgObject 实体属性注解器名称 */
export const NG_OBJECT = 'NgObject';

/**
 * 引用类型元数据选项
 */
export interface NgObjectProperty {
    /** 映射字段 */
    dataField?: string;
    /** 表名 */
    tableName?: string;
    /** 引用实体类型 */
    type?: ClassType;
}

/** 引用类型注解器 */
export interface NgObjectPropertyDecorator {
    /**
     * @constructor
     * @param obj 参数obj的值类型可以为 NgObjectProperty、string、ClassType
     *
     * 当为string 时，则设其映射字段；
     *
     * 当为ClassType时，则设置集合中的记录类型
     */
    (obj: NgObjectProperty | string | ClassType): any;
    new(obj: NgObjectProperty | string | ClassType): any;
}


function makeNgObjectDecorator(options: NgObjectProperty | string | ClassType): any {
    if (isPlainObject(options)) {
        return options;
    }

    const type = typeof options;
    if (type === 'string') {
        return {
            dataField: options
        };
    }

    if (type === 'function') {
        return {
            type: options
        };
    }
}

/**
 * 实体属性注解
 * ### 使用示例
 *
 * ```
 *  export class UserEntity entends Entity {
 *      @NgField(true)  // 设置为主键
 *      id: string;
 *      @NgField('name')  // 设置数据映射字段为 name
 *      userName: string;
 *
 *      depid: string;
 *
 *      @NgObject(Department)  // 设置引用类型为 Department 实体类
 *      epartment: Department;
 *  }
 * ```
 */
export const NgObject: NgObjectPropertyDecorator = makePropDecorator(NG_OBJECT, makeNgObjectDecorator);
