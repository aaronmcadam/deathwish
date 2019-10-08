import { define } from 'cooky-cutter';
import uuidv4 from 'uuid/v4';
import { Deathwish, DeathwishType } from '../types/graphql';

export const deathwish = define<Deathwish>({
  id: () => uuidv4(),
  type: DeathwishType.Holiday,
  title: 'A special holiday',
  description: 'A trip across the world to Tokyo',
  cost: 10000,
  recipients: 'test@example.com,test2@example.com'
});
