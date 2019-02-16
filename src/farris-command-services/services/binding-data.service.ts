import { Injectable } from '@angular/core';
import { BindingData } from '../../devkit';

/**
 * 实体服务
 */
@Injectable()
class BindingDataService {

  /**
   * 构造函数
   * @param bindingData
   */
  constructor(private bindingData: BindingData) {
  }

  /**
   * 设置当前框架的当前行
   */
  setCurrentId(id: string) {
    this.bindingData.list.setCurrentId(id);
  }

  /**
   * 设置目标框架的当前行
   */
  setCurrentIdWithFrameId(id: string, frameId: string) {
    console.log(frameId);
  }

}

export { BindingDataService };
