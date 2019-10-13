import { Badge, Heading, Stack, Text } from '@chakra-ui/core';
import { StackProps } from '@chakra-ui/core/dist/Stack';
import React from 'react';
import { Deathwish, DeathwishType } from '../../../types/graphql';
import { ButtonLink } from '../ButtonLink';
import { Illustration } from './Illustration';

export interface DeathwishTemplate {
  type: DeathwishType;
  title: Deathwish['title'];
  description: Deathwish['description'];
}

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

export const TemplateCard: React.FC<
  {
    isPopular?: boolean;
    type: DeathwishType;
  } & StackProps
> = ({ isPopular = false, type, ...stackProps }) => {
  const template = templates[type];
  const containerShadow = isPopular ? 'lg' : 'md';

  return (
    <Stack boxShadow={containerShadow} backgroundColor="white" {...stackProps}>
      {isPopular ? (
        <Badge variant="solid" variantColor="blue" rounded="none" px={4} py={4}>
          Popular
        </Badge>
      ) : null}
      <Stack isInline={true} justify="center" align="center">
        <Illustration type={type} />
      </Stack>
      <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
        <Heading size="md">{template.title}</Heading>
        <Text>{template.description}</Text>
      </Stack>
      <ButtonLink
        data-testid={`choose-deathwish-${type}`}
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
        Choose this deathwish
      </ButtonLink>
    </Stack>
  );
};
