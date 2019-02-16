import { ValidationError } from './validation_error';
import { ValidationResult } from './types';
/**
 * 数据验证帮助类，提供一些公共的操作方法函数
 */
export class ValidationUtils {
    /**
     * 将错误信息集合转变为可读性高的文本数组
     * @param errors 验证失败错误集合
     * @param messages 返回的错误信息文本集合
     * @param parentPath 验证属性上级路径
     */
    static createDetailedErrorMessage(errors: ValidationError[], messages: string[] = [], parentPath: string = ''): string[] {
        errors.forEach(error => {
            const targetName = error.target ? error.target.constructor.name : '';
            const property = error.property;

            const propConstraintFailed = (propertyName: string): string =>
                `   - 属性 ${parentPath}${propertyName} 验证失败的规则:  \n` +
                `${Object.keys(error.constraints).map(ruleName => {
                    return `        #${ruleName}: ${error.constraints[ruleName]}\n`;
                }).join('')}`;


            if (!parentPath) {
                messages.push(`类型为 ${targetName} 的实例对象数据验证失败，详细信息：\n`);

                if (error.constraints) {
                    messages.push(propConstraintFailed(property));
                }

                if (error.children.length) {
                    ValidationUtils.createDetailedErrorMessage(error.children, messages, property);
                }
            } else {
                const formattedProperty = Number.isInteger(+error.index) ?
                    `[${error.index}].${error.property}` :
                    `${parentPath ? `.` : ``}${error.property}`;
                if (error.constraints) {
                    messages.push(propConstraintFailed(formattedProperty));
                }
                if (error.children.length) {
                    ValidationUtils.createDetailedErrorMessage(error.children, messages, `${parentPath}${formattedProperty}`);
                }
            }

        });

        return messages;
    }

    /**
     * 错误信息集合转换为简单对象格式
     * @param errors 错误信息集合
     * @param errObj 返回简单对象。如:
     * ```
     * { name: { required: '必填', max: '最大值99' },
     *   list: {
     *      0: { name:{required: '必填'},
     *           age: { min: '最小值 20' }
     *         },
     *      2: { ... }
     *   }
     * }
     *
     * ```
     */
    static convertErrorsToNormalObject(errors: ValidationError[], errObj: {}): {} {

        errors.forEach((err) => {

            const property = err.property;

            const buildArray = (childErrors: ValidationError[]) => {
                const itemErr = {};
                childErrors.forEach( (childErr: ValidationError) => {
                    if (childErr.children.length) {
                        itemErr[childErr.index] = ValidationUtils.convertErrorsToNormalObject(childErr.children, childErr);
                    } else {
                        if (itemErr[childErr.index] ) {
                            itemErr[childErr.index] = Object.assign({}, itemErr[childErr.index],
                                                                {[childErr.property]: childErr.constraints});
                        } else {
                            itemErr[childErr.index] = {[ childErr.property ]: childErr.constraints};
                        }
                    }
                });

                return itemErr;
            };


            if (!err.isArray) {
                if (!err.children.length) {
                    errObj[property] = err.constraints;
                } else {
                    errObj[property] = ValidationUtils.convertErrorsToNormalObject(err.children, errObj);
                }
            } else {
                errObj[property] = buildArray(err.children);
            }

        });

        return errObj;
    }
}
