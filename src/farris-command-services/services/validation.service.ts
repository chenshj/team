import { Injectable } from '@angular/core';

@Injectable()
class ValidationService {

  /**
   * 构造函数
   */
  constructor() {
  }

  /**
   * 验证表单内的所有表单
   */
  public validate() {
    return true;
  }

}

export { ValidationService };


