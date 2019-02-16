import { ViewModel } from '../view-model/index';
import { StateMachineContext } from './context';

/**
 * --------------------------------------------------------------------------------
 * State相关
 * --------------------------------------------------------------------------------
 */

/**
 * 基本状态：表单的基本状态，通过State的运算确定RenderState的值，进而控制页面控件的状态。
 */
export class State {

  /**
   * 构造函数
   * @param name 状态名称
   */
  constructor(public name: string) {
  }
}

/**
 * 基本状态字典, 形如
 * {
 *  stateName1: stateInstance1,
 *  stateName2: stateInstance2,
 *  ...
 * }
 */
export interface StateDictionary {
    [index: string]: State;
}


/**
 * --------------------------------------------------------------------------------
 * RenderState相关
 * --------------------------------------------------------------------------------
 */

/**
 * 渲染状态，该状态用于和界面UI绑定
 */
export type RenderState = boolean;

/**
 * 初始渲染状态
 */
export const initialUIState: RenderState = false;

/**
 * 渲染状态字典，形如：
 * {
 *  renderStateName1: true,
 *  renderStateName1: false,
 *  ...
 * }
 */
export interface RenderStateDictionary {
  [index: string]: RenderState;
}


/**
 * 渲染方法
 * 该方法接收一个StateMachineContext类型的上下文，
 * 通过对上下文中指定的当前状态的计算，确定对应渲染状态的值，该方法返回一个RenderState类型的值（即布尔类型）
 */
export type Render = (context: StateMachineContext) => RenderState;

/**
 * 渲染方法字典
 * {
 *  renderStateName1: render1,
 *  renderStateName1: render2,
 *  ...
 * }
 */
export interface RenderDictionary {
  [index: string]: Render;
}


/**
 * --------------------------------------------------------------------------------
 * Action相关
 * --------------------------------------------------------------------------------
 */

/**
 * 状态机动作
 */
export type Action = () => any;

/**
 * 状态机行为约束条件
 */
// export interface Precondition {
// }


/**
 * --------------------------------------------------------------------------------
 * Effect相关
 * --------------------------------------------------------------------------------
 */

/**
 * 行为效果，表示状态机发起某行为后引起的界面变化效果
 */
export interface EffectHandlerOption {

  /**
   * 效果类型
   */
  type: string;

  /**
   * 效果实现
   */
  effect: any;
}

/**
 * 状态机界面效果
 */
export interface Effect {

  /**
   * 行为约束条件集合
   */
  preconditions?: any[];

  /**
   * 发生某行为后引起的界面变化效果
   */
  handlers?: EffectHandlerOption[];
}

/**
 * 状态机效果字典
 */
export interface EffectDictianry {
    [index: string]: Effect;
}


