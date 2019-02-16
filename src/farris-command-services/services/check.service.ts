import { Injectable } from '@angular/core';

/**
 * 检查规则
 */
@Injectable()
class CheckService {

  /**
   * 检查是否为空
   */
  public checkEmpty(value: any) {
    return !!value;
  }
}

export { CheckService };
