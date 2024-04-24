import { useContext, createContext } from 'react';
import { I_RootStore, RootStore } from './RootStore';

const store: I_RootStore = new RootStore();

const rootStateContext = createContext(store);

const useRootStore = (): I_RootStore => useContext(rootStateContext);

export { store, useRootStore };
