import { MetadataUtil } from '../metadata/index';
import { StateMachineContext } from './context';
import { NgState, NgAction, NgRenderState } from './decorators';
import {
  State, initialUIState, Effect, Render,
  StateDictionary, RenderStateDictionary, RenderDictionary
} from './types';


/**
 * 状态机初始化配置对象
 */
export interface StateMachineOption {

  /**
   * 界面渲染描述
   */
  renders?: { [index: string]: Render };

  /**
   * 状态集合
   */
  states?: string[];

  /**
   * 状态机界面控制效果
   */
  effects?: { [index: string]: Effect };
}


/**
 * 状态机
 *
 * ### 基本概念
 * 状态机中有三个重要的概念：
 * - 页面状态（State）：页面的整体状态，比如查看状态、编辑状态；
 * - 控件状态（RenderState）：控制具体控件的状态；
 * - 迁移动作（Action）：当动作发生时，将页面切换到指定的页面状态。
 *
 * ### 定义状态机
 *
 * **基本步骤**
 *
 * - 继承StateMachine基类，并添加NgStatemachine注解；
 * - 定义页面状态、控件状态、迁移动作。
 *
 * **状态机中的注解**
 *
 * - NgStatemachine：将类标记为状态机，并进行扩展；
 * - NgState：将属性标记为页面状态，通过initialState可以标记此状态是否为初始状态；
 * - NgRenderState：将属性标记为控件状态，通过render方法指定控件状态的切换规则，
 *   一般情况下是通过对页面状态进行逻辑运算来确定。
 * - NgAction：将属性标记为迁移动作，通过transitTo指定动作执行时要迁移到哪个页面状态。
 *
 * ```ts
 * @Injectable()
 * @NgStatemachine()
 * class SimpleStateMachine extends StateMachine {
 *
 *   // 查看状态，设置为初始状态
 *   @NgState({ initialState: true })
 *   viewState: State;
 *
 *   // 编辑状态
 *   @NgState()
 *   editState: State;
 *
 *   // 编辑按钮是否允许点击
 *   @NgRenderState({
 *     render: (context) => context.state === 'viewState'
 *   })
 *   canEdit: RenderState;
 *
 *   // 保存按钮是否允许点击
 *   @NgRenderState({
 *     render: (context) => context.state === 'editState'
 *   })
 *   canSave: RenderState;
 *
 *   // 输入控件是否允许输入
 *   @NgRenderState({
 *     render: (context) => context.state === 'editState'
 *   })
 *   canInput: RenderState;
 *
 *   // 迁移到编辑状态
 *   @NgAction({ transitTo: 'editState' })
 *   edit: Action;
 *
 *   // 迁移到查看状态
 *   @NgAction({ transitTo: 'viewState' })
 *   view: Action;
 * }
 * ```
 * 在上边的代码中做了如下定义：
 * - 两个页面状态：查看状态、编辑状态，
 * - 三个控件状态：分别用来控制编辑按钮、保存按钮、输入控件的状态，
 * - 两个迁移动作：view动作用来将页面切换到查看状态，edit动作用来将页面切换到编辑状态。
 *
 *
 * ### 在模板中使用状态机
 *
 * 模板中我们主要使用的是控件状态，多个控件可以共享一个控件状态。
 *
 * ```html
 * <button type="button" [disabled]="!viewModel.stateMachine.canEdit">编辑</button>
 * <button type="button" [disabled]="!viewModel.stateMachine.canSave">保存</button>
 * <input id="code" [disabled]="!viewModel.stateMachine.canInput" />
 * <input id="name" [disabled]="!viewModel.stateMachine.canInput" />
 * ```
 *
 * ### 执行状态迁移
 * 通过执行状态机上的动作来将页面切换到页面状态，进而改变控件状态。
 * 假设我们有这么一个场景，当用户点击保存按钮的时候，我们先执行保存，保存完成后将状态迁移到查看状态。
 * 我们可以定义一个CommandHandler，添加两个对应的任务，具体代码如下：
 * ```ts
 * @Injectable()
 * @NgCommandHandler({
 *   commandName: 'save'
 * })
 * class SaveHandler extends CommandHandler {
 *
 *   schedule() {
 *     this.addTask('save', () => {
 *       // 实现保存
 *     });
 *
 *     // 状态迁移
 *     this.addTask('transitState', ) => {
 *       this.stateMachine['view']();
 *     });
 *   }
 * }
 * ```
 */
