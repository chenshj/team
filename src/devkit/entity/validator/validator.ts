import * as ValidatorJS from 'validator';
import { ValidateRule, IsNumberOptions, ValidationResult } from './types';
import { ValidationTypes } from './validation_types';
import { ValidationError } from './validation_error';
import { Entity } from '../entity';
import { ValidationExecutor } from './validation_executor';
import { ValidationUtils } from './validation_utils';

/**
 * 校验实体实例对象数据
 */
export class Validator<T extends Entity> {
    constructor() { }

    private validatorJs = ValidatorJS;
    /**
     * 验证实例对象中数据是否合法
     * @param object 待校验的实例对象
     * @param propertyName 待校验实例对象属性名称，为空则验证实例对象中所有带有验证规则的属性
     */
    validate(object: T, propertyName?: string): Promise<ValidationResult> {
        const validationErrors: ValidationError[] = [];
        const executor = new ValidationExecutor(this);
        executor.execute(object, validationErrors, propertyName);
        return Promise.all(executor.awaitingPromises).then(() => {
            const errors = executor.stripEmptyErrors(validationErrors);
            const msg = new Set(ValidationUtils.createDetailedErrorMessage(errors));
            const newMsg = [];
            msg.forEach(v => {
                newMsg.push(v);
            });
            return {
                isValid: errors.length === 0,
                errors,
                message: newMsg.join('')
            };
        });
    }

    /**
     * 验证实体属性元数据中设置的校验规则是否合法
     * @param object 实例对象
     * @param value 待校验的值
     * @param metadata 验证规则
     */
    validateValueByMetadata(object: any, value: any, metadata: ValidateRule): boolean | any {

        const validType = metadata.type;

        if (metadata.constraints) {
            metadata.constraints = metadata.constraints.map(param => {
                if (typeof param === 'function') {
                    return param(object, value);
                }

                return param;
            });
        } else {
            metadata.constraints = [];
        }

        if (ValidationTypes.isValidType(validType)) {
            return this[validType](value, ...metadata.constraints);
        }

        return true;
    }

    /** 自定义验证 */
    customValidation(value, comparison: boolean): boolean {
        return comparison;
    }

    /** 必填项 */
    required(value: any): boolean {
        return value !== '' && value !== null && value !== undefined;
    }

    /** 判断两个值是否相等 */
    equals(value: any, comparison: any): boolean {
        return value === comparison;
    }

    /**
     * 检查 value 是否不等于参照值
     * @param value 要检查的值
     * @param comparison 对比参照值
     */
    notEquals(value: any, comparison: any): boolean {
        return value !== comparison;
    }

    /**
     * 判断value 是否为数字
     * @param value 要检查的值
     * @param options 验证选项
     */
    isNumber(value: any, options: IsNumberOptions = {}): boolean {
        if (value === Infinity || value === -Infinity) {
            return options.allowInfinity;
        }

        if (Number.isNaN(value)) {
            return options.allowNaN;
        }

        return Number.isFinite(value);
    }

    /** 判断value是否为整数 */
    isInt(value: number) {
        return Number.isInteger(value);
    }

    /** 是否为浮点类型 */
    isFloat(value: any): boolean {
        if (this.isNumber(value) || this.isNumberString(value)) {
            return this.validatorJs.isFloat(value);
        }
        return false;
    }

    /**
     * 检查给定的value 是否布尔值
     */
    isBoolean(value: any): boolean {
        return value instanceof Boolean || typeof value === 'boolean';
    }

    /**
     * 检查给定的value 是否为字符串
     */
    isString(value: any): boolean {
        return value instanceof String || typeof value === 'string';
    }

    /**
     * 检查给定的value 是否为日期
     */
    isDate(value: any): boolean {
        return value instanceof Date && !isNaN(value.getTime());
    }

