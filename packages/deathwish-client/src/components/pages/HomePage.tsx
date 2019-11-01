import { Heading } from '@chakra-ui/core';
import React from 'react';
import { TemplateList } from '../common/TemplateList';

export const HomePage: React.FC = () => {
  return (
    <>
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={2}
        textAlign="center"
      >
        What do you want to happen when you die?
      </Heading>
      <TemplateList />
    </>
  );
};
