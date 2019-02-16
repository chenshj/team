import {InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { concatMap, map } from 'rxjs/operators';

import { FrameContext } from '../frame/index';
import { VariableParseService } from '../variable/index';

import { Command } from './command';
import { CommandContext } from './command_context';
import { TaskFunc, TaskFlow } from './flow/index';

/**
 * 命令处理抽象类，所有具体的命令处理类必须继承它，并实现schedule方法。
 *
 * ### 概述
 * 一个CommandHandler只能处理一种类型的Command，一种类型的Command也只能有一个CommandHandler.
 * 在CommandHandler内部，执行过程被拆解为一个一个的Task，CommandHandler内部会通过一个编排器对这些Task进行串联。
 *
 * ### 定义并注册CommandHandler
 *
 * **定义一个CommandHandler**
 *
 * 通过以下步骤可以定义一个CommandHandler
 * - 继承CommandHandler基类，并在构造函数中注入依赖的服务；
 * - 在schedule方法中依次添加要执行的任务；
 * - 使用NgCommandHandler注解指定对应的Command名称。
 *
 * ```ts
 * @Injectable()
 * @NgCommandHandler({
 *   commandName: 'formLoad'
 * })
 * class FormLoadHandler extends CommandHandler {
 *   constructor(private dataService: DataService) {
 *     super();
 *   }
 *   schedule() {
 *     this.addTask('loadData', () => {
 *       return this.dataService.loadData();
 *     });
 *   }
 * }
 * ```
 * **注册CommandHandler**
 *
 * 我们将包含FormLoadHandler的数组传递给CommandModule.setup方法，由它来统一进行注册。
 * ```ts
 * @NgModule({
 *   imports: [
 *     CommandModule.setup([FormLoadHandler], [FormLoadHandlerExtender])
 *   ]
 * })
 * class SimpleModule {}
 * ```
 *
 * ### 任务编排
 *
 * CommandHandler内任务的串联是通过rxjs来实现的，所有的任务都会被合并到一个执行流中。
 * 如果任务是异步的，并且下一任务依赖这个异步结果，则异步任务函数必须返回一个Observable对象，
 * 这样才能保证异步任务返回结果后再执行下一任务。
 *
 *  为了演示任务串联的过程，我们假设有这么一个场景，我们要展示当前用户下属部门的列表，并批量编辑它们。
 * * 假设服务器端没有对数据进行整合，完成数据加载我们需要执行以下两个步骤：
 * - 根据用户内码获取用户信息；
 * - 根据用户信息中的部门内码获取下属部门列表；
 *
 * ```ts
 * @Injectable()
 * @NgCommandHandler({
 *   commandName: 'formLoad'
 * })
 * class FormLoadHandler extends CommandHandler {
*
 *   constructor(
 *     private userService: UserService,
 *     private deptService: DeptService
 *   ) {
 *     super();
 *   }
 *
 *   schedule() {
 *     // 获取用户信息
 *     this.addTask('getUser', (preTaskResult: any, context: TaskExecutionContext) => {
 *       const userId = context.command.params.userId;
 *       return this.userService.geInfoById(userId);
 *     });
 *
 *     // 获取后代部门列表
 *     this.addTask('getDepts', (userInfo: any) => {
 *       return this.deptService.getDescendantsById(userInfo.deptId);
 *     });
 *   }
 * }
 * ```
 * 在getUser中我们获取用户信息，并将用户信息传递给下一任务，所以获取用户信息的任务函数需要返回一个Observable，
 * 只有异步结束并将用户信息发送到流执行流里的时候，getDepts任务才执行。
 *
 * ### 执行上下文
 *
 * 在实现任务函数时，我们可以通过任务上下文获取外部信息，任务上下文主要包括两部分：
 * - 通过任务函数的第一个参数直接获取上一步任务返回的结果。
 * - 通过任务函数的第二个参数获取上下文对象，其中command属性保存的是一个Command对象，进而获取它上边携带的参数；
 * - 通过任务函数的第二个参数获取上下文对象，其中results属性保存了已经执行了的任务的结果。
 *
 * 下面我通过一个示例来演示任务函数获取外部信息的使用。假设我们有这样一个场景：
 *  - 点击保存；
 *  - 检查库存；
 *  - 检查账户余额；
 *  - 检查通过后执行保存；
 *
 * ```ts
 * @Injectable()
 * @NgCommandHandler({
 *   commandName: 'save'
 * })
 * class SaveHandler extends CommandHandler {
 *
 *   private orderData: any;
 *
 *   constructor(
 *     private checkService: CheckService,
 *     private orderService: OrderService
 *   ) {
 *     super();
 *   }
 *
 *   schedule() {
 *
 *     // 解析参数
 *     this.addTask('getOrderData', (preTaskResult: any, context: TaskExecutionContext) => {
 *       // 第2个参数是上下文对象
 *       const command: Command = context.command;
 *       this.orderData = command.params.orderData;
 *     });
 *
 *     // 检查库存
 *     this.addTask('checkQuantity', (preTaskResult: any, context: TaskExecutionContext) => {
 *        return this.checkService.checkQuantity(this.orderData.quantity);
 *     });
 *
 *     // 检查账户余额
 *     this.addTask('checkQuantity', (isQuantityAvailable: any, context: TaskExecutionContext) => {
 *       // 第1个参数是上一步的执行结果
 *       if (isQuantityAvailable) {
 *         return false;
 *       }
 *       return this.checkService.checkMoney(this.orderData.totalMoney);
 *     });
 *
 *     // 执行保存
 *     this.addTask('checkQuantity', (preTaskResult: any, context: TaskExecutionContext) => {
 *       // 从context的result中获取已经执行过的任务结果，key是任务的名称
 *       if (!context.result['checkQuantity'] || !context.result['checkQuantity']) {
 *         return;
 *       }
 *       return this.orderService.save(this.orderData);
 *     });
 *   }
 * }
 * ```
 * 从上面的例子我们可以看到获取上下文的几种使用方式：
 * - 检查账户余额前，我们通过第一个参数获取上一步检查库存的执行结果；
 * - 保存数据时，我们通过上下文对象的command属性拿到Command对象，进而获取订单数据；
 * - 保存前，我们通过上下文对象的results属性拿到之前检查库存和检查账户余额的结果。
 */
abstract class CommandHandler {

  /**
   * 任务流程图
   */
  private taskFlow: TaskFlow;

  /**
   * 上下文
   */
  protected frameContext: FrameContext;

  /**
   * 变量解析服务
   */
  protected parseService: VariableParseService;

  /**
   * 构造函数
   */
  constructor() {
  }

  /**
   * 构造执行流程
   */
  abstract schedule();

  /**
   * 初始化
   */
  public init(frameContext: FrameContext) {
    this.frameContext = frameContext;
    this.parseService = frameContext.injector.get<VariableParseService>(VariableParseService);
    this.taskFlow = new TaskFlow();

    this.schedule();
  }

  /**
   * 执行任务
   * @param command 要执行的命令
   */
  public execute(command: Command) {

    const initContext = new CommandContext(command, this.frameContext);

    const context$ = new BehaviorSubject<CommandContext>(initContext);
    const currentTask = this.taskFlow.getNext('', initContext);
    currentTask.execute(initContext).subscribe();
    // const hideOrder$ = context$.pipe(
    //   concatMap((context: CommandContext) => {

    //     console.log('----------' + currentTask.name + '----------');
    //     const result$ = currentTask.execute(context);
    //     return result$.pipe(
    //       map((result: any) => {

    //         // 写入执行结果
    //         context.results[currentTask.name] = result;
    //         currentTask = this.taskFlow.getNext(currentTask.name, context);

    //         // 操作控制流
    //         if (currentTask) {
    //           context$.next(context);
    //         } else {
    //           context$.complete();
    //         }

    //         // 将结果流转换为context流
    //         return context;
    //       })
    //     );
    //   })
    // );

    // 订阅流
    // hideOrder$.subscribe();
    // hideOrder$.subscribe({
    //   next: (context: CommandContext) => {
    //     // console.log('----------next----------');
    //     // console.log(context);
    //   },
    //   complete: () => {
    //     console.log('----------complete----------');
    //   },
    //   error: (error) => {
    //     console.log('----------error----------');
    //     console.log(error);
    //   }
    // });
  }

  /**
   * 添加任务，只有子类可以添加任务，外部不能访问
   * @param name  任务名称
   * @param func 任务函数
   */
  protected addTask(name: string, func: TaskFunc) {
    this.taskFlow.addNode(name, func);
  }

  /**
   * 添加任务，只有子类可以添加任务，外部不能访问
   * @param name  任务名称
   * @param func 任务函数
   */
  protected addLink(from: string, to: string, condition: string | boolean) {
    this.taskFlow.addLink(from, to, condition);
  }

  /**
   * 插入任务
   * @param  name 要扩展的任务名称
   * @param  func 扩展函数
   */
  public insertTask(target: string, name: string, func: TaskFunc) {
    throw new Error('Not Implemented');
  }

  /**
   * 插入任务
   * @param  name 要扩展的任务名称
   * @param  func 扩展函数
   */
  public afterTask(target: string, name: string, func: TaskFunc) {
    throw new Error('Not Implemented');
  }

  /**
   * 替换任务
   * @param  name 要替换的任务名称
   * @param  func 替换函数
   */
  public replaceTask(name: string, func: TaskFunc) {
    throw new Error('Not Implement');
  }

  /**
   * 调用方法
   */
  public invoke(serviceInstance: any, method: string, args: any[], context: CommandContext) {
    const parsedArgs = this.parseService.parse(args, context);
    return serviceInstance[method](...parsedArgs);
  }

}

/**
 * 命令处理器注入Token
 */
const COMMAND_HANDLERS_TOKEN = new InjectionToken<CommandHandler>('@Farris Command Handlers');

export { CommandHandler, COMMAND_HANDLERS_TOKEN };