    /**
     * 检查给定的value 是否为日期字符串
     */
    isDateString(value: any): boolean {
        const regex =
        /\d{4}-(0[1-9]|1[1-2])-(0[1-9]|[1-2][0-9]|3[0-1])(T|\s?)?(([0-2]\d:[0-5]\d)?(:[0-5]\d(?:\.\d+)))?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?/g;
        return this.isString(value) && regex.test(value) && this.validatorJs.toDate(value) ;
    }

    /** 判断value 的长度是否在允许的最小值 和最大值之间 */
    length(value: any, min: number, max?: number): boolean {
        return typeof value === 'string' && this.validatorJs.isLength(value, min, max);
    }

    /**
     * 检查给定的value的长度是否符合设定的最小值
     * @param value 待检查的字符串
     * @param min 最小长度
     */
    minLength(value: any, min: number): boolean {
        return typeof value === 'string' && this.length(value, min);
    }

    /**
   * 检查给定的value的长度是否符合设定的最大值
   * @param value 待检查的字符串
   * @param max 最大长度
   */
    maxLength(value: any, max: number): boolean {
        return typeof value === 'string' && this.length(value, 0, max);
    }

    /** 检查value的值是否在 最大值与最小值之间 */
    range(value: number, min: number, max: number): boolean {
        return typeof value === 'number' && this.isNumber(min) && this.isNumber(max) && value >= min && value <= max;
    }

    /**
     * Checks if the first number is greater than second.
     */
    min(num: number, min: number): boolean {
        return typeof num === 'number' && typeof min === 'number' && num >= min;
    }

    /**
     * Checks if the first number is less than second.
     */
    max(num: number, max: number): boolean {
        return typeof num === 'number' && typeof max === 'number' && num <= max;
    }

    /**
     * Checks if the value is a date that's after the specified date.
     */
    minDate(date: Date, minDate: Date): boolean {
        return date && date.getTime() >= minDate.getTime();
    }

    /**
     * Checks if the value is a date that's before the specified date.
     */
    maxDate(date: Date, maxDate: Date): boolean {
        return date && date.getTime() <= maxDate.getTime();
    }

    /**
     * Checks if a string is a boolean.
     * If given value is not a string, then it returns false.
     */
    isBooleanString(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isBoolean(value);
    }

    /**
     * Checks if the string is numeric.
     * If given value is not a string, then it returns false.
     */
    isNumberString(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isNumeric(value);
    }

    /**
     * Checks if the string contains the seed.
     * If given value is not a string, then it returns false.
     */
    contains(value: string, seed: string): boolean {
        return typeof value === 'string' && this.validatorJs.contains(value, seed);
    }

    /**
     * Checks if the string does not contain the seed.
     * If given value is not a string, then it returns false.
     */
    notContains(value: string, seed: string): boolean {
        return typeof value === 'string' && !this.validatorJs.contains(value, seed);
    }

    /**
     * Checks if the string is an email.
     * If given value is not a string, then it returns false.
     */
    isEmail(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isEmail(value);
    }

    /**
     * Checks if the string is valid JSON (note: uses JSON.parse).
     * If given value is not a string, then it returns false.
     */
    isJSON(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isJSON(value);
    }

    /**
     * Checks if the string is lowercase.
     * If given value is not a string, then it returns false.
     */
    isLowercase(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isLowercase(value);
    }

    /**
     * Checks if the string is uppercase.
     * If given value is not a string, then it returns false.
     */
    isUppercase(value: string): boolean {
        return typeof value === 'string' && this.validatorJs.isUppercase(value);
    }

    /**
     * 验证字符串是否包含非法字符
     * @param value 验证的字符串
     * @param someChars 非法字符。如：#￥%@$
     */
    exclude(value: string, someChars: string): boolean {
        const arrChar = someChars.split('');
        let counter = 0;
        arrChar.forEach(val => {
            if (this.contains(value, val)) {
                counter++;
            }
        });

        return counter === 0;
    }

    /**
     * 自定义正则验证
     * @param value 待验证的字符串
     * @param pattern 正则表达式
     */
    matches(value: string, pattern: any): boolean {
        return this.validatorJs.matches(value, pattern);
    }
}
