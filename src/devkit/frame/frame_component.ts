import { Injector, Injectable } from '@angular/core';
import { FrameContext } from './frame_context';
import { ViewModel } from '../view-model/index';

@Injectable()
abstract class FrameComponent {

  /**
   * 框架ID
   */
  public id: string;

  /**
   * 框架上下文
   */
  public context: FrameContext;

  /**
   * 视图模型
   */
  public viewModel: ViewModel;

  /**
   * 框架构造函数
   * @param injector 注入器
   */
  constructor(protected injector: Injector) {
    this.context = this.injector.get<FrameContext>(FrameContext);
    this.context.init();
    this.viewModel = this.context.viewModel;
  }
}

export { FrameComponent };
