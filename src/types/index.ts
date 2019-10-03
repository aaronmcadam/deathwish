export type Maybe<T> = T | null;

export enum DeathwishType {
  Money = 'money',
  Video = 'video',
  Holiday = 'holiday'
}

export interface Deathwish {
  id: string;
  type: DeathwishType;
  title: string;
  description: string;
  cost: number;
  recipients: string;
}

export type DeathwishQuery = { __typename?: 'Query' } & {
  deathwish: Maybe<
    { __typename?: 'Deathwish' } & Pick<
      Deathwish,
      'type' | 'title' | 'description' | 'cost' | 'recipients'
    >
  >;
};

export type CreateDeathwishMutationVariables = {
  input: {
    deathwish: Omit<Deathwish, 'id'>;
  };
};

export type CreateDeathwishMutation = { __typename?: 'Mutation' } & {
  createDeathwish: Maybe<
    { __typename?: 'Deathwish' } & Pick<Deathwish, 'title'>
  >;
};
