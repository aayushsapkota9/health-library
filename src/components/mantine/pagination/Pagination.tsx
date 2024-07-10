'use client';
import { COLOR } from '@/src/types/enums/colors.enums';
import { Pagination } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const CustomPagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <Pagination
      color={COLOR.primary}
      onChange={(e) => {
        router.push(pathname + '?' + createQueryString('page', e.toString()));
      }}
      total={totalPages}
      value={parseInt(searchParams.get('page') || '1')}
    />
  );
};

export default CustomPagination;
