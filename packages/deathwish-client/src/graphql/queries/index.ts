import gql from 'graphql-tag';

export const DEATHWISHES = gql`
  query Deathwishes {
    deathwishes @client {
      id
      type
      title
      description
      cost
      recipients
    }
  }
`;

export const DEATHWISH = gql`
  query Deathwish($id: ID!) {
    deathwish(id: $id) @client {
      id
      type
      title
      description
      cost
      recipients
    }
  }
`;
