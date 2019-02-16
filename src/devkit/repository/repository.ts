/*
 * @Author: Witt
 * @Date: 2018-10-12 15:37:11
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-19 11:23:09
 * @todo 待优化问题
 * 1、apiUrl是否应该在基类中，子类中的api如何传递给基类；
 */

import { Type, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Modification } from '../changeset/index';
import { MetadataUtil } from '../metadata/index';
import { Entity, EntityFactory, FieldMetadataUtil } from '../entity/index';
import { NgRepository } from './decorators';
import { EntityCollection } from './entity-collection';

@Injectable()
export abstract class Repository<T extends Entity> {

  /**
   * API地址
   */
  public apiUri: string;

  /**
   * 实体类型
   */
  public entityType: Type<T>;

  /**
   * 实体主键
   */
  public primaryKey: string;

  /**
   * 实体集合
   */
  public entityCollection: EntityCollection<T>;

  /**
   * 实体变更集合
   */
  public get entityCollectionChange(): Subject<Modification> {
    return this.entityCollection.collectionChanged;
  }

  /**
   * 构造函数
   */
  constructor() {
    this.readMetadata();
    this.entityCollection = new EntityCollection<T>(this.primaryKey);
  }

  /**
   * 读取元数据
   */
  readMetadata() {
    const repositoryMetadata: NgRepository = MetadataUtil.getClassMetadataByName(this.constructor, 'NgRepository');
    if (!repositoryMetadata) {
        throw new Error('实体仓库必须使用NgRepository标记，请检查');
    }

    // API地址
    this.apiUri = repositoryMetadata.apiUrl;

    // 实体类型
    this.entityType = repositoryMetadata.entityType;

    // 主键
    const primaryKeyMetadata = FieldMetadataUtil.getPrimaryFieldMetadata(this.entityType);
    if (!primaryKeyMetadata) {
      throw new Error('实体必须指定主键，请检查');
    }
    this.primaryKey = primaryKeyMetadata.property;
  }

  /**
   * 构造实体
   */
  protected buildEntity(data: any): T {
    const entity = EntityFactory(this.entityType, data) as T;
    return entity;
  }

  /**
   * 获取实体列表
   */
  abstract getList(): Observable<T[]>;

  /**
   * 根据id获取实体
   * @param id
   */
  abstract getById(id: string): Observable<T>;

  /**
   * 根据id更新实体
   * @param id 实体id
   */
  abstract updateById(id: string):  Observable<T>;

  /**
   * 创建新实体，将该实体加载到列表
   */
  abstract create(): Observable<any>;

  // /**
  //  * 创建后代实体，将该实体加载到后代列表（暂无该场景）
  //  * @param path 路径
  //  */
  // abstract createByPath(path: string);

  /**
   * 创建新实体，并追加到实体列表
   */
  abstract append(): Observable<any>;

  /**
   * 创建新的子实体，并追加到实体列表
   * @param path 实体路径
   */
  abstract appendByPath(path: string): Observable<any>;

  /**
   * 根据id删除对应实体
   * @param id 内码
   */
  abstract removeById(id: string): Observable<any>;

  /**
   * 根据ids批量删除实体
   */
  abstract removeByIds(id: string[]): Observable<any>;

  /**
   * 根据id删除path对应的后代实体
   */
  abstract removeByPath(path: string, id: string);

  /**
   * 提交id对应的根实体变更
   */
  abstract updateChangesById(id: string): Observable<boolean>;

  /**
   * 提交path对应的实体变更
   */
  abstract updateChangesByPath(path: string, id: string): Observable<any>;

  /**
   * 更新所有变更
   */
  abstract updateAllChanges(): Observable<any>;

  /**
   * 应用服务器端变更
   */
  abstract applyChanges(): Observable<boolean>;

  /**
   * 取消变更集
   */
  abstract cancelChanges(): Observable<boolean>;

  /**
   * 数据加锁
   */
  abstract lockById(id: string): Observable<boolean>;

}
