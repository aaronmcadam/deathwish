import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

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
  new HttpLink({ uri: 'http://localhost:4000' })
]);

function persistedUser(): any {
  const serialized = window.localStorage.getItem('__deathwish-user__');

  if (!serialized) {
    return null;
  }

  const user: any = JSON.parse(serialized);

  return user;
}

export function deleteUser(): any {
  window.localStorage.removeItem('__deathwish-user__');
}

const cache = new InMemoryCache();
cache.writeData({
  data: {
    me: persistedUser()
  }
});

export const client = new ApolloClient({
  cache,
  link,
  resolvers,
  typeDefs
});
