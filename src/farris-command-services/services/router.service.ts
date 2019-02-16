import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 路由服务
 * @todo
 * 1、angular中参数分了几种，要支持哪些；
 * 2、和框架菜单集成；
 */
@Injectable()
class RouterService {

  constructor(private router: Router) {
  }

  /**
   * 切换路由
   * @param url 菜单ID
   * @param params 路由参数
   */
  public route(url: string, params: any) {
    this.router.navigate([url, params]);
  }

  /**
   * 打开功能菜单
   * @param menuId 菜单id
   * @param params 路由参数
   */
  public openMenu(menuId: string, params: any) {
    if (typeof params === 'string') {
      params = JSON.parse(params);
    }
    console.log('----------openMenu----------');
    console.log(menuId);
    console.log(params);
    // this.router.navigate([menuId, params]);
  }
}

export { RouterService };
