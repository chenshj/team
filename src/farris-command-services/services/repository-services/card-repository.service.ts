import { Injectable } from '@angular/core';
import { Repository, Entity } from '../../../devkit';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { RepositoryService } from './repository.service';
import { FormLoadingService } from '../form-loading.service';

/**
 * 卡片仓库服务
 */
@Injectable()
class CardRepositoryService extends RepositoryService {

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
   * 更新
   */
  update(id: string): Observable<Entity> {
    this.loadingService.show();
    const update$ = this.repository.updateById(id);
    return update$.pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }

  /**
   * 锁定
   */
  lock(id: string): Observable<boolean> {
    this.loadingService.show();
    const lock$ = this.repository.lockById(id);
    return lock$.pipe(
      catchError((err: any) => {
        return of(false);
      }),
      tap((result) => {
        this.loadingService.hide();
      })
    );
  }

  /**
   * 保存
   */
  save(): Observable<boolean> {
    this.loadingService.show();
    const save$ = this.repository.applyChanges();
    return save$.pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }

  /**
   * 取消
   */
  cancel() {
    this.loadingService.show();
    const cancel$ = this.repository.cancelChanges();
    return cancel$.pipe(
      tap(() => {
        this.loadingService.hide();
      })
    );
  }

}
export { CardRepositoryService };
