
/**
 * 状态变化
 */
export interface UIStateChange {

  /**
   * 变更类型
   */
  controlId: string;

  /**
   * 状态名
   */
  stateName: string;

  /**
   * 值
   */
  value: any;

  /**
   * 旧值
   */
  oldValue: any;
}
