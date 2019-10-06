import { Deathwish, DeathwishType } from '../types/graphql';
import { cacheUpdate } from './resolvers';

describe('data structure for easy and quick lookups', () => {
  const deathwishes = {
    cc329569: {
      id: 'cc329569',
      type: 'money',
      title: 'Pay off the mortgage',
      description: 'Reduce the financial burden on loved ones',
      cost: 50000,
      recipients: 'test@example.com,test2@example.com'
    },
    '8586ead7': {
      id: '8586ead7',
      type: 'holiday',
      title: 'A special holiday',
      description: 'A trip across the world to Tokyo',
      cost: 10000,
      recipients: 'test@example.com,test2@example.com'
    }
  };

  console.log(Object.values(deathwishes));
});

describe('cacheUpdate', () => {
  describe('when there are no existing deathwishes', () => {
    test('adds the deathwish to the deathwishes', () => {
      const mutationVariables = {
        input: {
          deathwish: {
            type: 'money',
            title: 'Pay off the mortgage',
            description: 'Reduce the financial burden on loved ones',
            cost: 50000,
            recipients: 'test@example.com,test2@example.com'
          }
        }
      };
      const existingDeathwishes: Deathwish[] = [];

      const result = cacheUpdate(mutationVariables, existingDeathwishes);

      expect(result).toEqual({
        deathwishes: [
          {
            id: expect.any(String),
            type: 'money',
            title: 'Pay off the mortgage',
            description: 'Reduce the financial burden on loved ones',
            cost: 50000,
            recipients: 'test@example.com,test2@example.com',
            __typename: 'Deathwish'
          }
        ]
      });
    });
  });

  describe('when there are existing deathwishes', () => {
    test('adds the deathwish to the deathwishes', () => {
      const mutationVariables = {
        input: {
          deathwish: {
            type: 'money',
            title: 'Pay off the mortgage',
            description: 'Reduce the financial burden on loved ones',
            cost: 50000,
            recipients: 'test@example.com,test2@example.com'
          }
        }
      };
      const existingDeathwishes: Deathwish[] = [
        {
          id: '8586ead7',
          type: DeathwishType.Holiday,
          title: 'A special holiday',
          description: 'A trip across the world to Tokyo',
          cost: 10000,
          recipients: 'test@example.com,test2@example.com',
          __typename: 'Deathwish'
        }
      ];

      const result = cacheUpdate(mutationVariables, existingDeathwishes);

      expect(result).toEqual({
        deathwishes: [
          {
            id: '8586ead7',
            type: DeathwishType.Holiday,
            title: 'A special holiday',
            description: 'A trip across the world to Tokyo',
            cost: 10000,
            recipients: 'test@example.com,test2@example.com',
            __typename: 'Deathwish'
          },
          {
            id: expect.any(String),
            type: 'money',
            title: 'Pay off the mortgage',
            description: 'Reduce the financial burden on loved ones',
            cost: 50000,
            recipients: 'test@example.com,test2@example.com',
            __typename: 'Deathwish'
          }
        ]
      });
    });
  });
});
