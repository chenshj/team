import { makePropDecorator } from '../metadata/index';

/**
 * 状态名
 */
export const NG_UI_STATE = 'NgUIState';

/**
 * NgUIState
 */
export interface NgUIState {

  /**
   * 组件的ID
   */
  componentId: string;

  /**
   * 状态名称
   */
  stateName: string;
}

/**
 * NgUIStateDecorator
 */
export interface NgUIStateDecorator {
  (obj?: NgUIState): any;
  new(obj?: NgUIState): any;
}

/**
 * NgUIState
 */
export const NgUIState: NgUIStateDecorator =
  makePropDecorator(NG_UI_STATE, (obj?: NgUIState) => obj);
