import { ChainListStore } from './ChainListStore';

export interface I_RootStore {
    ChainListStore: ChainListStore;
}

export class RootStore implements I_RootStore {
    ChainListStore: ChainListStore;

    constructor() {
        this.ChainListStore = new ChainListStore(this);
    }
}
