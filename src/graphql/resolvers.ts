import { Resolvers } from 'apollo-client';
import uuidv4 from 'uuid/v4';
import { Deathwish, UpdateDeathwishMutationVariables } from '../types/graphql';
import { DEATHWISHES } from './queries';
import { persistDeathwishes } from './client';
import produce from 'immer';

export function addNewDeathwish(
  mutationVariables: any,
  existingDeathwishes: Deathwish[]
) {
  const deathwish = {
    id: uuidv4(),
    ...mutationVariables.input.deathwish,
    __typename: 'Deathwish'
  };
  const nextState = produce(existingDeathwishes, draftState => {
    draftState.push(deathwish);
  });

  const cacheUpdate = { deathwishes: nextState };

  return cacheUpdate;
}

export function updateDeathwish(
  mutationVariables: UpdateDeathwishMutationVariables,
  existingDeathwishes: Deathwish[]
) {
  const {
    id,
    title,
    description,
    cost,
    recipients
  } = mutationVariables.input.deathwish;
  const index = existingDeathwishes.findIndex(dw => dw.id === id);
  const nextState = produce(existingDeathwishes, draftState => {
    if (title) {
      draftState[index].title = title;
    }

    if (description) {
      draftState[index].description = description;
    }

    if (cost) {
      draftState[index].cost = cost;
    }

    if (recipients) {
      draftState[index].recipients = recipients;
    }
  });
  const cacheUpdate = { deathwishes: nextState };

  return cacheUpdate;
}

export function findDeathwish(deathwishes: Deathwish[], id: Deathwish['id']) {
  return deathwishes.find(dw => dw.id === id);
}

function existingDeathwishes(cache: any): Deathwish[] {
  const { deathwishes }: { deathwishes: Deathwish[] } = cache.readQuery({
    query: DEATHWISHES
  });

  return deathwishes;
}

function save(
  cache: any,
  data: {
    deathwishes: Deathwish[];
  }
): void {
  cache.writeData({ data });
  persistDeathwishes(data.deathwishes);
}

/** TODO: For quicker lookups, we could use an object keyed by the deathwish ID.
 * I've tried to implement that but came across some issues resolving the data.
 * I can try again later.
 */

export const resolvers: Resolvers = {
  Query: {
    deathwish: (_parent, args, { cache }) => {
      const deathwishes = existingDeathwishes(cache);

      return findDeathwish(deathwishes, args.id);
    }
  },
  Mutation: {
    createDeathwish: (_parent, args, { cache }) => {
      const deathwishes = existingDeathwishes(cache);

      const data = addNewDeathwish(args, deathwishes);
      save(cache, data);

      return null;
    },
    updateDeathwish: (_parent, args, { cache }) => {
      const deathwishes = existingDeathwishes(cache);

      const data = updateDeathwish(args, deathwishes);
      save(cache, data);

      return null;
    }
  }
};
