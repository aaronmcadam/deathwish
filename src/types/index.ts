export type Maybe<T> = T | null;

export type DeathwishType = 'money' | 'video-message' | 'holiday';

export interface Deathwish {
  type: DeathwishType;
  name: string;
  description: string;
  cost: number;
  recipients: string;
}

export type DeathwishQuery = { __typename?: 'Query' } & {
  deathwish: Maybe<{ __typename?: 'Deathwish' }> &
    Pick<Deathwish, 'type' | 'name' | 'description' | 'cost' | 'recipients'>;
};
