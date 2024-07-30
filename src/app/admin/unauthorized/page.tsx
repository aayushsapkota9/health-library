import { Button } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: '404 - Not found',
  description: `The page you are looking for doesn't exists.`,
};
export default function NotFound() {
  return (
    <div>
      <div className="bg-primary px-2 text-center text-textPrimary">
        <div className="h-screen flex flex-col mt-20 items-center">
          <h1 className="text-8xl font-extrabold ">401</h1>
          <p className="text-4xl font-medium ">Unauthorized</p>
          <p className="text-xl  mt-4">
            You are not authorized to view this page.{' '}
          </p>
          <Link href="/admin/dashboard">
            {' '}
            <Button className="mt-5">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
