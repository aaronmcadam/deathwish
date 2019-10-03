import { Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import { DeathwishType } from '../types/graphql';
import { CreateDeathwishForm } from './CreateDeathwishForm';
import { DeathwishCard } from './DeathwishCard';
import { CurrentDeathwish } from './Deathwishes';

export const DeathwishApp: React.FC = () => {
  return (
    <Stack
      data-testid="app-pane"
      align="center"
      backgroundColor="blue.50"
      height="100vh"
    >
      <Stack py={4} width="containers.screen-lg">
        <Heading as="h1" fontWeight="semibold">
          DeathWishes
        </Heading>
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
        <Stack
          isInline={true}
          spacing={4}
          marginTop={12}
          justify="center"
          align="center"
        >
          <DeathwishCard type={DeathwishType.Holiday} />
          <DeathwishCard type={DeathwishType.Money} isPopular={true} />
          <DeathwishCard type={DeathwishType.Video} />
        </Stack>
        <CurrentDeathwish />
        <CreateDeathwishForm />
      </Stack>
    </Stack>
  );
};
