import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) @client {
      user {
        id
        email
      }
    }
  }
`;

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
