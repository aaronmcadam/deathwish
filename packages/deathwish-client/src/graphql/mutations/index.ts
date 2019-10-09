import gql from 'graphql-tag';

export const CREATE_DEATHWISH = gql`
  mutation CreateDeathwish($input: CreateDeathwishInput!) {
    createDeathwish(input: $input) {
      deathwish {
        id
      }
    }
  }
`;

export const UPDATE_DEATHWISH = gql`
  mutation UpdateDeathwish($input: UpdateDeathwishInput!) {
    updateDeathwish(input: $input) {
      deathwish {
        id
      }
    }
  }
`;

export const DELETE_DEATHWISH = gql`
  mutation DeleteDeathwish($input: DeleteDeathwishInput!) {
    deleteDeathwish(input: $input) {
      deathwish {
        id
      }
    }
  }
`;
