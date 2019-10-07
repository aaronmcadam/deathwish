import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { Deathwish } from '../types/graphql';

export function persistDeathwishes(deathwishes: Deathwish[]): void {
  const serialized = JSON.stringify(deathwishes);

  window.localStorage.setItem('__deathwishes__', serialized);
}

function persistedDeathwishes(): Deathwish[] {
  const serialized = window.localStorage.getItem('__deathwishes__');

  if (!serialized) {
    return [];
  }

  const deathwishes: Deathwish[] = JSON.parse(serialized);

  return deathwishes;
}

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

const cache = new InMemoryCache();
cache.writeData({
  data: {
    deathwishes: persistedDeathwishes()
  }
});

export const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});
