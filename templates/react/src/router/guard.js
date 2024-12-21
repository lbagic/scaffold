/**
 * @typedef {{ type: 'user-only' | 'guest-only' }} GuardParams
 * */

/**
 * Guard handler - used by guard (loader) and Guard (component)
 *
 * @param { GuardParams & {
 *  account: typeof import('@/modules/account')['$account']['value']
 *  path: string,
 * }} params
 */
export function guardHandler(params = {}) {
  const { path, account, type = 'user-only' } = params;
  const { user, subscribed } = account;

  if (type === 'guest-only') {
    if (user) return '/dashboard';
  } else if (type === 'user-only') {
    if (!user) return '/login';
    if (!subscribed && path !== '/subscription') return '/subscription';
  }
}
