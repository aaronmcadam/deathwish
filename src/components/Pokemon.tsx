import * as ApolloReactHooks from '@apollo/react-hooks';
import { Spinner, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';

const GET_POKEMON = gql`
  {
    pokemon(name: "Pikachu") {
      name
    }
  }
`;

export const Pokemon: React.FC = () => {
  const { data, loading } = ApolloReactHooks.useQuery(GET_POKEMON);

  if (loading) {
    return <Spinner size="md" />;
  }

  if (!data) {
    return null;
  }

  return <Text>{data.pokemon.name}</Text>;
};
