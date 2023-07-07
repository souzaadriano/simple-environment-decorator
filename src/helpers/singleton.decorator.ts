const SINGLETON_KEY = Symbol();

export type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export const Singleton = <T extends new (...args: any[]) => any>(type: T) =>
  new Proxy(type, {
    construct(target: Singleton<T>, argsList, newTarget) {
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget);
      }

      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
      }

      return target[SINGLETON_KEY];
    },
  });
