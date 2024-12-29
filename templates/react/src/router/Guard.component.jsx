import { $account } from '@/modules/account';
import { guardHandler } from '@/router/guard';
import { useStore } from '@nanostores/react';
import { Navigate, Outlet, useLocation } from 'react-router';

/**
 * Component guard - defaults to user-only
 * 
 * @param { import('@/router/guard').GuardParams } params
 * */
export default function Guard(params) {
  const account = useStore($account);
  const path = useLocation().pathname;

  const to = guardHandler({ account, path, ...params });
  if (to) return <Navigate to={to} replace />;
  return <Outlet />;
}
