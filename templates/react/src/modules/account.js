import { store } from '@/modules';

export const $account = store.persistentMap('account', {
  token: '',
  /** @type { import('gen/api/v1/models_pb').User } */
  user: null,
});
