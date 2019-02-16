import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CommandContext } from '../command_context';


/**
 * 任务函数
 */
type TaskFunc = (context: CommandContext) => any;


/**
 * 任务节点
 */
class TaskNode {

  /**
   * 任务名称
   */
  name: string;

  /**
   * 任务函数
   */
  func: TaskFunc;

  /**
   * 构造函数
   */
  constructor(name: string, func: TaskFunc) {
    this.name = name;
    this.func = func;
  }

  /**
   * 执行任务函数
   */
  execute(context: CommandContext): Observable<any> {
    const result = this.func(context);
    return result;
    // const result$ = (result instanceof Observable) ? result : of(result);
    // return result$;
  }
}

export { TaskFunc, TaskNode };
