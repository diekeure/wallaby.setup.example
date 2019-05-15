import { Injectable } from '@angular/core';
import {
  ObjectPathServiceInterface,
  ObjPathProxy,
  ObjProxyArg
} from './object-path.service.interface';

/*
 * Generate strongly-typed deep property path in typescript. Access deep property by a path.
 * Shameless copy / adaptation from:
 * https://github.com/Taras-Tymchiy/ts-object-path/blob/5bbb38427edf99e29ac66264e50dd427143618bb/src/ts-object-path.ts
 */

const pathSymbol = Symbol('Object path');

@Injectable({
  providedIn: 'root'
})
export class ObjectPathService implements ObjectPathServiceInterface {
  createProxy<T>(path: PropertyKey[] = []): ObjPathProxy<T, T> {
    const proxy = new Proxy(
      { [pathSymbol]: path },
      {
        get: (target, key) => {
          if (key === pathSymbol) {
            return target[pathSymbol];
          }
          if (typeof key === 'string') {
            const intKey = parseInt(key, 10);
            if (key === intKey.toString()) {
              key = intKey;
            }
          }
          return this.createProxy([...(path || []), key]);
        }
      }
    );
    return (proxy as any) as ObjPathProxy<T, T>;
  }

  getPath<TRoot, T>(proxy: ObjProxyArg<TRoot, T>): PropertyKey[] {
    if (typeof proxy === 'function') {
      proxy = proxy(this.createProxy<TRoot>());
    }
    return (proxy as any)[pathSymbol];
  }

  get<TRoot, T>(
    object: TRoot,
    proxy: ObjProxyArg<TRoot, T>,
    defaultValue?: T | null
  ) {
    return this.getPath(proxy).reduce(
      (o, key) => (o && o[key]) || defaultValue,
      object as any
    ) as T;
  }

  set<TRoot, T>(object: TRoot, proxy: ObjProxyArg<TRoot, T>, value: T): void {
    this.getPath(proxy).reduce((o: any, key, index, keys) => {
      if (index < keys.length - 1) {
        o[key] = o[key] || (typeof keys[index + 1] === 'number' ? [] : {});
        return o[key];
      }
      o[key] = value;
    }, object);
  }
}
