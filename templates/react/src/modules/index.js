import { persistentAtom, persistentMap } from '@nanostores/persistent';
import { atom, map } from 'nanostores';

const DEFAULT_STORE = sessionStorage;

function encode(data) {
  return JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() + 'n' : value
  );
}

function decode(json) {
  return JSON.parse(json, (key, value) => {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.substr(0, value.length - 1));
    }
    return value;
  });
}

/**
 * @type { <T, Type extends 'atom' | 'map'>(params: {
 *    name: string,
 *    type: Type,
 *    data: T,
 *    persistent?: boolean,
 *    storage?: Storage
 * }) =>
 *  Type extends 'atom'
 *    ? import("nanostores").WritableAtom<T> & { reset: () => void }
 *    : Type extends 'map'
 *    ? import("nanostores").MapStore<T> & { reset: () => void }
 *    : never
 * }
 */
export const createStore = ({
  data,
  name,
  type,
  persistent,
  storage = DEFAULT_STORE,
}) => {
  if (persistent && !name) throw new Error('Invalid store key.');

  const store =
    type === 'atom'
      ? persistent
        ? persistentAtom(name, data, { encode, decode, storage })
        : atom(data)
      : type === 'map'
        ? persistent
          ? persistentMap(name, data, { encode, decode, storage })
          : map(data)
        : undefined;

  if (store) {
    Object.assign(store, { reset: () => store.set(data) });
    return store;
  }

  throw new Error('Invalid store type.');
};
