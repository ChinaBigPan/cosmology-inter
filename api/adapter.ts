import { Chain, AssetList, Asset, IBCInfo } from '@chain-registry/types';
import { assets, chains, ibc } from 'chain-registry';
import { ChainRegistryClient } from '@chain-registry/client';
import { I_ChainRegistry } from '@/interface';
 
  
class ChainRegistryAdapter implements I_ChainRegistry {
    constructor(private source: string) {}  
  
    async getChainAssetList(chainName: string): Promise<AssetList | []> {  
        if (this.source === 'chain-registry') {    
            const assetList = assets.find(({ chain_name }) => chain_name === chainName);  
            return assetList || [];
        } else if (this.source === '@chain-registry/client') {  
            const client = new ChainRegistryClient({ chainNames: [chainName] });  
            await client.fetchUrls();  
            return (client as any).getChainAssetList(chainName);  
        }  
        return [];  
    }  
}  
  
export default ChainRegistryAdapter;
