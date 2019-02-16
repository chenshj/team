import { Injectable } from '@angular/core';
import { Repository } from '../../../devkit';
import { FormLoadingService } from '../form-loading.service';

/**
 * Repository服务
 */
@Injectable()
class RepositoryService {

  /**
   * 构造函数
   * @param repository 实体仓库
   * @param loadingService 加载提示服务
   */
  constructor(
    protected repository: Repository<any>,
    protected loadingService: FormLoadingService
  ) {
  }

}

export { RepositoryService };
