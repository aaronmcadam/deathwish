import { resolvers } from './resolvers';

describe('createDeathwish', () => {
  test('adds the deathwish to the list', () => {
    const variables = {
      input: {
        deathwish: {
          type: 'money',
          title: 'Pay off the mortgage',
          description: 'Reduce the financial burden on loved ones',
          recipients: 'test@example.com,test2@example.com'
        }
      }
    };
    const context = {
      cache: {
        writeData: jest.fn()
      }
    };
    resolvers.Mutation.createDeathwish(null, variables, context);

    expect(context.cache.writeData).toHaveBeenCalledWith({
      data: {
        deathwish: {
          id: expect.any(String),
          type: 'money',
          title: 'Pay off the mortgage',
          description: 'Reduce the financial burden on loved ones',
          recipients: 'test@example.com,test2@example.com',
          __typename: 'Deathwish'
        }
      }
    });
  });
});
