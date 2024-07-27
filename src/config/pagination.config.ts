enum SortOrder {
  asc = 'ASC',
  desc = 'DESC',
}
export const paginationConfig = {
  limit: 15,
  page: 1,
  sortOrder: SortOrder.desc,
  sortBy: 'createdAt',
};
