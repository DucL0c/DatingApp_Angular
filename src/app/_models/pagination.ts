export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCounts: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result?: T[];
  pagination?: Pagination;
}
