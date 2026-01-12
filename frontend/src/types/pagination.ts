export type PaginationMeta = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PaginationParams = {
  page?: number;
  [key: string]: any;
};

export type RequestParams = {
  [key: string]: any;
};
