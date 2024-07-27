'use client';
import apiRoutes from '@/src/config/api.config';
import { paginationConfig } from '@/src/config/pagination.config';
import { HttpService } from '@/src/services';
import React, { useState } from 'react';
import SearchCard from '../../Cards/SearchCard';
import { Title } from '@mantine/core';

const Browse = () => {
  const alphabets = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const [data, setData] = useState([]);
  const [selectedAlphabet, setSelectedAlphabet] = useState<string | null>(null);

  const getTableData = async (query: string) => {
    const http = new HttpService();

    const response: any = await http
      .service()
      .get(
        apiRoutes.diseases.searchByAlphabet(
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

  const handleAlphabetClick = (alphabet: string) => {
    setSelectedAlphabet(alphabet);
    getTableData(alphabet);
  };

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        {alphabets.map((item) => (
          <div
            key={item}
            className={`w-20 px-10 py-5 text-3xl hover:cursor-pointer ${
              selectedAlphabet === item
                ? 'bg-blue-400 text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => handleAlphabetClick(item)}
          >
            <span className="text-center relative right-2">
              {item.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Title order={1}>
          <span className="text-textSecondary">{data.length}</span> Results
        </Title>
      </div>
      <div className="mt-2">
        {data.length >= 1 ? (
          data.map((disease: any) => (
            <SearchCard
              key={disease.id}
              id={disease.id}
              slug={disease.slug}
              name={disease.name}
              html={disease.html}
            />
          ))
        ) : (
          <p className="text-lg text-center pt-2">
            We didn&apos;t find any results for the search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Browse;
