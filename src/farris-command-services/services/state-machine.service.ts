import { Injectable } from '@angular/core';
import { StateMachine } from '../../devkit';

/**
 * 状态机服务
 */
@Injectable()
class StateMachineService {

  constructor(private stateMachine: StateMachine) {
  }

  transit(action: string) {
    this.stateMachine[action]();
  }
}

export { StateMachineService };
