import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  // ApolloClient needs a link to a GraphQL endpoint
  // We're using Pokemon for now. Pika Pika!
  link: new HttpLink({ uri: 'https://graphql-pokemon.now.sh' }),
  resolvers: {
    Mutation: {
      createDeathwish: (_root, variables, { cache }) => {
        console.log('input', variables.input);
        const data = {
          deathwish: {
            ...variables.input,
            __typename: 'Wish'
          }
        };

        cache.writeData({
          data
        });

        return null;
      }
    }
  }
});
