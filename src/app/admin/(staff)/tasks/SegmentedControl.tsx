'use client';
import { TaskStatus } from '@/src/types/enums/status.enums';
import { SegmentedControl } from '@mantine/core';
import React, { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CustomSegmentedControl = () => {
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

  const handleChange = (value: string) => {
    router.push(pathname + '?' + createQueryString('status', value));
  };

  return (
    <div>
      <SegmentedControl
        color="blue"
        data={Object.keys(TaskStatus).map((key) => ({
          label: key,
          value: TaskStatus[key as keyof typeof TaskStatus],
        }))}
        onChange={handleChange}
        value={searchParams.get('status') || TaskStatus.PENDING}
      />
    </div>
  );
};

export default CustomSegmentedControl;
