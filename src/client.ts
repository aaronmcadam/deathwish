import { ApolloLink } from 'apollo-link';
import { ApolloClient, Resolvers } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import gql from 'graphql-tag';
import uuidv4 from 'uuid/v4';

/**
 * TODO: Look at imporitng the schema.gql file to avoid duplication.
 * May not be worth it though
 */
const typeDefs = gql`
  enum DeathwishType {
    holiday
    money
    video
  }

  type Deathwish {
    id: ID!
    type: DeathwishType!
    title: String!
    description: String!
    cost: Int!
    recipients: String!
  }

  extend type Query {
    deathwish: Deathwish
  }

  input DeathWishAttributes {
    type: DeathwishType!
    title: String!
    description: String!
    cost: Int!
    recipients: String!
  }

  input CreateDeathwishInput {
    deathwish: DeathWishAttributes!
  }

  type CreateDeathwishPayload {
    # The deathwish that was created. It is nullable so that if there is
    # an error then null won’t propagate past the deathwish.
    deathwish: Deathwish
  }

  extend type Mutation {
    createDeathwish(input: CreateDeathwishInput!): CreateDeathwishPayload
  }
`;

const resolvers: Resolvers = {
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([
  errorLink,
  // ApolloClient needs a link to a GraphQL endpoint
  // We're using Pokemon for now. Pika Pika!
  // This also helps us verify that Apollo is configured for remote queries
  new HttpLink({ uri: 'https://graphql-pokemon.now.sh' })
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  typeDefs,
  resolvers
});
