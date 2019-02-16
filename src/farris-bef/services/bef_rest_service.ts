/*
 * @Author: Witt
 * @Date: 2018-10-12 14:43:49
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-19 14:55:19
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';

import { BefSessionService } from './bef_session.service';
import { ChangeDetail } from './types';


/**
 * BEF取数服务
 * 该服务由BefRepository实例化，不做注入，每个BefRepository拥有一个BefRestService实例。
 */
@Injectable()
class BefRestService {

  /**
   * httpClient
   */
  private httpClient: HttpClient;

  /**
   * 会话服务
   */
  private sessionService: BefSessionService;

  /**
   * 接口根Uri
   */
  protected baseUri: string;

  /**
   * 构造函数
   * @param httpClient http服务
   * @param serverUri 应用服务器地址
   * @param beUri BE API地址
   */
  constructor(httpClient: HttpClient, serverUri: string, beUri: string) {
    this.httpClient = httpClient;
    // this.baseUri = `${serverUri}/${beUri}`;
    this.baseUri = `${beUri}`;
    this.sessionService = new BefSessionService(httpClient, serverUri, beUri);
  }

  /**
   * 列表查询
   * @return 数据数组
   * @todo
   * 1、目前仅支持查询全部数据
   */
  public query(): Observable<any> {
    return this.request(this.baseUri, 'GET');
  }

  /**
   * 数据检索
   * @param id 单据内码
   * @return 数据对象
   */
  public retrieve(id: string): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.request(url, 'GET');
  }

  /**
   * 创建一条数据
   * @summary
   * 返回带默认值的空数据，服务器端该数据在BE缓存中，尚未保存到数据库
   */
  public create(): Observable<any> {
    return this.request(this.baseUri, 'POST');
  }

  /**
   * 从表新增
   * @path 新增路径（从表形如：/1/edus，从从表形如：/1/edus/11/grades）
   * @return
   */
  public createChild(fpath: string): Observable<any> {
    const url = `${this.baseUri}/${fpath}`;
    return this.request(url, 'POST');
  }

  /**
   * 提交变更
   * @summary
   * 此时变更提交的BE缓存中，等待保存，服务器端不返回任何数据
   */
  update(changeDetail: ChangeDetail): Observable<any> {
    const optionsWithBody = this.addBody({}, changeDetail);
    return this.request(this.baseUri, 'PATCH', null, optionsWithBody);
  }

  /**
   * 保存
   * @summary
   * 通过此地方将BEF中的变更缓存应用到数据库中，服务器端不返回任何数据
   */
  public save(): Observable<any> {
    return this.request(this.baseUri, 'PUT');
  }

  /**
   * 删除
   */
  public delete(id: string): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.request(url, 'DELETE');
  }

  /**
   * 删除后代
   * @param fpath 父路径（从表形如：/1/edus，从从表形如：/1/edus/11/grades）
   */
  public deletChild(fpath: string, id: string) {
    const url = `${this.baseUri}${fpath}/${id}`;
    return this.request(url, 'DELETE');
  }

  /**
   * 批量删除
   * @param ids 待删除的id数组
   */
  public batchDelete(ids: string[]): Observable<any> {
    const params = {
      ids: ids.join(',')
    };
    return this.request(this.baseUri, 'DELETE', params);
  }

  /**
   * 批量删除子表记录
   * @param fpath 父路径
   * @param ids 待删除的id数组
   */
  public batchDeleteChild(fpath: string, ids: string[]): Observable<any> {
    throw new Error('Not Implemented');
  }

  /**
   * 取消
   */
  public cancel(): Observable<any> {
    const url = `${this.baseUri}/service/cancel`;
    return this.request(url, 'POST');
  }

  /**
   * 发送http请求
   */
  public request(url: string, method: string, params?: any, options?: any): Observable<any> {

    options = options || {};

    // params
    if (params) {
      const httpParams = this.buildParams(params);
      options.params = httpParams;
    }

    // 串联session流和http流
    // return this.sessionService.getBeSessionId().pipe(
    //   switchMap((sessionId: string) => {
        // options.headers = new HttpHeaders({ 'SessionId': sessionId });
        return this.httpClient.request(method, url, options);
      // })
    // );
  }

  /**
   * 构造HttpParams对象
   * @param params 请求参数
   */
  private buildParams(params: object): HttpParams {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key].toString();
        httpParams = httpParams.append(key, value);
      }
    }
    return httpParams;
  }

  /**
   * 向HttpOptions对象中添加body
   * @param options 原来的options
   * @param body body内容
   */
  private addBody(options: any, body: any) {
    options = options || {};
    const mergedOptions = Object.assign(options, { body: body });
    return mergedOptions;
  }

}

export { BefRestService };

