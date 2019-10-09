/* eslint-disable */
import gql from 'graphql-tag';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Deathwish = {
  __typename?: 'Deathwish';
  id: Scalars['ID'];
  type: DeathwishType;
  title: Scalars['String'];
  description: Scalars['String'];
  cost: Scalars['Int'];
  recipients: Scalars['String'];
};

export enum DeathwishType {
  Holiday = 'holiday',
  Money = 'money',
  Video = 'video'
}
