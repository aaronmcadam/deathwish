import { Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import { DeathWishCard as DeathwishCard } from './DeathwishCard';
import { CurrentWish } from './Deathwishes';
import { CreateDeathwishForm } from './CreateDeathwishForm';

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
          <DeathwishCard type="holiday" />
          <DeathwishCard type="money" isPopular={true} />
          <DeathwishCard type="video-message" />
        </Stack>
        <CurrentWish />
        <CreateDeathwishForm />
      </Stack>
    </Stack>
  );
};
