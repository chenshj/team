/**
 * 验证错误信息
 */
export class ValidationError {
    /**
     * 所属实体对象
     */
    target?: Object;
    /**
     * 验证实体属性名称
     */
    property: string;
    /**
     * 验证实体属性值
     */
    value?: any;
    /**
     * 验证失败的规则。 { [formType-规则名称]: string - 验证信息 }
     */
    constraints: {
        [type: string]: string
    };
    /**
     * 子对象验证错误信息集合
     */
    children: ValidationError[];
    /** 待验证的对象是否为数组集合 */
    isArray = false;
    /**
     * 待验证的对象所属集合中的索引
     */
    index = undefined;

}


