import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '../../../../devkit';

/**
 * 视图模型
 */
@Injectable()
export class MonthlyPlanViewModel extends ViewModel {

  /**
   * 表单加载
   */
  @NgCommand({
    name: 'loadData'
  })
  public loadData() { }

  /**
   * 搜索
   */
  @NgCommand({
    name: 'search'
  })
  public search() { }

  /**
   * 新增
   */
  @NgCommand({
    name: 'route',
    params: {
      action: 'add'
    }
  })
  public add() { }

  /**
   * 编辑
   */
  @NgCommand({
    name: 'route',
    params: {
      action: 'edit'
    }
  })
  public edit() { }

  /**
   * 查看
   */
  @NgCommand({
    name: 'route',
    params: {
      action: 'view'
    }
  })
  public view() { }

  /**
   * 删除
   */
  @NgCommand({
    name: 'remove',
  })
  public remove() { }

}
