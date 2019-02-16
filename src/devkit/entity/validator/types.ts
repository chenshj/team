import { ValidationError } from './validation_error';
/** 验证规则 */
export interface ValidateRule {
    /** 验证类型 */
    type: string;
    /** 验证参数 */
    constraints?: any[];
    /** 提示信息 */
    message?: string;
    /** 属性名称 */
    property?: string;
    /** 所属实体类型名称 */
    targetName?: string;
}

/** 校验数字选项 */
export interface IsNumberOptions {
    /** 无穷大的值是否为数字 */
    allowInfinity?: boolean;
    /** NaN 时判断是否为数字 */
    allowNaN?: boolean;
}

/**
 * 实体校验结果
 */
export interface ValidationResult {
    /**
     * 是否验证通过
     * true: 验证通过
     * false: 未通过验证
     */
    isValid: boolean;
    /**
     * 验证错误集合
     */
    errors: ValidationError[];
    /**
     * 验证错误信息
     */
    message?: string;
}
