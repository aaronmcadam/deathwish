import { gql } from 'apollo-server';

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

  type Query {
    deathwishes: [Deathwish!]!
    deathwish(id: ID!): Deathwish
  }

  input DeathwishAttributes {
    type: DeathwishType!
    title: String!
    description: String!
    cost: Int!
    recipients: String!
  }

  input CreateDeathwishInput {
    deathwish: DeathwishAttributes!
  }

  type CreateDeathwishPayload {
    # The deathwish that was created. It is nullable so that if there is
    # an error then null won’t propagate past the deathwish.
    deathwish: Deathwish
  }

  input UpdateDeathwishAttributes {
    id: ID!
    title: String
    description: String
    cost: Int
    recipients: String
  }

  input UpdateDeathwishInput {
    deathwish: UpdateDeathwishAttributes!
  }

  type UpdateDeathwishPayload {
    deathwish: Deathwish
  }

  input DeleteDeathwishAttributes {
    id: ID!
  }

  input DeleteDeathwishInput {
    deathwish: DeleteDeathwishAttributes!
  }

  type DeleteDeathwishPayload {
    deathwish: Deathwish
  }

  type Mutation {
    createDeathwish(input: CreateDeathwishInput!): CreateDeathwishPayload
    updateDeathwish(input: UpdateDeathwishInput!): UpdateDeathwishPayload
    deleteDeathwish(input: DeleteDeathwishInput!): DeleteDeathwishPayload
  }
`;
