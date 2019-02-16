/*
 * @Author: Witt
 * @Date: 2018-10-11 20:32:02
 * @Last Modified by: Witt
 * @Last Modified time: 2018-10-19 14:50:38
 * @todo 待重构
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

@Injectable()
class BefSessionService {

  /**
   * http客户端
   */
  private httpClient: HttpClient;

  /**
   * 框架会话获取Uri
   */
  private frmSessionUri: string;

  /**
   * 框架会话id
   */
  private frmSessionId: string;

  /**
   * BE会话获取Uri
   */
  private beSessionUri: string;

  /**
   * BeSession会话id
   */
  private beSessionId: string;

  /**
   * 构造函数
   */
  constructor(httpClient: HttpClient, serverUri: string, beUri: string) {
    this.httpClient = httpClient;
    this.frmSessionUri = `${serverUri}/api/runtime/sys/v1.0/login-states/UserLogin`;
    this.beSessionUri  = `${serverUri}/${beUri}/service/createsession`;
  }

  /**
   * 获取FrmSessionId
   */
  public getFrmSessionId(): Observable<string> {
    if (this.frmSessionId) {
      return of(this.frmSessionId);
    }
    return this.createFrmSessionId();
  }

  /**
   * 获取FrmSessionId
   */
  public createFrmSessionId(): Observable<string> {
    const body = {
      UserName: 'jiwt',
      PassWord: 'aaaaaa',
      Language: 'zh-CHS',
      Tenant: '10000'
    };
    return this.httpClient.post(this.frmSessionUri, body).pipe(
      map((data: any) => {
        this.frmSessionId = data.sessionId;
        return this.frmSessionId;
      })
    );
  }

  /**
   * 获取BeSessionId
   */
  public getBeSessionId(): Observable<string> {

    if (this.beSessionId) {
      return of(this.beSessionId);
    }

    return this.createBeSession();
  }

  /**
   * 创建BeSessionId
   */
  public createBeSession(): Observable<string> {

    return this.getFrmSessionId().pipe(
      switchMap((frmSessionId: string) => {
        return this.httpClient.post(
          this.beSessionUri, null,
          {
            headers: new HttpHeaders({'SessionId': frmSessionId}),
            responseType: 'text'
          }
        );
      }),
      tap((beSessionId: string) => {
        this.beSessionId = beSessionId;
      })
    );
  }

}

export { BefSessionService };
