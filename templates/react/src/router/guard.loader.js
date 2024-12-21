import { $account } from '@/modules/account';
import { guardHandler } from '@/router/guard';
import { redirect } from 'react-router-dom';

/**
 * Loader guard - defaults to user-only
 *
 * @param { import('react-router-dom').LoaderFunction } loader
 * @param { GuardParams } params
 * */
export function guard(loader, params) {
  /** @param { import('react-router-dom').LoaderFunctionArgs } loaderArgs */
  return function (loaderArgs) {
    const account = $account.get();
    const path = new URL(loaderArgs.request.url).pathname;

    const redirectTo = guardHandler({ account, path, ...params });

    if (redirectTo) throw redirect(redirectTo);
    return loader(loaderArgs);
  };
}
