import { Injectable, Injector } from '@angular/core';
import { MetadataUtil } from '../metadata/index';
import { Command } from '../command/index';
import { NG_COMMAND, NgCommand } from './decorators';
import { BindingData } from '../binding-data/index';
import { UIState } from '../ui-state/index';
import { Form } from '../form/index';
import { StateMachine } from '../state-machine/index';
import { FrameContext } from '../frame/index';

/**
 * ViewModel是界面层访问应用层的入口。
 *
 * ### 定义ViewModel
 *
 * 定义ViewModel需要以下几个步骤：
 *
 * 1、定义的ViewModel需要继承ViewModel基类
 * 2、使用NgViewModel关联相关对象，比如：绑定数据（SinmpleDemoBindingData）、表单（SimpleDemoForm）、
 *    状态机（SimpleDemoStateMachine）等，但所有这些关联都是可选的，用不到或者自己单独实现时，不指定即可。
 * 3、同时我们需要传递一个injector给基类的构造函数，在ViewModel实例化时，会从injector获取NgViewModel声明的各个类型的实例。
 *
 * 下面我们来定义一个简单的ViewModel，代码如下：
 * ```ts
 * import { Injector, Injectable } from '@angular/core';
 * import { NgViewModel, ViewModel } from '@farris/devkit';
 *
 * @Injectable()
 * @NgViewModel({
 *   children: [],
 *   binding: SimpleDemoBindingData,
 *   form: SimpleDemoForm,
 *   stateMachine: SimpleDemoStateMachine,
 * })
 * class SimpleDemoViewModel extends ViewModel {
 *    constructor(injector: Injector) {
        super(injector);
 *    }
 *    @NgCommand({
 *      name: 'formLoad',
 *      params: {
 *        dataId: '1'
 *      }
 *    })
 *    public formLoad() {}
 * }
 * export { SimpleDemoViewModel };
 * ```
 *
 * 通过组件的构造函数，我们将ViewModel注入进组件
 * ```ts
 * @Component({
 *   selector: 'app-simple-demo',
 *   templateUrl: './simple-demo.component.html'
 * })
 * class SimpleDemoComponent implements OnInit {
 *
 *   public viewModel: SimpleDemoViewModel;
 *
 *   constructor(viewModel: SimpleDemoViewModel) {
 *     this.viewModel = viewModel;
 *   }
 * }
 * ```
 *
 * ### 组件模板中使用ViewModel
 *
 * 我们可以在模板中绑定NgViewModel中指定的 BindingData、Form、StateMachine的实例。
 * ```html
 * * <!--绑定数据-->
 * <p>{{viewModel.bindingData.name}}</p>
 *
 * <!--绑定表单-->
 * <form [formGroup]="viewModel.form">
 *   <input type="text" formControlName="name">
 * </form>
 *
 * <!--绑定状态机-->
 * <button type="button" [disabled]="!viewModel.stateMachine.canAdd">新增 </button>
 * * ```
 *
 * 我们在模板中绑定绑定viewModel的一个方法作为事件处理，这个方法可以是普通的方法，也可以是用NgCommand注解修饰过的。
 * ```html
 * <button type="button" (click)="viewModel.add()">新增 </button>
 * ```
 *
 * ### 组合的ViewModle
 *
 * 当界面比较复杂时，我们对界面按一定的粒度进行拆分，拆分出来的各个组成部分分别对应一个ViewModel，这样就形成了一个ViewModel树。
 * 我们在父的ViewModel的NgViewModel注解中通过在children属性中声明它的子ViewModel，将它们关联起来。
 * 假设我们有一个左列表右卡片的界面，我们可以为左列表、右卡片分别定义一个ViewModel，然后在页面的ViewModel中，将它们组合起来，
 * 代码如下：
 * ```ts
 * @Injectable()
 *  @NgViewModel({
 *  children: [LeftListViewModel, RightCardViewModel],
 *    binding: NestedDemoBindingData,
 * })
 * class NestedDemoViewModel extends ViewModel {
 *   constructor(injector: Injector) {
 *     super(injector);
 *   }
 * }
 * export { NestedDemoViewModel };
 * ```
 */
@Injectable()
class ViewModel {

  /**
   * 绑定数据
   */
  public bindingData: BindingData;

  /**
   * 界面状态
   */
  public uiState: UIState;

  /**
   * 表单定义
   */
  public form: Form;

  /**
   * 状态机
   */
  public stateMachine: StateMachine;

  /**
   * 初始化
   */
  public init(context: FrameContext) {
    this.bindingData  = context.bindingData;
    this.uiState      = context.uiState;
    this.form         = context.form;
    this.stateMachine = context.stateMachine;
    this.buildCommands(context);
  }

  /**
   * 绑定命令
   */
  public buildCommands(context: FrameContext) {
    const ngCommands = MetadataUtil.getPropsMetadatasByName(this.constructor, NG_COMMAND);
    Object.keys(ngCommands).forEach( (propertyName: string) => {
      const ngCommand: NgCommand = ngCommands[propertyName];
      Object.defineProperty(this, propertyName, {
        value: () => {

          // 获取命令处理上下文
          let targetContext = context;
          if (ngCommand.frameId) {
            targetContext = context.appContext.getFrameContext(ngCommand.frameId);
          }

          const command: Command = {
            name: ngCommand.name,
            params: ngCommand.params
          };
          targetContext.commandBus.dispatch(command);
        }
      });
    });
  }
}

export { ViewModel };
