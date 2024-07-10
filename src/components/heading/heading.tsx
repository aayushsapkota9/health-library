import { Title } from '@mantine/core';
import React from 'react';

interface HeadingProps {
  name: string;
}

const Heading: React.FC<HeadingProps> = ({ name }) => {
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return (
    <div>
      <Title order={1}>{formattedName}</Title>
    </div>
  );
};

export default Heading;
