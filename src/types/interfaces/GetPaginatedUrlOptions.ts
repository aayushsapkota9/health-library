export interface PaginationUrlOptions {
  page: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string | number;
}
