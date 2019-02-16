import { Injectable } from '@angular/core';

/**
 * 实体服务
 */
@Injectable()
class EntityService {

  /**
   * 新增
   */
  addChild(path: string): void {
    throw new Error('暂未实现');
  }

  /**
   * 新增
   */
  removeChild(path: string, id: string): void {
    throw new Error('暂未实现');
  }
}

export { EntityService };
