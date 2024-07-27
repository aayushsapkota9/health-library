import { Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
interface ISearchCardProps {
  id: string;
  slug: string;
  name: string;
  html: string;
}
const SearchCard = ({ id, slug, name, html }: ISearchCardProps) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(html, 'text/html');

  //@ts-ignore
  const divContent = doc
    ?.querySelector('#first-section-description')
    ?.innerHTML?.trim();

  return (
    <Link href={`/diseases/${slug}`}>
      <div className="border border-gray-300 p-4 rounded-lg">
        <div className="text-lg text-center" key={id}>
          <Title order={3}>{name}</Title>

          <p
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: `<div>${divContent}</div>` }}
          ></p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
