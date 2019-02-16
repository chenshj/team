/*
 * @Author: Witt
 * @Date: 2018-10-19 15:35:39
 * @Last Modified by:   Witt
 * @Last Modified time: 2018-10-19 15:35:39
 */

import { Type } from '@angular/core';
import { Modification, ModifyType, Entity } from '../../devkit';
import { ChangeDetailType, ChangeDetail  } from './types';
import { EntityUtil } from './entity_util';

/**
 * BEF变更集构造器
 */
class BefChangeBuilder {

  /**
   * Bef变更集
   */
  public changeDetail: ChangeDetail;

  /**
   * 构造函数
   * @param entityType 实体类型
   */
  constructor(private entityType: Type<Entity>) {

    // 根节点肯定是Modify，因为就算是新增，也是先在服务器端先创建一条。
    this.changeDetail = {
      ChangeType: ChangeDetailType.Modify,
      ChangeInfo: {
        DataId : ''
      }
    };
  }

  /**
   * 构造Bef变更集
   * @param modifications
   */
  public build(modifications: Modification[]): ChangeDetail {

    modifications.forEach(modification => {
      this.buildChangeDetail(modification);
    });
    return this.changeDetail;
  }

  /**
   * 构造Bef变更详情
   */
  public buildChangeDetail(modification: Modification) {

    const paths = modification.path.concat();

    // 设置根节点DataId
    if (!this.changeDetail.ChangeInfo.DataId) {
      this.changeDetail.ChangeInfo.DataId = paths[0].split(':')[1];
    }

    let parentChangeDetail = this.changeDetail;
    let parentEntityType   = this.entityType;
    for (let i = 1; i < paths.length && parentChangeDetail; i = i + 2 ) {
      const propName = paths[i];
      const { propType, propEntityType} = EntityUtil.getPropInfo(parentEntityType, propName);

      if (propType === 'NgField') {

        if (modification.type !== ModifyType.ValueChange) {
          throw Error('简单类型的属性上不支持ValueChange类型之外的变更');
        }

        // NgField类型：说明是最后一级
        parentChangeDetail.ChangeInfo[propName] = modification.value;
        parentChangeDetail = null;

      } else if (propType === 'NgObject') {

        // NgObject属性本身无法触发变更，只有它的子节点才能触发，所以它上边的变更永远是Modify类型的。

        // 判断是否已经存在，如果不存在则创建，如果存在则继续遍历
        const dataId = paths[i + 1].split(':')[1];
        let changeDetail = parentChangeDetail.ChangeInfo[propName];
        if (!changeDetail) {
          changeDetail = this.createEmptyChangeDetail(ChangeDetailType.Modify, dataId);
          parentChangeDetail.ChangeInfo[propName] = changeDetail;
        }

        parentChangeDetail = <ChangeDetail>changeDetail;
        parentEntityType   = propEntityType;


      } else if (propType === 'NgList') {

        // 如果不存在则创建一个空数组
        if (!parentChangeDetail.ChangeInfo[propName]) {
          parentChangeDetail.ChangeInfo[propName] = [];
        }
        const changeDetails = <ChangeDetail[]>parentChangeDetail.ChangeInfo[propName];

        // 如果这个属性，不是叶子节点，需要查找当前属性是否已经存在对应变更：
        // 1、不存在：创建一个Modify类型的ChangeDetail；
        // 2、存在：返回查找到的ChangeDetai，这个ChangeDetail可能是一个Add类型也可能是一个Modify类型；
        // 3、现状：目前BEF不支持Add类型的变更，肯定是一个Modify类型的变更。
        if ( i !== paths.length - 1) {

          // 遍历检查变更是否已经存在
          const dataId = paths[i + 1].split(':')[1];

          let changeDetail = changeDetails.find(changeDetailItem => {
            return changeDetailItem.ChangeInfo.DataId === dataId;
          });

          // 如果不存在，则创建并添加
          if (!changeDetail) {
            changeDetail = this.createEmptyChangeDetail(ChangeDetailType.Modify, dataId);
            changeDetails.push(changeDetail);
          }
          parentChangeDetail = changeDetail;
          parentEntityType   = propEntityType;
          continue;
        }

        if (modification.type === ModifyType.Add) {

          // 遍历添加
          modification.value.forEach((entityData) => {
            this.addAddChangeDetail(changeDetails, entityData, propEntityType);
          });
        } else if (modification.type === ModifyType.Remove) {

          // 遍历变更集，添加移除变更
          modification.value.forEach((entityData) => {
            this.addRemoveChangeDetail(changeDetails, entityData, propEntityType);
          });
        }

        // 重置
        parentChangeDetail = null;
        parentEntityType   = null;

      }
    }
  }


  /**
   * 添加Add类型的ChangeDetail
   * 注意：目前BEF不支持Add类型的变更，会将Add类型转换为Modify类型。
   * @param {ChangeDetail[]} ChangeDetail[] 父节点变更集集合
   * @param {Object} entityData     变更数据，对于新增，是新增实体的完整数据
   * @param {Type<Entity>} entityType     实体类型，当前实体节点对应的实体类型
   */
  private addAddChangeDetail(changeDetails: ChangeDetail[], entityData: any, entityType: Type<Entity>): void {

    const primaryKey = EntityUtil.getPrimaryKey(entityType);
    const dataId = entityData[primaryKey];

    // 检查该新增变更是否已经存在（Add类型的Modification的value中有重复值的情况）
    let changeDetail = changeDetails.find(changeDetailItem => {
      return changeDetailItem.ChangeInfo.DataId === dataId && changeDetailItem.ChangeType === ChangeDetailType.Modify;
    });
    if (!changeDetail) {
      changeDetail = this.createEmptyChangeDetail(ChangeDetailType.Modify, dataId);
      changeDetails.push(changeDetail);
    }

    // 目前不支持新增类型的变更;
    // Add变更 => 所有字段（除主键）的Modify变更
    const entityDataCopy = Object.assign({}, entityData);
    delete entityDataCopy[primaryKey];
    changeDetail.ChangeInfo = Object.assign({}, changeDetail.ChangeInfo, entityDataCopy);
  }


  /**
   * 添加Remove类型的ChangeDetail
   * @param  {ChangeDetail[]} changeDetails 父节点变更集集合
   * @param  {Object}         entityData    变更数据，对于Remove，该数据只包含一个字段，格式如下：{ primaryKeyName: primaryKeyValue}
   * @param  {Type<Entity>}   entityType    实体类型，当前实体节点对应的实体类型
   */
  private addRemoveChangeDetail(changeDetails: ChangeDetail[], entityData: any, entityType: Type<Entity>): void {
    const primaryKey = EntityUtil.getPrimaryKey(entityType);
    const dataId = entityData[primaryKey];

    // 检查是否存在DataId相同的变更
    let changeDetail = changeDetails.find(changeDetailItem => {
      return changeDetailItem.ChangeInfo.DataId === dataId && changeDetailItem.ChangeType === ChangeDetailType.Modify;
    });
    if (!changeDetail) {
      changeDetail = this.createEmptyChangeDetail(ChangeDetailType.Deleted, dataId);
      changeDetails.push(changeDetail);
    }
  }


  /**
   * 创建ChangeDetail
   * @param type BEF变更类型
   * @param dataId 数据内码
   */
  private createEmptyChangeDetail(type: ChangeDetailType, dataId: string): ChangeDetail {
    const changeDetail: ChangeDetail = {
      ChangeType: type,
      ChangeInfo: {
        DataId: dataId
      }
    };
    return changeDetail;
  }

}

export  { BefChangeBuilder };
