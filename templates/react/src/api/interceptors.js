// import { toastService } from '@/modules/toast';
import { $account } from '@/modules/account';

/** @satisfies { Record<string, import('@connectrpc/connect').Interceptor> } */
export const interceptors = {
  error: next => async req => {
    try {
      return await next(req);
    } catch (error) {
      // Stream cancelled by client - rethrow, dont show toast
      if (req.stream && error.name === 'AbortError') throw error;

      // const message = error.message.replace(/\[.*?\]/g, '');
      // toastService.error(message);
      throw error;
    }
  },
  auth: next => async req => {
    const { token } = $account.get();
    if (token) req.header.set('Authorization', `Bearer ${token}`);

    return await next(req);
  },
  pagination: next => async req => {
    const fields = req.method.I.fields.list();
    const pagination = fields.find(el => el.name === 'pagination');

    // Add pagination if not present
    if (pagination && !req.message.pagination) {
      req.message.pagination = new pagination.T({
        overridePagination: true,
      });
    }

    return await next(req);
  },
};
