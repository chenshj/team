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
class ListRepositoryService extends RepositoryService {

  /**
   * 构造函数
   */
  constructor(
    repository: Repository<any>,
    loadingService: FormLoadingService
  ) {
    super(repository, loadingService);
  }

  /**
   * 加载
   */
  load(): Observable<Entity[]> {
    this.loadingService.show();
    const query$ = this.repository.getList();
    return query$;
    // return query$.pipe(
    //   tap(() => {
    //     this.loadingService.hide();
    //   })
    // );
  }

  /**
   * 追加
   */
  append(): Observable<Entity> {
    this.loadingService.show();
    const append$ = this.repository.append();
    return append$.pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }

  /**
   * 删除
   */
  remove(id: string): Observable<boolean> {
    this.loadingService.show();
    const remove$ = this.repository.removeById(id);
    return remove$.pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }

}
export { ListRepositoryService };
