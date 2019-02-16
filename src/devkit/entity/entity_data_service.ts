import { InjectionToken } from '@angular/core';

/**
 * 实体取数服务
 */
interface EntityDataService {

  /**
   * 新增子实体
   * @param path 子实体路径
   */
  addChild(childPath: string);

  /**
   * 删除子实体
   * @param path 子实体路径
   * @param id 待删除子实体id
   */
  removeChild(childPath: string, id: string);

}

const ENTITY_DATA_SERVICE_TOKEN = new InjectionToken<EntityDataService>('@farris/devkit ENTITY_DATA_SERVICE')

export { EntityDataService, ENTITY_DATA_SERVICE_TOKEN };
