/**
 * 变更相关定义
 * @author Witt<jiwt@inspur.com>
 */

/**
 * 绑定数据变更
 */
export interface Change {

  /**
   * 变更类型
   */
  type: ChangeType;

  /**
   * 变更路径
   */
  path: string[];

  /**
   * 变更后的值
   */
  value?: any;

  /**
   * 变更前的值
   */
  preValue?: any;
}

/**
 * 绑定数据变更类型
 */
export enum ChangeType {
  Load = 'Load',
  Append = 'Append',
  Remove = 'Remove',
  SelectionChanged = 'SelectionChanged',
  ValueChanged = 'ValueChanged',
}

/**
 * 视图变更
 */
export interface ViewChange {
  type: ViewChangeType;
  path: string[];
  value: any;
  preValue?: any;
}

/**
 * 视图变更类型
 */
export enum ViewChangeType {
  ValueChanged
}
