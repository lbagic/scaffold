/** @typedef {{ type: 'user-only' | 'guest-only' }} GuardParams */

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
 const { user } = account;

 if (type === 'guest-only') {
   if (user) return '/dashboard';
   return;
 }

 if (type === 'user-only') {
   if (!user) return '/login';
   return;
 }
}
