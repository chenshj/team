import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export type RestfulMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

@Injectable()
export class RestfulService {

  /**
   * 构造函数
   * @param httpClient http客户端
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * 发送GET请求
   * @param uri 请求地址
   * @param params 请求参数
   */
  get(uri: string, params?: object, options?: any): Observable<any[]> {
    return this.request(uri, 'GET', params, options);
  }

  /**
   * 发送POST请求
   * @param uri 请求地址
   * @param params 请求参数
   */
  put(uri: string, body: any, params?: object, options?: any): Observable<any> {
    const optionsWithBody = this.addBody(options, body);
    return this.request(uri, 'PUT', params, optionsWithBody);
  }

  /**
   * 发送PUT请求
   * @param uri 请求地址
   * @param params 请求参数
   */
  post(uri: string, body: any, params?: object, options?: any): Observable<any> {
    const optionsWithBody = this.addBody(options, body);
    return this.request(uri, 'POST', params, optionsWithBody);
  }

  /**
   * 发送DELETE请求
   * @param uri 请求地址
   * @param params 请求参数
   */
  delete(uri: string, params?: object, options?: any): Observable<any> {
    return this.request(uri, 'DELETE', params, options);
  }

  /**
   * 发送请求
   * @param uri 请求地址
   * @param params 请求参数
   */
  private request(uri: string, method: RestfulMethod, params: object, options: any = {}): Observable<any> {
    options = options || {};
    if (params) {
      const httpParams = this.buildParams(params);
      options.params = httpParams;
    }
    const methodName = method as string;
    const result = this.httpClient.request(methodName, uri, options);
    return result;
  }

  /**
   * 构造Http请求参数
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

  private addBody(options: any, body: any) {
    options = options || {};
    const mergedOptions = Object.assign(options, { body: body});
    return mergedOptions;
  }
}
