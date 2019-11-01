import short from 'short-uuid';

export function persistUser(user: any): void {
  const serialized = JSON.stringify(user);

  window.localStorage.setItem('__deathwish-user__', serialized);
}

export function save(
  cache: any,
  data: {
    me: any;
  }
): void {
  cache.writeData({ data });
  persistUser(data.me);
}

export const resolvers = {
  Mutation: {
    signIn: (_parent: any, args: any, { cache }: any) => {
      const data = {
        me: {
          id: short.generate(),
          email: args.input.user.email,
          __typename: 'User'
        }
      };
      save(cache, data);
      return null;
    }
  }
};
