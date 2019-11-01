import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    me @client {
      id
      email
    }
  }
`;

export const DEATHWISHES = gql`
  query Deathwishes($ownerEmail: String!) {
    deathwishes(ownerEmail: $ownerEmail) {
      id
      type
      title
      description
      cost
      recipients
      owner {
        id
        email
      }
    }
  }
`;

export const DEATHWISH = gql`
  query Deathwish($id: ID!) {
    deathwish(id: $id) {
      id
      type
      title
      description
      cost
      recipients
      owner {
        id
        email
      }
    }
  }
`;
