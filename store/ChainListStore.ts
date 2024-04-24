import { makeAutoObservable } from 'mobx';
import {  Key } from 'react'
import { I_RootStore } from './RootStore';
import { Chain, AssetList, Asset } from '@chain-registry/types';

enum DataSource {  
    ChainRegistry = 'chain-registry',
    ChainRegistryClient = '@chain-registry/client',  
}

enum ChainType {
    osmosis = 'osmosis',
    juno = 'juno',
    stargaze = 'stargaze',
}

export class ChainListStore {
    rootStore: I_RootStore;

    assetLists: Map<string, Asset[]> = new Map(); 
    selectedChain: string = ChainType.osmosis; 
    selectedKey: Key | null = null;
    curDataSource: DataSource = DataSource.ChainRegistry;

    isAddAssetModalOpen: boolean = false;
    comboBoxAssets: AssetList = {
        chain_name: '',
        assets: [],
        $schema: '',
    };
    isLoadingAssets: boolean = false;
    isDepositModalOpen: boolean = false;
    
    tempRestoreList: Map<string, Asset[]> = new Map(); 

    constructor(rootStore: I_RootStore) {
        makeAutoObservable(this, {
            rootStore: false,
        })

        this.rootStore = rootStore;
    }

    get assetOptions() {
        if (this.comboBoxAssets.assets.length === 0) {
            return [];
        }
        return this.comboBoxAssets.assets;
    }

    setIsAddAssetModalOpen(val: boolean) {
        this.isAddAssetModalOpen = val;
    }

    setIsDepositModalOpen(val: boolean) {
        this.isDepositModalOpen = val;
    }

    setIsLoadingAssets(val: boolean) {
        this.isLoadingAssets = val;
    }

    addAssetList(chain: string, assets: Asset[]) {
        this.assetLists.set(chain, assets);
    }

    setSelectedKey(newKey: Key) {
        this.selectedKey = newKey;
    }

    addTempRestoreList(chain: string, assets: Asset[]) {
        this.tempRestoreList.set(chain, assets);
        this.comboBoxAssets.assets = assets;
    }

    getSelectedChainAssets(): Asset[] | undefined {
        return this.assetLists.get(this.selectedChain);
    }

    getTempRestoreList(): Asset[] | undefined {
        return this.tempRestoreList.get(this.selectedChain);
    }

    setSelectedChain(chain: string) {
        this.selectedChain = chain;
    }
}