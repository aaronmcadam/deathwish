import gql from 'graphql-tag';

export const DEATHWISHES = gql`
  query Deathwishes {
    deathwishes {
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
    deathwish(id: $id) {
      id
      type
      title
      description
      cost
      recipients
    }
  }
`;
