import { useCallback, useState } from 'react';

/**
 * @template { (...args: any[]) => Promise<any> } T
 * @param { T } promise
 * @returns { T }
 */
export function usePending(promise) {
  const [isPending, setIsPending] = useState(false);

  const call = useCallback(
    function (...args) {
      setIsPending(true);
      return promise(...args)
        .then(res => {
          setIsPending(false);
          return res;
        })
        .catch(err => {
          setIsPending(false);
          throw err;
        });
    },
    [promise]
  );

  call.isPending = isPending;

  return call;
}
