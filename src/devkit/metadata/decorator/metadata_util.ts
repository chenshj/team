import { Type } from '@angular/core';
import { ANNOTATIONS, PROP_METADATA } from './decorator';

/**
 * 元数据解析
 * 约束：
 * 1、类型装饰器：在某个类型上，某种类型的装饰器，只使用一次，不重复添加；
 * 2、属性装饰器：在某个属性上，某种类型的装饰器，只使用一次，不重复添加
 */
class MetadataUtil {


  // ----------------------------------------
  // 类型元数据
  // ----------------------------------------

  /**
   * 获取类元数据
   * 返回结果形如：
   * [
   *   Injectable
   *   NgViewModel
   *   NgViewModel
   * ]
   */
  static getClassMetadatas(constructor: any): any[] {
    const metadatas = constructor[ANNOTATIONS];
    return metadatas;
  }

  /**
   * 获取某个class上的某种装饰器
   * 返回结果：NgViewModel
   */
  static getClassMetadataByName(constructor: any, metadataName: string): any {
    const allClassMetadatas = this.getClassMetadatas(constructor);
    if (!allClassMetadatas) {
      return null;
    }
    const metadata = allClassMetadatas.find((classMetadata: any) => {
      return classMetadata.ngMetadataName === metadataName;
    });
    return metadata;
  }


  // ----------------------------------------
  // 属性元数据
  // ----------------------------------------

  /**
   * 获取所有属性的所有元数据
   * 返回格式：
   * {
   *   propName1: [ NgDefaultValue, NgMaxLength, NgMinLength],
   *   propName2: [ NgDefaultValue, NgMaxLength, NgMinLength]
   * }
   */
  static getPropsMetadatas(constructor: any): any {
    const allPropMetadatas = constructor[PROP_METADATA];
    return allPropMetadatas;
  }

  /**
   * 获取所有属性的某一类型的元数据
   * 如果同一属性
   * 返回结果：
   * {
   *    propName1: NgDefaultValue,
   *    propName2: NgDefaultValue
   * }
   */
  static getPropsMetadatasByName(constructor: any, metadataName: string): {[propName: string]: any} {
    const metadatas = {};

    const allPropMetadatas = this.getPropsMetadatas(constructor);
    if (!allPropMetadatas) {
      return metadatas;
    }

    Object.keys(allPropMetadatas).forEach((propName: string) => {
      const propMetadatas: any[] = allPropMetadatas[propName];
      const metadata = propMetadatas.find((propMetadata: any) => {
        return propMetadata.ngMetadataName === metadataName;
      });
      if (metadata) {
        metadatas[propName] = metadata;
      }
    });

    return metadatas;
  }

  /**
   * 获取某个属性的所有元数据
   * 返回格式：[ NgDefaultValue, NgMaxLength, NgMinLength]
   */
  static getPropMetadatasByName(constructor: any, propName: string): any[] {
    // 暂不实现
    return null;
  }

  /**
   * 获取某个属性的某种元数据
   * 返回格式：NgDefaultValue
   */
  static getPropMetadataByName(constructor: any, propName: string, metadataName: string): any {
    // 暂不实现
    return null;
  }


  // ----------------------------------------
  // 参数元数据
  // ----------------------------------------

}

export { MetadataUtil };
