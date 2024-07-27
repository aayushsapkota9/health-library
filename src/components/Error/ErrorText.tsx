import React from 'react';
import { Text } from '@mantine/core';
const ErrorText = ({ message }: { message: string }) => {
  return <Text className="text-red-600">{message}</Text>;
};

export default ErrorText;
