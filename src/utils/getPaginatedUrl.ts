export const getPaginationParams = (searchParams: URLSearchParams) => {
  const page = searchParams.get('page');
  const limit = searchParams.get('limit') || 10;
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const search = searchParams.get('search');
  const query: any = {};

  if (page) {
    query.page = page;
  }
  if (limit) {
    query.limit = limit;
  }
  if (sort) {
    query.sort = sort;
  }
  if (order) {
    query.order = order;
  }
  if (search) {
    query.search = search;
  }

  // Convert query object to a query string
  const queryString = new URLSearchParams(query).toString();

  return queryString;
};
