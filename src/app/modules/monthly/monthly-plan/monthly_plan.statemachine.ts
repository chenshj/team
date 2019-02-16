import { Injectable } from '@angular/core';
import { StateMachine, State, RenderState, NgRenderState, NgState } from '../../../../devkit';

@Injectable()
export class MonthlyPlanStateMachine extends StateMachine {

  /**
   * 初始状态
   */
  @NgState({ initialState: true })
  init: State;

  /**
   * 是否允许新增
   */
  @NgRenderState({
    render: (context) => context.state === 'init'
  })
  canAdd: RenderState;

  /**
   * 是否允许编辑
   */
  @NgRenderState({
    render: (context) => context.state === 'init'
  })
  canEdit: RenderState;

  /**
   * 是否允许删除
   */
  @NgRenderState({
    render: (context) => context.state === 'init'
  })
  canRemove: RenderState;

  /**
   * 是否允许查看
   */
  @NgRenderState({
    render: (context) => context.state === 'init'
  })
  canView: RenderState;

}
