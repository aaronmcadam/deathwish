import uuidv4 from 'uuid/v4';
import {
  Deathwish,
  MutationUpdateDeathwishArgs,
  MutationDeleteDeathwishArgs,
  Resolvers
} from '../types/graphql';
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
  mutationVariables: MutationUpdateDeathwishArgs,
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

export function deleteDeathwish(
  mutationVariables: MutationDeleteDeathwishArgs,
  existingDeathwishes: Deathwish[]
) {
  const { id } = mutationVariables.input.deathwish;
  const nextState = existingDeathwishes.filter(dw => dw.id !== id);

  const cacheUpdate = { deathwishes: nextState };

  return cacheUpdate;
}

export function findDeathwish(deathwishes: Deathwish[], id: Deathwish['id']) {
  return deathwishes.find(dw => dw.id === id);
}

function existingDeathwishes(): Deathwish[] {
  return inMemoryDeathwishes;
}

/**
 * This is causing shared state and breaking the E2E tests, which expect a
 * blank slate before they create their own data.
 *
 * In theory, this problem would still occur when we move to a database
 * implementation.
 *
 * Options:
 * 1. Add a mutation to clear the deathwishes. We would have to trigger
 * that from the E2E tests.
 * 2. Pass along some identifier in the mutations to namespace the data.
 * Could we generate this identifier on app start and save to local storage?
 * Do the E2E tests start brand new browser sessions? If they don't, the tests
 * may still end up with existing data.
 * We discussed asking for the user's name before, maybe that will work.
 * We would need to force the user to fill out their name though before seeing
 * anything, effectively acting like a sign in process.
 */
let inMemoryDeathwishes: Deathwish[] = [];

export const resolvers: Resolvers = {
  Query: {
    deathwish: (_parent, args, _context) => {
      const deathwish = findDeathwish(inMemoryDeathwishes, args.id);

      if (!deathwish) {
        return null;
      }

      return deathwish;
    },
    deathwishes: (_parent, _args, _context) => {
      return inMemoryDeathwishes;
    }
  },
  Mutation: {
    createDeathwish: (_parent, args, _context) => {
      const data = addNewDeathwish(args, inMemoryDeathwishes);
      inMemoryDeathwishes = data.deathwishes;

      return null;
    },
    updateDeathwish: (_parent, args, _context) => {
      const data = updateDeathwish(args, inMemoryDeathwishes);
      inMemoryDeathwishes = data.deathwishes;

      return null;
    },
    deleteDeathwish: (_parent, args, _context) => {
      const data = deleteDeathwish(args, inMemoryDeathwishes);
      inMemoryDeathwishes = data.deathwishes;

      return null;
    }
  }
};
