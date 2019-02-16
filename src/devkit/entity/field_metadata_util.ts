import { MetadataUtil } from '../metadata/index';
import { NG_FIELD, NG_OBJECT, NG_LIST,
    NgFieldProperty, NgObjectProperty, NgListProperty } from './field_decorator';
import { ValidateRule } from './validator/types';

/**
 * 属性注解器通用方法
 */
export class FieldMetadataUtil {

    /**
     * 获取NgField的属性元数据
     * @param target 实体类type
     * @returns 属性元数据对象
     * 返回格式：
     * {
     *    '属性名称': <NgFieldProperty>{ ...}
     * }
     */
    static getNgFields(target: Function): {[propName: string]: NgFieldProperty} {
        return MetadataUtil.getPropsMetadatasByName(target, NG_FIELD);
    }

    /**
     * 获取标注为NgObject的属性的元数据
     * @param target 实体类Type
     * @returns {[propName: string]: NgObjectProperty}
     */
    static getNgObjects(target: Function): {[propName: string]: NgObjectProperty} {
        return MetadataUtil.getPropsMetadatasByName(target, NG_OBJECT);
    }

    /**
     * 获取标注为NgList的属性的元数据
     * @param target 实体类Type
     * @returns {[propName: string]: NgListProperty}
     */
    static getNgList(target: Function): { [propName: string]: NgListProperty} {
        return MetadataUtil.getPropsMetadatasByName(target, NG_LIST);
    }

    /**
     * 获取实体标注为主键的属性元数据
     * @param target 实体类Type
     * @returns NgFieldProperty | undefined
     */
    static getPrimaryFieldMetadata(target: Function): NgFieldProperty | undefined {
        const ngFieldObj = FieldMetadataUtil.getNgFields(target);
        const primaryKey = Object.keys(ngFieldObj).find((prop: string) => {
            return ngFieldObj[prop].primary;
        });

        if (primaryKey) {
            const propMeta = ngFieldObj[primaryKey];
            propMeta.property = primaryKey;
            if (!propMeta.dataField) {
                propMeta.dataField = primaryKey;
            }

            return propMeta;
        }
        return undefined;
    }

    /**
     * 获取NgField 的验证规则元数据
     * @param target 实体类Type
     */
    static getValidationMetadata(target: Function) {
        const fieldMetadatas = FieldMetadataUtil.getNgFields(target);
        const rules: ValidateRule[] = [];

        const metadatas: { [key: string]: ValidateRule[] } = {};

        Object.keys(fieldMetadatas).forEach(key => {
            const validRules = fieldMetadatas[key].validRules;

            if (validRules && validRules.length) {
                validRules.map(rule => {
                    rule.property = key;
                    rule['targetName'] = target.name;
                });
                metadatas[key] = validRules;
            }
        });

        return metadatas;
    }
}
