import { Validator } from './validator';
import { ValidateRule } from './types';
import { ValidationError } from './validation_error';
import { Entity } from '../entity';
import { NgListProperty } from '../field_decorator';
import { ValidationTypes } from './validation_types';
import { EntityList } from '../entity_list';
import { FieldMetadataUtil } from '../field_metadata_util';

/**
 * 执行数据验证
 */
export class ValidationExecutor<T extends Entity> {

    /** 异步验证请求集合 */
    awaitingPromises: Promise<any>[] = [];

    constructor(private validator: Validator<T>) { }

    /**
     * 验证实例对象
     * @param object 验证实例对象
     * @param validationErrors 验证信息集合
     * @param propertyName 实例对象属性
     * @param index 所属集合实例中索引
     */
    execute(object: T, validationErrors: ValidationError[], propertyName?: string, index?: any) {
        let validateMetadatas = FieldMetadataUtil.getValidationMetadata(object.constructor);

        if (propertyName) {
            validateMetadatas = Object.keys(validateMetadatas)
                .filter(key => key === propertyName)
                .reduce((val, curr) => Object.assign({}, val, { [curr]: validateMetadatas[curr] }), {});
        }

        Object.keys(validateMetadatas).forEach(key => {
            const value = (object as any)[key];
            const metadatas = validateMetadatas[key];
            const validationError = this.generateValidationError(object, value, key);
            if (index !== undefined) {
                validationError['index'] = index;
            }

            validationErrors.push(validationError);

            this.defaultValidations(object, value, metadatas, validationError.constraints);
        });

        this.listValidations(object, validationErrors, propertyName, index);

        if (!propertyName) {
            this.objectValidations(object, validationErrors);
        }
    }

    /**
     * 清除通过验证信息
     * @param errors 验证失败信息
     */
    stripEmptyErrors(errors: ValidationError[]) {
        return errors.filter(error => {
            if (error.children) {
                error.children = this.stripEmptyErrors(error.children);
            }

            if (Object.keys(error.constraints).length === 0) {
                if (error.children.length === 0) {
                    return false;
                } else {
                    delete error.constraints;
                }
            }

            return true;
        });
    }

    /**
     * 生成未通过验证的对象
     * @param object 要验证的实体实例对象
     * @param value 要验证的值
     * @param propertyName 待验证的实体属性名称
     */
    private generateValidationError(object: Object, value: any, propertyName: string) {
        const validationError = new ValidationError();

        validationError.target = object;
        validationError.value = value;

        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};

        return validationError;
    }

    /**
     * 验证实体中的属性
     * @param object 要验证的实体实例对象
     * @param value 要验证的值
     * @param metadatas 验证规则
     * @param errorMap 难证信息。{[key]: message}
     *
     * key: 验证规则名称
     * message: 验证信息
     */
    private defaultValidations(object: T, value: any, metadatas: ValidateRule[], errorMap: { [key: string]: string }) {
        return metadatas.filter(metadata => {
            const validValue = this.validator.validateValueByMetadata(object, value, metadata);
            if (validValue instanceof Promise) {
                const promise = validValue.then(isValid => {
                    if (!isValid) {
                        const [type, message] = this.createValidationError(object, value, metadata);
                        errorMap[type] = message;
                    }
                });
                this.awaitingPromises.push(promise);
            }
            return !validValue;
        }).forEach(metadata => {
            const [key, message] = this.createValidationError(object, value, metadata);
            errorMap[key] = message;
        });
    }

    /**
     * 验证列表中的每条记录
     * @param object 要验证的实体实例对象
     * @param errors 验证失败的信息集合
     * @param property 属性名称
     * @param parentIndex 当前集合的父对象所属集合列表中的索引。
     */
    private listValidations(object: any, errors: ValidationError[], property?: string, parentIndex?: any) {
        const listFields = FieldMetadataUtil.getNgList(object.constructor);
        if (!listFields) { return; }
        let keys = Object.keys(listFields);
        if (property) {
            keys = keys.filter(key => key === property);
        }
        keys.forEach(propertyName => {
            const metadata = listFields[propertyName];
            const clzType = metadata.type;
            const value = object[propertyName] as EntityList<T>;
            if (value) {
                const validationError = this.generateValidationError(object, value.items, propertyName);
                validationError.isArray = true;
                validationError.index = parentIndex;
                errors.push(validationError);
                value.items.forEach((entity, index) => {
                    this.execute(entity, validationError.children, '', index);
                });
            }
        });
    }

    /**
     * 验证实体中的引用对象
     * @param object 要验证的实体对象
     * @param errors 错误信息集合
     */
    private objectValidations(object: T, errors: ValidationError[]) {
        const objectFields = FieldMetadataUtil.getNgObjects(object.constructor);
        if (objectFields === void 0) { return; }

        Object.keys(objectFields).forEach(propertyName => {
            const value = object[propertyName];
            if (value) {
                this.execute(value, errors);
            }
        });
    }

    /**
     * 创建验证规则信息
     * @param object 要验证的实体对象
     * @param value 验证的值
     * @param metadata 验证规则
     */
    private createValidationError(object: T, value: any, metadata: ValidateRule) {
        const targetName = object.constructor ? (object.constructor as any).name : undefined;
        const type = metadata.type;
        let message = metadata.message;

        if (!message) {
            message = ValidationTypes.getMessage(type);
        }

        const messageString = this.replaceMessageSpecialTokens(message, metadata, value);
        return [type, messageString];
    }

    /**
     * 将信息中的关键字替换为具体实体对象中的信息
     * @param message 验证信息
     * @param metadata 验证规则
     * @param value 待验证的值
     */
    private replaceMessageSpecialTokens(message: any, metadata: ValidateRule, value: any) {
        let messageString: string;
        if (message instanceof Function) {
            messageString = (message as (args: ValidateRule) => string)(metadata);

        } else if (typeof message === 'string') {
            messageString = message as string;
        }

        if (messageString && metadata.constraints instanceof Array) {
            metadata.constraints.forEach((constraint, index) => {
                messageString = messageString.replace(new RegExp(`\\$constraint${index + 1}`, 'g'), constraint);
            });
        }

        if (messageString && value !== undefined && value !== null) {
            messageString = messageString.replace(/\$value/g, value);
        }

        if (messageString) {
            messageString = messageString.replace(/\$property/g, metadata.property);
        }

        if (messageString) {
            messageString = messageString.replace(/\$target/g, metadata.targetName);
        }

        return messageString;
    }
}
