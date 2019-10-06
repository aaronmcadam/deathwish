/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreateDeathwishInput = {
  deathwish: DeathWishAttributes,
};

export type CreateDeathwishPayload = {
   __typename?: 'CreateDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
};

export type Deathwish = {
   __typename?: 'Deathwish',
  id: Scalars['ID'],
  type: DeathwishType,
  title: Scalars['String'],
  description: Scalars['String'],
  cost: Scalars['Int'],
  recipients: Scalars['String'],
};

export type DeathWishAttributes = {
  type: DeathwishType,
  title: Scalars['String'],
  description: Scalars['String'],
  cost: Scalars['Int'],
  recipients: Scalars['String'],
};

export enum DeathwishType {
  Holiday = 'holiday',
  Money = 'money',
  Video = 'video'
}

export type Mutation = {
   __typename?: 'Mutation',
  createDeathwish?: Maybe<CreateDeathwishPayload>,
};


export type MutationCreateDeathwishArgs = {
  input: CreateDeathwishInput
};

export type Query = {
   __typename?: 'Query',
  deathwishes: Array<Deathwish>,
  deathwish?: Maybe<Deathwish>,
};


export type QueryDeathwishArgs = {
  id: Scalars['ID']
};

export type CreateDeathwishMutationVariables = {
  input: CreateDeathwishInput
};


export type CreateDeathwishMutation = (
  { __typename?: 'Mutation' }
  & { createDeathwish: Maybe<(
    { __typename?: 'CreateDeathwishPayload' }
    & { deathwish: Maybe<(
      { __typename?: 'Deathwish' }
      & Pick<Deathwish, 'id'>
    )> }
  )> }
);

export type DeathwishesQueryVariables = {};


export type DeathwishesQuery = (
  { __typename?: 'Query' }
  & { deathwishes: Array<(
    { __typename?: 'Deathwish' }
    & Pick<Deathwish, 'id' | 'type' | 'title' | 'description' | 'cost' | 'recipients'>
  )> }
);

export type DeathwishQueryVariables = {
  id: Scalars['ID']
};


export type DeathwishQuery = (
  { __typename?: 'Query' }
  & { deathwish: Maybe<(
    { __typename?: 'Deathwish' }
    & Pick<Deathwish, 'id' | 'type' | 'title' | 'description' | 'cost' | 'recipients'>
  )> }
);


export const CreateDeathwishDocument = gql`
    mutation CreateDeathwish($input: CreateDeathwishInput!) {
  createDeathwish(input: $input) @client {
    deathwish {
      id
    }
  }
}
    `;
export type CreateDeathwishMutationFn = ApolloReactCommon.MutationFunction<CreateDeathwishMutation, CreateDeathwishMutationVariables>;

/**
 * __useCreateDeathwishMutation__
 *
 * To run a mutation, you first call `useCreateDeathwishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeathwishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeathwishMutation, { data, loading, error }] = useCreateDeathwishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeathwishMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDeathwishMutation, CreateDeathwishMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateDeathwishMutation, CreateDeathwishMutationVariables>(CreateDeathwishDocument, baseOptions);
      }
export type CreateDeathwishMutationHookResult = ReturnType<typeof useCreateDeathwishMutation>;
export type CreateDeathwishMutationResult = ApolloReactCommon.MutationResult<CreateDeathwishMutation>;
export type CreateDeathwishMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDeathwishMutation, CreateDeathwishMutationVariables>;
export const DeathwishesDocument = gql`
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

/**
 * __useDeathwishesQuery__
 *
 * To run a query within a React component, call `useDeathwishesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeathwishesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeathwishesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeathwishesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DeathwishesQuery, DeathwishesQueryVariables>) {
        return ApolloReactHooks.useQuery<DeathwishesQuery, DeathwishesQueryVariables>(DeathwishesDocument, baseOptions);
      }
export function useDeathwishesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DeathwishesQuery, DeathwishesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DeathwishesQuery, DeathwishesQueryVariables>(DeathwishesDocument, baseOptions);
        }
export type DeathwishesQueryHookResult = ReturnType<typeof useDeathwishesQuery>;
export type DeathwishesLazyQueryHookResult = ReturnType<typeof useDeathwishesLazyQuery>;
export type DeathwishesQueryResult = ApolloReactCommon.QueryResult<DeathwishesQuery, DeathwishesQueryVariables>;
export const DeathwishDocument = gql`
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

/**
 * __useDeathwishQuery__
 *
 * To run a query within a React component, call `useDeathwishQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeathwishQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeathwishQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeathwishQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DeathwishQuery, DeathwishQueryVariables>) {
        return ApolloReactHooks.useQuery<DeathwishQuery, DeathwishQueryVariables>(DeathwishDocument, baseOptions);
      }
export function useDeathwishLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DeathwishQuery, DeathwishQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DeathwishQuery, DeathwishQueryVariables>(DeathwishDocument, baseOptions);
        }
export type DeathwishQueryHookResult = ReturnType<typeof useDeathwishQuery>;
export type DeathwishLazyQueryHookResult = ReturnType<typeof useDeathwishLazyQuery>;
export type DeathwishQueryResult = ApolloReactCommon.QueryResult<DeathwishQuery, DeathwishQueryVariables>;