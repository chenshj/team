import { Subject } from 'rxjs/Subject';
import { MetadataUtil } from '../metadata/index';
import { NG_UI_STATE, NgUIState } from './decorators';
import { UIStateChange } from './type';

/**
 * UI状态
 */
class UIState {

  /**
   * 状态集合
   */
  public states: Map<string, Map<string, any>> = new  Map<string, Map<string, any>>();

  /**
   * 变更集
   */
  public changes: Subject<any> = new Subject<any>();

  /**
   * 构造函数
   */
  constructor() {
    this.extendProperties();
  }

  /**
   * 获取状态
   * @param controlId 组件id
   * @param stateName 状态名称
   */
  public getState(componentId: string, stateName: string) {

    const componentStates = this.getComponentStates(componentId);
    return componentStates.get(stateName);
  }

  /**
   * 设置状态
   * @param componentId 组件id
   * @param stateName   状态名称
   */
  public setState(componentId: string, stateName: string, value: any) {
    const componentStates = this.getComponentStates(componentId);
    const oldValue = this.getState(componentId, stateName);

    // 新旧值不一致时，触发变更事件
    if (oldValue === value) {
      return;
    }

    componentStates.set(stateName, value);
    const change: UIStateChange = {
      controlId: componentId,
      stateName: stateName,
      oldValue: oldValue,
      value: value
    };
    this.changes.next(change);
  }

  /**
   * 获取组件状态对象
   * @param componentId 组件id
   */
  private getComponentStates(componentId: string): Map<string, any> {
    if (this.states.has(componentId) === false) {
      this.states.set(componentId, new Map<string, any>());
    }
    return this.states.get(componentId);
  }

  /**
   * 扩展属性
   */
  private extendProperties(): void {
    const ngUIStates = MetadataUtil.getPropsMetadatasByName(this.constructor, NG_UI_STATE);
    if (!ngUIStates) {
      return;
    }
    Object.keys(ngUIStates).forEach((propName: string) => {
      const ngUIState: NgUIState = ngUIStates[propName];

      // 重写属性get、set
      Object.defineProperty(this, propName, {
        get: () => {
          return this.getState(ngUIState.componentId, ngUIState.stateName);
        },
        set: (value) => {
          this.setState(ngUIState.componentId, ngUIState.stateName, value);
        }
      });
    });
  }

}
export { UIState };
