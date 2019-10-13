import { Stack } from '@chakra-ui/core';
import React from 'react';
import { DeathwishType } from '../../../types/graphql';
import { TemplateCard } from './TemplateCard';

export const TemplateList: React.FC = () => {
  return (
    <Stack
      isInline={true}
      spacing={4}
      marginTop={12}
      justify="center"
      align="center"
    >
      <TemplateCard type={DeathwishType.Holiday} />
      <TemplateCard type={DeathwishType.Money} isPopular={true} />
      <TemplateCard type={DeathwishType.Video} />
    </Stack>
  );
};
