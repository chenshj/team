import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Repository, Entity } from '../../../devkit';
import { RepositoryService } from './repository.service';
import { FormLoadingService } from '../form-loading.service';


/**
 * 列表仓库服务
 */
@Injectable()
class ChildListRepositoryService extends RepositoryService {

  /**
   * 构造函数
   */
  constructor(
    repository: Repository<any>,
    loadingService: FormLoadingService
  ) {
    super(repository, loadingService);
  }

}
export { ChildListRepositoryService };
