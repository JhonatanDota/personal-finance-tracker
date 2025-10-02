export type Pagination = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type PaginatedResponse<T> = Pagination & {
  data: T[];
  meta: Pagination;
};

export type PaginationParams = {
  page?: number;
  [key: string]: any;
};
