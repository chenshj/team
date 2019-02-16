/*
 * @Author: Sagi, Lucas, Witt
 * @Date: 2018-10-11 17:34:26
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-19 16:05:30
 *
 * @todo
 * 1、不支持查询、分页、过滤，一次性取全部数据；
 * 2、不支持上一页、下一页；
 * 3、BefRestService实例创建方式待优化，临时采用方案a
 *    a、内部创建，传递HttpClient和apiUrl；
 *    b、依赖注入，此时多个Repository共享一个BefRestService，在调用方法时需要传递apiService；
 * 4、BefRespository依赖CloudFrameworkService是否合适？
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

import { Entity, Repository } from '../../devkit';
import { BefRestService } from './bef_rest_service';
import { BefChangeBuilder } from './bef_change_builder';
import { BE_SERVER_URI_TOKEN } from './tokens';


/**
 * BEF实体仓储
 */
@Injectable()
abstract class BefRepository<T extends Entity> extends Repository<T> {

  /**
   * 模拟取数服务
   */
  private restService: BefRestService;

  /**
   * 变更集构造
   */
  private changeBuilder: BefChangeBuilder;


  /**
   * api
   * 形如：api/scm/sd/v1.0/empservice，前后均不带/
   */

  /**
   * 构造函数
   */
  constructor(
    httpClient: HttpClient,
    @Inject(BE_SERVER_URI_TOKEN) serverUri: string,
  ) {
    super();
    this.createRestService(httpClient, serverUri);
  }

  createRestService(httpClient: HttpClient, serverUri: string) {
    this.restService = new BefRestService(httpClient, serverUri, this.apiUri);
    this.changeBuilder = new BefChangeBuilder(this.entityType);
  }


  /**
   * 获取实体集合
   */
  public getList(): Observable<T[]> {
    const result$ = this.restService.query();
    return result$;
    // return result$.pipe(
    //   map((listData: any[]) => {
    //     const entities: T[] = [];
    //     listData.forEach((data: any) => {
    //       const entity = this.buildEntity(data);
    //       entities.push(entity);
    //     });
    //     this.entityCollection.loadEntities(entities);
    //     return entities;
    //   })
    // );
  }

  /**
   * 获取单个实体
   */
  public getById(id: string): Observable<T> {
    const retrieve$ = this.restService.retrieve(id);
    const result$ = retrieve$.pipe(
      map((data: any) => {
        const entity = this.buildEntity(data);
        this.entityCollection.loadEntities([entity]);
        return entity;
      })
    );
    return result$;
  }

  /**
   * 根据id更新实体
   * @param id 实体id
   */
  public updateById(id: string): Observable<T> {
    const retrieve$ = this.restService.retrieve(id);
    const result$ = retrieve$.pipe(
      map((data: any) => {
        const entity = this.entityCollection.getEntityById(id);
        entity.load(data);
        return entity;
      })
    );
    return result$;
  }

  /**
   * 根据id给实体加锁
   * @todo：通过一个空变更进行加锁，待确认
   */
  public lockById(id: string): Observable<boolean> {
    const entity = this.entityCollection.getEntityById(id);

    // 组织一个空变更
    const changeDetail = this.changeBuilder.build([]);
    changeDetail.ChangeInfo.DataId = id;

    // 提交变更
    const update$ = this.restService.update(changeDetail);
    const result$ = update$.pipe(
      map(() => {
        return true;
      })
    );

    return result$;
  }

  /**
   * 创建新实体，并加载
   */
  public create() {
    const result$ = this.restService.create();
    return result$.pipe(
      map((newData: any) => {
        const newEntity = this.buildEntity(newData);
        this.entityCollection.loadEntities([newEntity]);
        return newEntity;
      })
    );
  }

  /**
   * 创建子实体，并加载
   * @param path 路径
   */
  public createByPath(path: string) {
    throw new Error('Not Implemented');
  }

