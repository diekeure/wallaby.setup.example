import { InjectionToken } from '@angular/core';

export const OBJECT_PATH_SERVICE_TOKEN = new InjectionToken(
  'ObjectPathService'
);

export type ObjPathProxy<TRoot, T> = {
  [P in keyof T]: ObjPathProxy<TRoot, T[P]>
};

export type ObjProxyArg<TRoot, T> =
  | ObjPathProxy<TRoot, T>
  | ((p: ObjPathProxy<TRoot, TRoot>) => ObjPathProxy<TRoot, T>);

export interface ObjectPathServiceInterface {
  createProxy<T>(path?: PropertyKey[]): ObjPathProxy<T, T>;

  getPath<TRoot, T>(proxy: ObjProxyArg<TRoot, T>): PropertyKey[];

  get<TRoot, T>(
    object: TRoot,
    proxy: ObjProxyArg<TRoot, T>,
    defaultValue?: T | null | undefined
  );

  set<TRoot, T>(object: TRoot, proxy: ObjProxyArg<TRoot, T>, value: T): void;
}
