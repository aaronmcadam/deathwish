import short from 'short-uuid';
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
    id: short.generate(),
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

/**
 * This is causing shared state and breaking the E2E tests, which expect a
 * blank slate before they create their own data.
 *
 * In theory, this problem would still occur when we move to a database
 * implementation.
 *
 * To mitigate this, we ask the user to enter their email address. This acts as
 * a very basic password-less authentication.
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
    deathwishes: (_parent, args, _context) => {
      return inMemoryDeathwishes.filter(
        dw => dw.owner.email === args.ownerEmail
      );
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
