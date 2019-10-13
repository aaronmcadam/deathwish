import { Box, BoxProps } from '@chakra-ui/core';
import React from 'react';
import { ReactComponent as Holiday } from '../../../illustrations/holiday.svg';
import { ReactComponent as Money } from '../../../illustrations/money.svg';
import { ReactComponent as Video } from '../../../illustrations/video.svg';
import { DeathwishType } from '../../../types/graphql';

export const Illustration: React.FC<
  {
    type: DeathwishType;
  } & BoxProps
> = ({ type, ...boxProps }) => {
  const components = {
    [DeathwishType.Money]: Money,
    [DeathwishType.Video]: Video,
    [DeathwishType.Holiday]: Holiday
  };

  return <Box as={components[type]} size={300} padding={4} {...boxProps} />;
};
