export type ClassType = new (...args: any[]) => any;

export interface Pagination {
    pageSize: number;
    pageIndex: number;
    total: number;
}

export interface Pagination {
    pageSize: number;
    pageIndex: number;
    total: number;
}


export interface ResultData {
    data?: any[];
    pagination?: Pagination;
}

