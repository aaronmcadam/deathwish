import { deathwish } from '../factories';
import { Deathwish } from '../types/graphql';
import { addNewDeathwish, findDeathwish, updateDeathwish } from './resolvers';

describe.skip('data structure for easy and quick lookups', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deathwishes = {
    cc329569: deathwish({
      id: 'cc329569'
    }),
    '8586ead7': deathwish({
      id: '8586ead7'
    })
  };
});

describe('addNewDeathwish', () => {
  describe('when there are no existing deathwishes', () => {
    test('adds the deathwish to the deathwishes', () => {
      const mutationVariables = {
        input: {
          deathwish: deathwish({
            title: 'A trip to New York',
            description: 'The big apple',
            cost: 5000
          })
        }
      };
      const existingDeathwishes: Deathwish[] = [];

      const result = addNewDeathwish(mutationVariables, existingDeathwishes);

      expect(result).toEqual({
        deathwishes: [
          {
            id: expect.any(String),
            type: 'holiday',
            title: 'A trip to New York',
            description: 'The big apple',
            cost: 5000,
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
          deathwish: deathwish({ cost: 20000 })
        }
      };
      const existingDeathwishes: Deathwish[] = [deathwish({ cost: 10000 })];

      const result = addNewDeathwish(mutationVariables, existingDeathwishes);

      expect(result.deathwishes.map(dw => dw.cost)).toEqual([10000, 20000]);
    });
  });
});

describe('findDeathwish', () => {
  describe('when the deathwish exists in the list of deathwishes', () => {
    it('returns the deathwish', () => {
      const deathwishes = [
        deathwish({ id: '8586ead7' }),
        deathwish({ id: 'cc329569' })
      ];
      const id = 'cc329569';

      const result = findDeathwish(deathwishes, id);

      if (!result) {
        return;
      }

      expect(result.id).toBe(id);
    });
  });

  describe('when the deathwish does not exist in the list of deathwishes', () => {
    it('returns undefined', () => {
      const deathwishes = [
        deathwish({ id: '8586ead7' }),
        deathwish({ id: 'cc329569' })
      ];
      const id = 'df3e9579';

      const result = findDeathwish(deathwishes, id);

      expect(result).toBeUndefined();
    });
  });
});

describe('updateDeathwish', () => {
  test('updates the deathwish with new attributes', () => {
    const existingDeathwishes: Deathwish[] = [
      deathwish({ id: '8586ead7' }),
      deathwish({ id: 'cc329569' })
    ];

    const result = updateDeathwish(
      {
        input: {
          deathwish: {
            id: '8586ead7',
            title: 'A different trip'
          }
        }
      },
      existingDeathwishes
    );

    // the deathwishes should be updated in place, that is, without shifting
    // their position
    expect(result.deathwishes).toHaveProperty('length', 2);
    expect(result.deathwishes[0]).toHaveProperty('title', 'A different trip');
  });
});