  /**
   * 追加实体
   */
  public append(): Observable<T> {
    const result$ = this.restService.create();
    return result$.pipe(
      map((newData: any) => {
        const newEntity = this.buildEntity(newData);
        this.entityCollection.addEntity(newEntity);
        return newEntity;
      })
    );
  }

  /**
   * 创建子实体，并追加
   */
  public appendByPath(): Observable<any> {
    // 追加子实体
    throw new Error('Not Implemented');
  }

  /**
   * 根据id删除实体
   * @param id 内码
   */
  public removeById(id: string):  Observable<boolean> {

    // 服务器端删除
    const delete$ = this.restService.delete(id);

    // 从本地实体集合中移除
    return delete$.pipe(
      switchMap(() => {
        return this.applyChanges();
      })
    );
  }

  /**
   * 批量删除
   * @param id 内码
   */
  public removeByIds(id: string[]): Observable<any> {
    throw new Error('Not Implemented');
  }

  /**
   * 删除子级
   * @param path 路径
   * @param id   内码
   */
  public removeByPath(path: string, id: string): Observable<any> {
    throw new Error('Not Implemented');
  }

  /**
   * 提交根实体变更
   * 1、将变更提交到服务器端；
   * 2、本地变更丢弃；
   * 3、如果取消：通过本地原始数据来恢复，而不是通过变更集来恢复；
   */
  public updateChangesById(id: string): Observable<boolean> {
    const entity = this.entityCollection.getEntityById(id);
    if (entity.changes && entity.changes.length === 0) {
      return of(true);
    }
    const changeDetail = this.changeBuilder.build(entity.changes);
    const result$ = this.restService.update(changeDetail);
    result$.pipe(
      tap(() => {

        // 删除该实体的变更
        // @todo: 考虑调整Entity或者ChangeSet的api，对外暴露清空方法
        entity.changes.splice(0, entity.changes.length);
      })
    );
    return result$;
  }

  /**
   * 提交path对应实体的变更
   */
  public updateChangesByPath(path: string, id: string): Observable<any> {
    throw new Error('Not Implement');
  }

  /**
   * 提交所有变更
   */
  public updateAllChanges(): Observable<boolean> {

    // 遍历实体，提交变更
    const updateResults: Observable<boolean>[] = [];
    const entities: Entity[] = this.entityCollection.toArray();
    entities.forEach((entity: Entity) => {
      const updateResult$ = this.updateChangesById(entity.primaryValue);
      updateResults.push(updateResult$);
    });

    // 串联流
    const result$ = zip(...updateResults).pipe(
      map((results: boolean[]) => {

        // 所有更新都成功，返回ture，否则返回false
        // return results.every((result) => {
        //   return result === true;
        // });
        return true;
      })
    );

    return result$;
  }

  /**
   * 应用变更
   */
  public applyChanges(): Observable<boolean> {

    const update$ = this.updateAllChanges();
    const save$   = this.restService.save();

    const result$ = update$.pipe(

      // 转换为保存流
      switchMap((updateResult: boolean) => {
        if (updateResult === false) {
          return of(false);
        } else {
          return save$;
        }
      }),

      // 更新本地数据
      tap((saveResult: boolean) => {
        if (saveResult) {
          const entities = this.entityCollection.toArray();
          entities.forEach((entity: Entity) => {
            // 当前数据 => 原始数据
          });
        }
      }),

      // 转换为保存结果流（boolean流）
      map((saveResult: boolean) => {
        if (saveResult === false) {
          return false;
        } else {
          return true;
        }
      })
    );

    return result$;
  }

  /**
   * 取消变更
   */
  public cancelChanges(): Observable<boolean> {
    const cancel$ = this.restService.cancel();
    cancel$.pipe(

      // 数据源操作
      tap(() => {
        const entities = this.entityCollection.toArray();
        entities.forEach((entity: Entity) => {

          // 原始数据 => 当前数据
        });
      }),

      // 转换为结果流
      map(() => {
        return true;
      })
    );
    return cancel$;
  }

}

export { BefRepository };
