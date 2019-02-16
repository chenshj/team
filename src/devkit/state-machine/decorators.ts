import { TypeDecorator, makeDecorator, makePropDecorator } from '../metadata/index';
import { Render } from './types';


/**
 * --------------------------------------------------------------------------------
 * NgStateDecorator
 * --------------------------------------------------------------------------------
 */

/**
 * NgState
 */
export interface NgState {

  /**
   * 初始状态
   */
  initialState?: boolean;
}

/**
 * NgStateDecorator
 */
export interface NgStateDecorator {
  (obj?: NgState): any;
  new(obj?: NgState): any;
}

/**
 * NgState
 */
export const NgState: NgStateDecorator =
  makePropDecorator('NgState', (obj?: NgState) => obj);


/**
 * --------------------------------------------------------------------------------
 * NgRenderStateDecorator
 * --------------------------------------------------------------------------------
 */

/**
 * NgRenderState
 */
export interface NgRenderState {
  render: Render;
}

/**
 * NgRenderStateDecorator
 */
export interface NgRenderStateDecorator {
  (obj?: NgRenderState): any;
  new(obj?: NgRenderState): any;
}

/**
 * NgRenderState
 */
export const NgRenderState: NgRenderStateDecorator =
  makePropDecorator('NgRenderState', (obj: NgRenderState) => obj);


/**
 * --------------------------------------------------------------------------------
 * NgActionDecorator
 * --------------------------------------------------------------------------------
 */

/**
 * NgAction
 */
export interface NgAction {
  precondition?: any[];
  transitTo: string;
}

/**
* NgActionDecorator
*/
export interface NgActionDecorator {
  (obj?: NgAction): any;
  new(obj?: NgAction): any;
}

/**
 * NgRenderStateDecorator
 */
export const NgAction: NgActionDecorator =
  makePropDecorator('NgAction', (action: NgAction) => action);