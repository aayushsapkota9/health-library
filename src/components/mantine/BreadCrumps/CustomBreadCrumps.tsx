import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
interface Items {
  title: string;
  href: string;
}
interface BreadcrumbsProps {
  items: Items[];
}

export function CustomBreadCrumps({ items }: BreadcrumbsProps) {
  const crumps = items.map((item, index) => (
    <Link href={item.href} key={index} className="text-secondary">
      {item.title}
    </Link>
  ));
  return (
    <>
      <div>
        <Breadcrumbs separator="->">{crumps}</Breadcrumbs>
      </div>{' '}
    </>
  );
}
