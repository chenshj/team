import { Injector, Injectable, Optional, SkipSelf } from '@angular/core';

import { Entity } from '../entity/index';
import { Repository } from '../repository/index';

import { BindingData } from '../binding-data/index';
import { UIState } from '../ui-state/index';
import { Form } from '../form/index';
import { StateMachine } from '../state-machine/index';
import { ViewModel } from '../view-model/index';
import { CommandBus } from '../command/index';
import { Context, AppContext } from '../context/index';
import { FRAME_ID } from './tokens';

/**
 * Frame上下文
 */
@Injectable()
class FrameContext extends Context {

  /**
   * id
   */
  public frameId: string;

  /**
   * 注入器
   */
  public injector: Injector;

  /**
   * 应用上下文
   */
  public appContext: AppContext;

  /**
   * 跟
   */
  public root: FrameContext;

  /**
   * 父ViewModel
   */
  public parent: FrameContext;

  /**
   * 后代节点
   */
  public children: Map<string, FrameContext>;

  /**
   * 实体仓库
   */
  public repository: Repository<Entity>;

  /**
   * 命令总线
   */
  public commandBus: CommandBus;

  /**
   * 视图模型
   */
  public viewModel: ViewModel;

  /**
   * 数据绑定
   */
  public bindingData: BindingData;

  /**
   * UI状态
   */
  public uiState: UIState;

  /**
   * 状态机
   */
  public stateMachine: StateMachine;

  /**
   * 表单
   */
  public form: Form;

  /**
   * 构造函数
   * @param injector 注入器
   */
  constructor(injector: Injector, @Optional() @SkipSelf() parent: FrameContext ) {
    super();

    this.injector = injector;
    this.parent = parent;
    this.root = parent ? parent.root : this;

    this.frameId = this.injector.get<string>(FRAME_ID);
    this.appContext = this.injector.get(AppContext);
    this.appContext.regFrameContext(this.frameId, this);
  }

  /**
   * 初始化
   * @todo:
   * 1、CommandHandler中的服务可能会注入Context，所以CommandHandler创建时必须已经存在ComponentContext
   * 2、ViewModel的buildCommands中会使用CommandBus，为了保证顺序，将ViewModel的创建也放在init中。
   */
  public init() {
    this.initRepository();
    this.initViewModel();
  }

  /**
   * 初始化Repository
   */
  private initRepository() {
    this.repository = this.injector.get(Repository, null);
  }

  /**
   * 初始化ViewModel
   * @todo
   * 1、需要按照一定的顺序进行初始化，否则依赖无法正确处理；
   * 2、暂时使用init解决Context和其他部分的循环依赖问题，待优化；
   */
  private initViewModel() {

    // bindingData
    this.bindingData = this.injector.get<BindingData>(BindingData, null);
    if (this.bindingData) {
      this.bindingData.init(this.repository);
    }

    // Form
    this.form = this.injector.get<Form>(Form, null);
    if (this.form) {
      this.form.init(this.bindingData);
    }

    // UIState
    this.uiState = this.injector.get<UIState>(UIState, null);

    // StateMachine
    this.stateMachine = this.injector.get<StateMachine>(StateMachine, null);

    // CommandBus
    this.commandBus = this.injector.get<CommandBus>(CommandBus, null);

    // ViewModel
    this.viewModel  = this.injector.get<ViewModel>(ViewModel, null);
    if (this.viewModel) {
      this.viewModel.init(this);
      this.regViewModel(this.viewModel);
    }
  }

  /**
   * 注册子ViewModel
   * @todo
   * 1、propName写死了
   */
  regViewModel(viewModel: ViewModel): void {
    if (!this.parent || !this.parent.viewModel) {
      return;
    }

    const className = viewModel.constructor.name;
    const propName = className[0].toLowerCase() + className.substring(1, className.length);
    this.parent.viewModel[propName] = viewModel;
  }

}

export { FrameContext };
