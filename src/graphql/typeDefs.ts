import gql from 'graphql-tag';

/**
 * TODO: The schema.gql file is for graphql-codegen because we don't have a
 * local GraphQL server yet.
 * We might want to import that file later to avoid duplication, but it may
 * not be worth it.
 */
export const typeDefs = gql`
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
    deathwishes: [Deathwish!]!
    deathwish(id: ID!): Deathwish
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
