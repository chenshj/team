/*
 * @Author: Witt
 * @Date: 2018-10-19 15:36:21
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-19 16:10:04
 */
import { FieldMetadataUtil, NgFieldProperty } from '../../devkit';

class EntityUtil {
/**
   * 查找属性的类型
   * @param entityType 实体类型
   * @param targetPropName 属性名称
   * @return 属性信息，包含属性类型（NgField、NgObject、NgList）和属性对应的实体类型（当NgField类型时为null）
   */
  static getPropInfo(entityType: any, targetPropName: string): { propType: string, propEntityType: any} {

    let propType: string;
    let propEntityType: any;

    // NgField
    const ngFieldProperties = FieldMetadataUtil.getNgFields(entityType);
    Object.keys(ngFieldProperties).forEach((propName: string) => {
      if (propName === targetPropName) {
        propType = 'NgField';
        propEntityType = null;
      }
    });

    // NgObject
    const ngObjectProperties = FieldMetadataUtil.getNgObjects(entityType);
    Object.keys(ngObjectProperties).forEach((propName: string) => {
      if (propName === targetPropName) {
        propType = 'NgObject';
        propEntityType = ngObjectProperties[propName].type;
      }
    });

    // NgList
    const ngListProperties = FieldMetadataUtil.getNgList(entityType);
    Object.keys(ngListProperties).forEach((propName: string) => {
      if (propName === targetPropName) {
        propType = 'NgList';
        propEntityType = ngListProperties[propName].type;
      }
    });

    return { propType, propEntityType };
  }

  /**
   * 获取实体的主键名
   * @param entityType 实体类型
   */
  static getPrimaryKey(entityType: any) {
    const primaryNgFiledProp = FieldMetadataUtil.getPrimaryFieldMetadata(entityType);
    return primaryNgFiledProp.dataField;
  }
}

export { EntityUtil };
