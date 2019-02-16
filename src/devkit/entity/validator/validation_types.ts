/**
 * 验证类型定义
 */
export class ValidationTypes {
    // 条件验证表达式
    static CUSTOM_VALIDATION = `customValidation`;
    /** 必填 */
    static REQUIRED = 'required';
    /** 比较值是否相同 */
    static EQUALS = 'equals';
    /** 比较值是否不相同 */
    static NOT_EQUALS = 'notEquals';
    /** 数字 */
    static IS_NUMBER = 'isNumber';
    /** 整数 */
    static IS_INT = 'isInt';
    /** 浮点数 */
    static IS_FLOAT = 'isFloat';
    /** 字符串 */
    static IS_STRING = 'isString';
    /** 布尔值 */
    static IS_BOOLEAN = 'isBoolean';
    /** 日期 */
    static IS_DATE = 'isDate';
    /** 日期字符串 */
    static IS_DATE_STRING = 'isDateString';
    /** 布尔值字符串 */
    static IS_BOOLEAN_STRING = 'isBooleanString';
    /** 数字字符串 */
    static IS_NUMBER_STRING = 'isNumberString';
    /** 邮箱地址 */
    static IS_EMAIL = 'isEmail';
    /** JSON */
    static IS_JSON = 'isJSON';
    /** 字符串小写 */
    static IS_LOWERCASE = 'isLowercase';
    /** 字符串大写 */
    static IS_UPPERCASE = 'isUppercase';

    /** 数字范围 */
    static RANGE = 'range';
    /** 最小值 */
    static MIN = 'min';
    /** 最大值 */
    static MAX = 'max';

    /** 长度 */
    static LENGTH = 'length';
    /** 字符串最大长度 */
    static MAX_LENGTH = 'maxLength';
    /** 字符串最小长度 */
    static MIN_LENGTH = 'minLength';

    /** 最小日期 */
    static MIN_DATE = 'minDate';
    /** 最大日期 */
    static MAX_DATE = 'maxDate';

    /** 非法字符 */
    static EXCLUDE = 'exclude'; // 排除某些字符
    /** 正则表达式 */
    static MATCHES = 'matches'; // 正则表达式验证

    /**
     * 判断验证类型是否合法
     * @param type 验证类型
     * @returns
     */
    static isValidType(type: string): boolean {
        return type !== `isValidType` &&
            type !== 'getMessage' &&
            Object.keys(this).map(key => (this as any)[key]).indexOf(type) !== -1;
    }
    /**
     * 获取指定验证类型的提示信息
     * @param type 验证类型
     * @returns 返回验证信息
     */
    static getMessage(type: string): string {
        switch (type) {
            case ValidationTypes.REQUIRED:
                return `属性$property 的值不能空`;
            case ValidationTypes.EQUALS:
                return `属性$property 的值与 $constraint1 不相等`;
            case ValidationTypes.NOT_EQUALS:
                return `属性$property 的值不能与$constraint1 相同`;
            case ValidationTypes.RANGE:
                return `属性$property 的值必须小于 $constraint2并且大于 $constraint1`;
            case ValidationTypes.IS_NUMBER:
                return `属性$property 的值不是数字`;
            case ValidationTypes.IS_INT:
                return `属性$property 的值不是整数`;
            case ValidationTypes.IS_FLOAT:
                return `属性$property 的值不是浮点型数字`;
            case ValidationTypes.IS_BOOLEAN:
                return `属性$property 的值不是布尔值`;
            case ValidationTypes.IS_DATE:
                return `属性$property 的值不是有效日期`;
            case ValidationTypes.IS_EMAIL:
                return `邮箱地址不正确`;
            case ValidationTypes.MIN:
                return `输入的值不能小于 $constraint1`;
            case ValidationTypes.MAX:
                return `输入的值不能大于 $constraint1`;
            case ValidationTypes.IS_BOOLEAN_STRING:
                return `属性$property 的值不是有效布尔值`;
            case ValidationTypes.IS_DATE_STRING:
                return `属性$property 的值不是有效的日期`;
            case ValidationTypes.IS_LOWERCASE:
                return `属性$property 的值必须全部为小写字符串`;
            case ValidationTypes.IS_UPPERCASE:
                return `属性$property 的值必须全部为大写字符串`;
            case ValidationTypes.LENGTH:
                return `属性$property 的长度必须在 $constraint1 ~ $constraint2 之间`;
            case ValidationTypes.RANGE:
                return `属性$property 的值必须介于 $constraint1 ~ $constraint2 之间`;
            case ValidationTypes.MAX_LENGTH:
                return `属性$property 的长度不得大于 $constraint1`;
            case ValidationTypes.MIN_LENGTH:
                return `属性$property 的长度不得小于 $constraint1`;
            case ValidationTypes.IS_NUMBER_STRING:
                return `属性$property 的值不是数字`;
            case ValidationTypes.EXCLUDE:
                return `属性$property 的值不能包含：$constraint1`;
            default:
                return ``;
        }
    }
}
