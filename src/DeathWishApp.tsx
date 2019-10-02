import { Button, Heading, Stack, Box, Text, Badge } from '@chakra-ui/core';
import React from 'react';
import { ReactComponent as Money } from './illustrations/money.svg';
import { ReactComponent as VideoMessage } from './illustrations/video-message.svg';
import { ReactComponent as Holiday } from './illustrations/holiday.svg';
import { StackProps } from '@chakra-ui/core/dist/Stack';

type DeathWishType = 'money' | 'videoMessage' | 'holiday';

const illustrations: Record<
  DeathWishType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  money: Money,
  videoMessage: VideoMessage,
  holiday: Holiday
};

const DeathWishCard: React.FC<
  StackProps & {
    isPopular?: boolean;
    type: DeathWishType;
  }
> = ({ isPopular = false, type, ...styleProps }) => {
  const containerShadow = isPopular ? 'lg' : 'md';

  return (
    <Stack boxShadow={containerShadow} backgroundColor="white" {...styleProps}>
      {isPopular ? (
        <Badge variant="solid" variantColor="blue" rounded="none" px={4} py={4}>
          Popular
        </Badge>
      ) : null}
      <Stack isInline={true} justify="center">
        <Box as={illustrations[type]} size={300} padding={4} />
      </Stack>
      <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
        <Heading size="md">Pay off my debts</Heading>
        <Text>
          Make sure nobody's left with the consequences of your wild lifestyle
        </Text>
      </Stack>
      <Button leftIcon="add" variantColor="pink" rounded="none">
        Choose this wish
      </Button>
    </Stack>
  );
};

export const DeathWishApp: React.FC = () => {
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
          <DeathWishCard type="holiday" />
          <DeathWishCard type="money" isPopular={true} />
          <DeathWishCard type="videoMessage" />
        </Stack>
      </Stack>
    </Stack>
  );
};
