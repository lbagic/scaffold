import { $account } from '@/modules/account';
import { guardHandler } from '@/router/guard';
import { useStore } from '@nanostores/react';
import { Navigate, Outlet, useLocation } from 'react-router';

/**
 * Route Guard component - defaults to user-only
 *
 * @param { import('@/router/guard').GuardParams } params
 * */
export default function Guard(params) {
  const account = useStore($account);
  const path = useLocation().pathname;

  const redirectTo = guardHandler({ account, path, ...params });

  if (redirectTo) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
