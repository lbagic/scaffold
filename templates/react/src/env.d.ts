/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRPC_URL: string;
  readonly VITE_REST_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import 'react-router';
declare module 'react-router' {
  // If you want to accept a specific parameter type, you can define it like this:
  export function useLoaderData<T>(loader?: T): Awaited<ReturnType<T>>;
  export function useRouteLoaderData<T>(
    routeId: string,
    loader?: T
  ): Awaited<ReturnType<T>>;
}

import 'react';
declare module 'react' {
  export function useState<S>(
    initialState:
      | Partial<{ [K in keyof S]: S[K] }>
      | (() => { [K in keyof S]: S[K] }),
    model: S
  ): [S, Dispatch<SetStateAction<S>>];
}

import '@connectrpc/connect';
declare module '@connectrpc/connect' {
  interface ContextValues {
    overrideErrorInterceptor?: (error: any) => void;
  }
}

import { ColorScale as NextColorScale } from '@nextui-org/react';
declare module '@nextui-org/react' {
  interface ColorScale extends NextColorScale {
    DEFAULT: string;
  }
}

export type DotPaths<T extends object, Exclude = T | Function> = {
  [K in keyof T & (string | number)]: T[K] extends Exclude
    ? never
    : T[K] extends any[]
      ? `${K}`
      : T[K] extends object
        ? `${K}` | `${K}.${DotPaths<T[K], Exclude | T[K]>}`
        : `${K}`;
}[keyof T & (string | number)];
