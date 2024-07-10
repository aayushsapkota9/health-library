'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import EditButton from './TableButtons/EditButton';

interface NavigateToCreateProps {
  id: string;
}

const NavigateToEdit = ({ id }: NavigateToCreateProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  return (
    <Link href={`${pathname}/${id}/edit${page ? `?page=${page}` : ''}`}>
      <EditButton></EditButton>
    </Link>
  );
};

export default NavigateToEdit;
