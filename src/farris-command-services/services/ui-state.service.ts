import { Injectable } from '@angular/core';

/**
 * UI状态服务
 */
@Injectable()
class UIStateService {

  constructor() {
  }

  getState(componentId: string, stateName: string) {
    throw new Error('Not Implemented');
  }

  setState(componentId: string, stateName: string, value: any) {
    throw new Error('Not Implemented');
  }
}

export { UIStateService };
