/*
 * @Author: Witt
 * @Date: 2018-10-19 15:36:48
 * @Last Modified by:   Witt
 * @Last Modified time: 2018-10-19 15:36:48
 */

/**
 * 变更类型
 */
export enum ChangeDetailType {

  /**
   * 新增
   */
  Added = 'Added',

  /**
   * 修改
   */
  Modify = 'Modify',

  /**
   * 删除
   */
  Deleted = 'Deleted'
}

/**
 * 行变更信息
 * 必须包含：
 * 1、DataId   => 主键值；
 * 2、属性名   => 新的属性值；
 * 3、子表名+s => 子表行的ChangeDetail数组
 */
export interface ChangeDetailInfo {
  DataId: string;
  [key: string]: number | string | boolean | null | ChangeDetail | ChangeDetail[] ;
}

/**
 * 行变更详情
 * 包含：
 * 1、变更类型；
 * 2、变更信息
 */
export class ChangeDetail {
  ChangeType: ChangeDetailType;
  ChangeInfo: ChangeDetailInfo;
}
