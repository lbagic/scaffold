import { createClients } from '@/api';
import { interceptors } from '@/api/interceptors';
import { createConnectTransport } from '@connectrpc/connect-web';
// import { AccountService } from 'gen/api/v1/account_connect';

const services = {
  // AccountService,
};

const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_GRPC_URL,
  interceptors: [
    interceptors.error,
    interceptors.auth,
    interceptors.pagination,
  ],
});

export const GC = createClients(transport, services);
