import { createContext, useContext, useMemo, useState } from 'react';
import { IPropChild } from './types';

interface IStore {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStore: (payload: Record<string, any>) => void;
}

const getCxtProvider =
  (
    key: string,
    defaultValue: Record<string, unknown>,
    AppContext: React.Context<IStore>,
  ) =>
  ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue);

    const value = useMemo(
      () => ({
        key,
        store,
        setStore: (payload = {}) =>
          setStore((state) => ({
            ...state,
            ...payload,
          })),
      }),
      [store],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };

const cxtCache: Record<string, Cxt> = {};

class Cxt {
  defaultStore: IStore;
  AppContext: React.Context<IStore>;
  Provider: ({ children }: IPropChild) => JSX.Element;

  constructor(key: string, defaultValue: Record<string, unknown>) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
    };
    this.AppContext = createContext(this.defaultStore);
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
    cxtCache[key] = this;
  }
}

export const useAppContext = (key: string) => {
  const cxt = cxtCache[key];
  const app = useContext(cxt.AppContext);
  return {
    store: app.store,
    setStore: app.setStore,
  };
};
export const connectFactory = (
  key: string,
  defaultValue: Record<string, unknown>,
) => {
  const cxt = cxtCache[key];
  let CurCxt: Cxt;
  if (cxt) {
    CurCxt = cxt;
  } else {
    CurCxt = new Cxt(key, defaultValue);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (Child: React.FunctionComponent<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  );
};
