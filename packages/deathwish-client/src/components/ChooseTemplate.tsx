import { Stack } from '@chakra-ui/core';
import React from 'react';
import { DeathwishType } from '../types/graphql';
import { DeathwishCard } from './DeathwishCard';
import { DeathwishTemplate } from './DeathwishApp';

interface Props {
  setTemplate: React.Dispatch<React.SetStateAction<DeathwishTemplate | null>>;
}

export function ChooseTemplate({ setTemplate }: Props) {
  return (
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
  );
}
