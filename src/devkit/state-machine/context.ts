import { StateMachine } from './state_machine';
import { State } from './types';

/**
 * 状态机上下文
 */
export class StateMachineContext {

    /**
     * 当前状态名称
     */
    state: string;

    /**
     * 构造函数
     * @param stateMachine 状态机
     * @param initialState 初始状态
     */
    constructor(public stateMachine: StateMachine, initialState: State) {
        this.state = initialState.name;
    }

    /**
     * 状态迁移
     * @param stateName 下一状态的名称
     */
    transitTo(stateName: string) {
        const nextState = this.stateMachine.states[stateName];
        if (nextState) {
            this.state = nextState.name;
            this.stateMachine.render();
        }
    }
}
