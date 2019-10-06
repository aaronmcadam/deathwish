import { Resolvers } from 'apollo-client';
import uuidv4 from 'uuid/v4';

export const resolvers: Resolvers = {
  Mutation: {
    createDeathwish: (_root, variables, { cache }) => {
      console.log('variables', variables);
      const data = {
        deathwish: {
          id: uuidv4(),
          ...variables.input.deathwish,
          __typename: 'Deathwish'
        }
      };

      cache.writeData({
        data
      });

      return null;
    }
  }
};
