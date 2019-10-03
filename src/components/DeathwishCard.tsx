import { Badge, Box, Button, Heading, Stack, Text } from '@chakra-ui/core';
import { StackProps } from '@chakra-ui/core/dist/Stack';
import React from 'react';
import { ReactComponent as Holiday } from './illustrations/holiday.svg';
import { ReactComponent as Money } from './illustrations/money.svg';
import { ReactComponent as VideoMessage } from './illustrations/video-message.svg';
import { DeathwishType } from '../types';

export const illustrations: Record<
  DeathwishType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  money: Money,
  'video-message': VideoMessage,
  holiday: Holiday
};

export const DeathWishCard: React.FC<
  StackProps & {
    isPopular?: boolean;
    type: DeathwishType;
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
