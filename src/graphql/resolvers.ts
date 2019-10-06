import { Resolvers } from 'apollo-client';
import uuidv4 from 'uuid/v4';
import { Deathwish } from '../types/graphql';
import { DEATHWISHES } from './queries';

export function cacheUpdate(
  mutationVariables: any,
  existingDeathwishes: Deathwish[]
) {
  const deathwish = {
    id: uuidv4(),
    ...mutationVariables.input.deathwish,
    __typename: 'Deathwish'
  };
  const update = { deathwishes: [...existingDeathwishes, deathwish] };

  return update;
}

export const resolvers: Resolvers = {
  Mutation: {
    createDeathwish: (_root, variables, { cache, getCacheKey }) => {
      const { deathwishes } = cache.readQuery({ query: DEATHWISHES });
      const data = cacheUpdate(variables, deathwishes);

      cache.writeData({ data });

      return null;
    }
  }
};
