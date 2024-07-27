'use client';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { HttpService } from '@/src/services';
import { TextInput, Title } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import SearchCard from '../../Cards/SearchCard';

const Search = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useDebouncedState('', 200);

  const getTableData = async (query: string) => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(
        apiRoutes.diseases.search(
          `page=${1}&limit=${paginationConfig.limit}&sortBy=${paginationConfig.sortBy}&sortOrder=${paginationConfig.sortOrder}&query=${query}`
        ),
        {
          next: {
            cache: 'no-store',
          },
        }
      );

    setData(response.data);
  };
  useEffect(() => {
    getTableData(value);
  }, [value]);

  return (
    <div>
      {' '}
      <TextInput
        size="lg"
        radius={'md'}
        placeholder="Search diseases,symptoms,etc."
        rightSection={<IconSearch size={14} />}
        required
        withAsterisk
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <div className="mt-6">
        <div className="text-center">
          <Title order={1}>
            <span className="text-textSecondary">{data.length}</span> Results
          </Title>
        </div>
        <div className="mt-2">
          {data.length >= 1 ? (
            <>
              {data.map((disease: any) => (
                <div key={disease.id}>
                  <SearchCard
                    id={disease.id}
                    slug={disease.slug}
                    name={disease.name}
                    html={disease.html}
                  ></SearchCard>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="text-lg text-center pt-2">
                We didn&apos;t find any results for the search &quot;{value}
                &quot.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
