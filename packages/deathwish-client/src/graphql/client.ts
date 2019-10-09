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
  // TODO: change this to the docker network name when we set up docker
  new HttpLink({ uri: 'http://localhost:4000' })
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
