
interface DataAccess {

  /**
   * 获取数据
   */
  getList(): any[];

  /**
   * 获取信息
   */
  getOne(id: string): any;

  /**
   * 删除信息
   */
  remove(id: string): boolean;

  /**
   * 批量删除
   */
  multiRemove(ids: string[]): boolean;

  /**
   * 创建
   */
  create(): any;

  /**
   * 保存
   */
  save(): any;

  /**
   * 创建下级节点
   * @param path 子节点路径，形如/15/jobs/12/grades
   */
  createChild(path: string);

  /**
   * 移除下级节点
   * @param path 子节点路径，形如/15/jobs/12/grades
   */
  removeChild(path: string);

}

export { DataAccess };
