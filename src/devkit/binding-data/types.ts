/**
 * 分页信息
 */
export interface Pagination {

  /**
   * 当前页码
   */
  pageIndex: number;

  /**
   * 分页大小
   */
  pageSize: number;

  /**
   * 总记录数
   */
  totalRecords: number;

  /**
   * 总页数
   */
  totalPages: number;
}
