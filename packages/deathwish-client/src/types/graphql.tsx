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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateDeathwishInput = {
  deathwish: DeathwishAttributes,
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

export type DeathwishAttributes = {
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

export type DeleteDeathwishAttributes = {
  id: Scalars['ID'],
};

export type DeleteDeathwishInput = {
  deathwish: DeleteDeathwishAttributes,
};

export type DeleteDeathwishPayload = {
   __typename?: 'DeleteDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createDeathwish?: Maybe<CreateDeathwishPayload>,
  updateDeathwish?: Maybe<UpdateDeathwishPayload>,
  deleteDeathwish?: Maybe<DeleteDeathwishPayload>,
};


export type MutationCreateDeathwishArgs = {
  input: CreateDeathwishInput
};


export type MutationUpdateDeathwishArgs = {
  input: UpdateDeathwishInput
};


export type MutationDeleteDeathwishArgs = {
  input: DeleteDeathwishInput
};

export type Query = {
   __typename?: 'Query',
  deathwishes: Array<Deathwish>,
  deathwish?: Maybe<Deathwish>,
};


export type QueryDeathwishArgs = {
  id: Scalars['ID']
};

export type UpdateDeathwishAttributes = {
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Int']>,
  recipients?: Maybe<Scalars['String']>,
};

export type UpdateDeathwishInput = {
  deathwish: UpdateDeathwishAttributes,
};

export type UpdateDeathwishPayload = {
   __typename?: 'UpdateDeathwishPayload',
  deathwish?: Maybe<Deathwish>,
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

export type UpdateDeathwishMutationVariables = {
  input: UpdateDeathwishInput
};


export type UpdateDeathwishMutation = (
  { __typename?: 'Mutation' }
  & { updateDeathwish: Maybe<(
    { __typename?: 'UpdateDeathwishPayload' }
    & { deathwish: Maybe<(
      { __typename?: 'Deathwish' }
      & Pick<Deathwish, 'id'>
    )> }
  )> }
);

export type DeleteDeathwishMutationVariables = {
  input: DeleteDeathwishInput
};


export type DeleteDeathwishMutation = (
  { __typename?: 'Mutation' }
  & { deleteDeathwish: Maybe<(
    { __typename?: 'DeleteDeathwishPayload' }
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
  createDeathwish(input: $input) {
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
export const UpdateDeathwishDocument = gql`
    mutation UpdateDeathwish($input: UpdateDeathwishInput!) {
  updateDeathwish(input: $input) {
    deathwish {
      id
    }
  }
}
    `;
export type UpdateDeathwishMutationFn = ApolloReactCommon.MutationFunction<UpdateDeathwishMutation, UpdateDeathwishMutationVariables>;

/**
 * __useUpdateDeathwishMutation__
 *
 * To run a mutation, you first call `useUpdateDeathwishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeathwishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeathwishMutation, { data, loading, error }] = useUpdateDeathwishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeathwishMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDeathwishMutation, UpdateDeathwishMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateDeathwishMutation, UpdateDeathwishMutationVariables>(UpdateDeathwishDocument, baseOptions);
      }
export type UpdateDeathwishMutationHookResult = ReturnType<typeof useUpdateDeathwishMutation>;
export type UpdateDeathwishMutationResult = ApolloReactCommon.MutationResult<UpdateDeathwishMutation>;
export type UpdateDeathwishMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDeathwishMutation, UpdateDeathwishMutationVariables>;
export const DeleteDeathwishDocument = gql`
    mutation DeleteDeathwish($input: DeleteDeathwishInput!) {
  deleteDeathwish(input: $input) {
    deathwish {
      id
    }
  }
}
    `;
export type DeleteDeathwishMutationFn = ApolloReactCommon.MutationFunction<DeleteDeathwishMutation, DeleteDeathwishMutationVariables>;

/**
 * __useDeleteDeathwishMutation__
 *
 * To run a mutation, you first call `useDeleteDeathwishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeathwishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeathwishMutation, { data, loading, error }] = useDeleteDeathwishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDeathwishMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDeathwishMutation, DeleteDeathwishMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteDeathwishMutation, DeleteDeathwishMutationVariables>(DeleteDeathwishDocument, baseOptions);
      }
export type DeleteDeathwishMutationHookResult = ReturnType<typeof useDeleteDeathwishMutation>;
export type DeleteDeathwishMutationResult = ApolloReactCommon.MutationResult<DeleteDeathwishMutation>;
export type DeleteDeathwishMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDeathwishMutation, DeleteDeathwishMutationVariables>;
export const DeathwishesDocument = gql`
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