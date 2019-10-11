import { define } from 'cooky-cutter';
import short from 'short-uuid';
import { Deathwish, DeathwishType, User } from '../types/graphql';

export const user = define<User>({
  id: () => short.generate(),
  email: 'tester@example.com'
});

export const deathwish = define<Deathwish>({
  id: () => short.generate(),
  type: DeathwishType.Holiday,
  title: 'A special holiday',
  description: 'A trip across the world to Tokyo',
  cost: 10000,
  recipients: 'test@example.com,test2@example.com',
  owner: user
});
