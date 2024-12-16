import { $account } from '@/modules/account';
import { useStore } from '@nanostores/react';
import { Navigate, Outlet, redirect, useLocation } from 'react-router-dom';

/**
 * @template [T=unknown]
 * @typedef { T & { type: 'user-only' | 'guest-only' }} GuardParams
 * */

/**
 * Guard handler - used by guard function and Guard components
 * @param { GuardParams<{
 *  account: typeof import('@/modules/account')['$account']['value'],
 *  path: string,
 *  mode: 'component' | 'loader'
 * }> } params
 */
function guardHandler(params = {}) {
  const { path, account, type = 'user-only' } = params;
  const { user } = account;

  function guestOnly() {
    if (user) return { isAllowed: false, redirect: '/dashboard' };
    return { isAllowed: true };
  }
  function userOnly() {
    if (!user) return { isAllowed: false, redirect: '/login' };

    const redirect = (() => {
      if (!user.isOnboarded) return '/onboarding';
      if (!user.isVerified) return '/verify-account';
    })();

    return {
      isAllowed: redirect && path !== redirect,
      redirect,
    };
  }

  if (type === 'guest-only') return guestOnly();
  else if (type === 'user-only') return userOnly();
  return userOnly();
}

/**
 * Loader guard - defaults to user-only
 * @param { import('react-router-dom').IndexRouteObject["loader"] } loader
 * @param { GuardParams } params
 * */
export function guard(loader, params) {
  /** @param { import('react-router-dom').LoaderFunctionArgs } loaderArgs */
  return function (loaderArgs) {
    const account = $account.get();
    const result = guardHandler({
      account,
      path: new URL(loaderArgs.request.url).pathname,
      mode: 'loader',
      ...params,
    });
    if (result.isAllowed) return loader(loaderArgs);
    else throw redirect(result.redirect);
  };
}

/**
 * Route Guard component - defaults to user-only
 * @param { GuardParams } params
 * */
export default function Guard(params) {
  const account = useStore($account);
  const location = useLocation();

  const result = guardHandler({
    account,
    path: location.pathname,
    mode: 'component',
    ...params,
  });

  if (result.isAllowed) return <Outlet />;
  else return <Navigate to={result.redirect} replace />;
}
