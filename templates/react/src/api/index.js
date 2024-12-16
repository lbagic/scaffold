import { createClient } from '@connectrpc/connect';

/**
 * Function for generating service clients
 *
 * @type { <T extends Record<string, import('@bufbuild/protobuf').ServiceType>>(
 *  transport: import('@connectrpc/connect').Transport,
 *  services: T
 * ) => {
 *   [K in keyof T]: import('@connectrpc/connect').Client<T[K]>
 * } }
 * */
export function createClients(transport, services) {
  return Object.fromEntries(
    Object.entries(services).map(([key, service]) => [
      key,
      createClient(service, transport),
    ])
  );
}
