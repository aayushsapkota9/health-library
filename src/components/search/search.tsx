'use client';
import { HttpService } from '@/src/services';
import { addIndicesToElements } from '@/src/utils/addIndicesToElements';
import { Input } from '@mantine/core';
import { debounce } from 'lodash';

const Search = ({
  setElements,
  route,
}: {
  setElements: any;
  route: string;
}) => {
  const debouncedSearch = debounce(async (value) => {
    const http = new HttpService();
    const response: any = await http.service().get(`${route}?search=${value}`);
    setElements(addIndicesToElements(response.data.result));
  }, 500);

  const handleChange = (e: any) => {
    const { value } = e.target;
    debouncedSearch(value); // Call the debounced function
  };

  return (
    <Input
      placeholder="Input component"
      onChange={handleChange}
      size="md"
      className="absolute right-20"
    />
  );
};

export default Search;
