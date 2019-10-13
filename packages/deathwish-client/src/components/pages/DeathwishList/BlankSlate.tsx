import * as React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text
} from '@chakra-ui/core';
import { ButtonLink } from '../../common/ButtonLink';

export const BlankSlate: React.FC = () => {
  return (
    <Alert
      status="info"
      variant="top-accent"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      py={4}
      mx={64}
      marginTop={16}
    >
      <AlertIcon size="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        You have no deathwishes
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Text>You haven't created any deathwishes yet!</Text>
        <ButtonLink to="/" marginTop={4}>
          Create one now!
        </ButtonLink>
      </AlertDescription>
    </Alert>
  );
};