export class StateMachine {

  /**
   * 初始状态
   */
  private initialState: State;

  /**
   * 状态字典
   */
  public states: StateDictionary;

  /**
   * 渲染状态字典
   */
  public renderStates: RenderStateDictionary;

  /**
   * 渲染器字典
   */
  public renders: RenderDictionary;

  /**
   * 状态机上下文
   */
  context: StateMachineContext;

  /**
   * 构造函数
   */
  constructor() {
    const propsMetadatas = MetadataUtil.getPropsMetadatas(this.constructor);

    // 遍历所有属性装饰器，并调用相应的build方法
    if (propsMetadatas) {
      Object.keys(propsMetadatas).forEach((propName: string) => {
        const propMetadatas = propsMetadatas[propName];
        propMetadatas.forEach(propMetadata => {
          this['build' + propMetadata.ngMetadataName](propName, propMetadata);
        });
      });
    }

    if (!this.initialState) {
        throw new Error('请在NgState注解中指定状态机的初始状态。');
    }
    this.context = new StateMachineContext(this, this.initialState);
    this.render();
  }

  /**
   * 构造状态
   * @param stateName 状态名称
   * @param ngState   状态对象
   */
  private buildNgState(stateName: string, ngState: NgState) {
    this.states = this.states || {};
    this[stateName] = new State(stateName);
    this.states[stateName] = this[stateName];
    if (ngState.initialState) {
        this.initialState = this[stateName];
    }
  }

  /**
   * 构造界面状态
   * @param renderStateName 渲染状态名称
   * @param ngRenderState   渲染状态元数据
   */
  private buildNgRenderState(renderStateName: string, ngRenderState: NgRenderState) {
    this.renderStates = this.renderStates || {};
    this[renderStateName] = initialUIState;
    this.renderStates[renderStateName] = this[renderStateName];

    // 将renderState上指定的render加入到renders中
    this.renders = this.renders || {};
    this.renders[renderStateName] = ngRenderState.render;
  }

  /**
   * 构造动作
   * @param actionName 动作名称
   * @param ngAction   动作元数据
   */
  private buildNgAction(actionName: string, ngAction: NgAction) {
    this[actionName] =
      () => effectHandlers.transit.perform(this, ngAction.transitTo, ngAction.precondition);
  }

  /**
   * 重新计算所有渲染状态的值
   * 当 state切换的时候，调用遍历所有的render方法，更改renderState
   */
  render() {
    for (const renderStateName in this.renderStates) {

      if (this.renderStates.hasOwnProperty(renderStateName) === false) {
        continue;
      }

      const stateRender = this.renders[renderStateName];
      if (!stateRender) {
        continue;
      }

      // 调用render方法，更新renderState
      this.renderStates[renderStateName] = stateRender(this.context);
      this[renderStateName] = this.renderStates[renderStateName];
    }
  }
}

/**
 * 预置界面效果处理
 */
export const effectHandlers = {

  /**
   * 预置状态迁移处理
   */
  'transit': {

    /**
     * 执行状态迁移
     * @param stateMachine  状态机对象
     * @param stateName     下一状态的名称
     * @param preconditions 迁移条件
     */
    perform: function (statemachine: StateMachine, stateName: string, preconditons: any[] = []) {
        const nextState: State = statemachine.states[stateName];
        statemachine.context.transitTo(nextState.name);
        statemachine.render();
    }
  }
};
