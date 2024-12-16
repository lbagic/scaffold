import { createStore } from '@/modules';

export const $account = createStore({
  name: 'account',
  type: 'map',
  data: {
    /** @type { import('gen/api/v1/models_pb').User } */
    user: null,
    token: null,
  },
  persistent: true,
});
