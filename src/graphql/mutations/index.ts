import gql from 'graphql-tag';

export const CREATE_DEATHWISH = gql`
  mutation CreateDeathwish($input: CreateDeathwishInput!) {
    createDeathwish(input: $input) @client {
      deathwish {
        id
      }
    }
  }
`;
