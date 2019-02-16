import {Type} from '@angular/core';
import { Entity, FieldMetadataUtil } from '../entity/index';
import { BindingProperty, BindingPropertyType } from './binding_property';

/**
 * 属性工具类
 */
class PropertyUtil {

  /**
   * 获取实体上的属性集合，并将他们转换成BindingProperty集合
   * @param   {Type<Entity>}      entityType 实体类型
   * @returns {BindingProperty[]} 绑定属性集合
   */
  static getProperties(entityType: Type<Entity>): BindingProperty[] {
    const properties = [];

    // Plain
    const ngFieldProperties = FieldMetadataUtil.getNgFields(entityType);
    Object.keys(ngFieldProperties).forEach((propertyName: string) => {
      const ngFieldProperty = ngFieldProperties[propertyName];
      properties.push({
        name: propertyName,
        type: BindingPropertyType.Plain,
        isPrimaryKey: ngFieldProperty.primary,
        isForeignKey: ngFieldProperty.foreign
      });
    });

    // Object
    const ngObjectProperties  = FieldMetadataUtil.getNgObjects(entityType);
    Object.keys(ngObjectProperties).forEach((propertyName: string) => {
      const ngObjectProperty = ngObjectProperties[propertyName];
      properties.push({
        name: propertyName,
        type: BindingPropertyType.Object,
        entityType: ngObjectProperty.type
      });
    });

    // List
    const ngListProperties  = FieldMetadataUtil.getNgList(entityType);
    Object.keys(ngListProperties).forEach((propertyName: string) => {
      const ngListProperty = ngListProperties[propertyName];
      properties.push({
        name: propertyName,
        type: BindingPropertyType.List,
        entityType: ngListProperty.type
      });
    });

    return properties;
  }

  /**
   * 获取实体主键名
   * @param {BindingProperty[]} properties 属性集合
   * @returns {string}          主键名
   */
  static getPrimaryKey(properties: BindingProperty[]): string {

    // 实体必须有主键，如果没有主键在构造实体的时候就已经报错，这里不需要再进行检查
    const primaryProperty = properties.find((property: BindingProperty) => {
      return property.isPrimaryKey = true;
    });
    return primaryProperty.name;
  }

}

export { PropertyUtil };
