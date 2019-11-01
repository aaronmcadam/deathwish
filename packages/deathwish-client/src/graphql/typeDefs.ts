import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  input SignInAttributes {
    email: String!
  }

  input SignInInput {
    user: SignInAttributes!
  }

  type SignInPayload {
    user: User
  }

  extend type Mutation {
    signIn(input: SignInInput!): SignInPayload
  }
`;
