import { persistentAtom, persistentMap } from '@nanostores/persistent';
import { atom, map } from 'nanostores';

/**
 * @template T
 * @typedef { import('nanostores').WritableAtom<T> & { reset: () => void } } Atom
 */

/**
 * @template T
 * @typedef { import('nanostores').MapStore<T> & { reset: () => void } } Map
 */

const options = { encode: JSON.stringify, decode: JSON.parse };

function create(store, data) {
  Object.assign(store, { reset: () => store.set(data) });
  return store;
}

export const store = {
  /** @type { <T>(data: T) => Atom<T> } */
  atom: data => create(atom(data), data),
  /** @type { <T>(data: T) => Map<T> } */
  map: data => create(map(data), data),
  /** @type { <T>(name: string, data: T) => Atom<T> } */
  persistentAtom: (name, data) =>
    create(persistentAtom(name, data, options), data),
  /** @type { <T>(name: string, data: T) => Map<T> } */
  persistentMap: (name, data) =>
    create(persistentMap(name, data, options), data),
};
