import { Badge, Box, Button, Heading, Stack, Text } from '@chakra-ui/core';
import { StackProps } from '@chakra-ui/core/dist/Stack';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { DeathwishType } from '../types/graphql';
import { DeathwishTemplate } from './DeathwishApp';
import { ReactComponent as Holiday } from './illustrations/holiday.svg';
import { ReactComponent as Money } from './illustrations/money.svg';
import { ReactComponent as Video } from './illustrations/video-message.svg';

export const illustrations: Record<
  DeathwishType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  [DeathwishType.Money]: Money,
  [DeathwishType.Video]: Video,
  [DeathwishType.Holiday]: Holiday
};

export const templates: Record<DeathwishType, DeathwishTemplate> = {
  [DeathwishType.Money]: {
    type: DeathwishType.Money,
    title: 'Pay off my debts',
    description:
      "Make sure nobody's left with the consequences of your wild lifestyle"
  },
  [DeathwishType.Holiday]: {
    type: DeathwishType.Holiday,
    title: 'Send somebody on holiday',
    description: 'Send them on that trip of a lifetime you never got round to'
  },
  [DeathwishType.Video]: {
    type: DeathwishType.Video,
    title: 'Create a video message',
    description: 'Give loved ones a personal keepsake'
  }
};

export const DeathwishCard: React.FC<
  {
    isPopular?: boolean;
    type: DeathwishType;
  } & StackProps
> = ({ isPopular = false, type, ...styleProps }) => {
  const template = templates[type];
  const containerShadow = isPopular ? 'lg' : 'md';

  return (
    <Stack boxShadow={containerShadow} backgroundColor="white" {...styleProps}>
      {isPopular ? (
        <Badge variant="solid" variantColor="blue" rounded="none" px={4} py={4}>
          Popular
        </Badge>
      ) : null}
      <Stack isInline={true} justify="center" align="center">
        <Box as={illustrations[type]} size={300} padding={4} />
      </Stack>
      <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
        <Heading size="md">{template.title}</Heading>
        <Text>{template.description}</Text>
      </Stack>
      <Button
        data-testid={`choose-deathwish-${type}`}
        as={ReactRouterLink}
        to={{
          pathname: `/create`,
          state: {
            type: type
          }
        }}
        leftIcon="add"
        variantColor="pink"
        rounded="none"
      >
        Choose this wish
      </Button>
    </Stack>
  );
};
