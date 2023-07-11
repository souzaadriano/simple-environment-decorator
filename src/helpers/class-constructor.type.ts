export type ClassConstructor<T extends {} = any, K = any[]> = new (...args: K[]) => T;
