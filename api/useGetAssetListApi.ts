import { useRootStore } from '@/store';
import ChainRegistryAdapter from './adapter';
import { Chain, AssetList } from '@chain-registry/types';


export const useGetAssetListApi = () => {
    const { ChainListStore } = useRootStore();

    const chainAdapter = new ChainRegistryAdapter(ChainListStore.curDataSource); 


    const getAssetList = async (): Promise<AssetList> => {
        ChainListStore.setIsLoadingAssets(true);

        return new Promise((resolve) => {
            setTimeout(() => {
                const assetList = chainAdapter.getChainAssetList(ChainListStore.selectedChain);
                ChainListStore.setIsLoadingAssets(false);
                resolve(assetList);
            }, 500);
        });
    };

    return getAssetList;
}