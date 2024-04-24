import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box, Button } from '@interchain-ui/react';
import { useRootStore } from '@/store';
import { useGetAssetListApi } from '@/api'
import { getRandomElements } from '@/utils';

// children components
import { AddAssetModal } from './AddAssetModal'
import { DepositModal } from './DepositModal';
import { AssetListComponent } from './AssetListComponent';


const ChainList: FC = observer((): JSX.Element => {
    const { ChainListStore } = useRootStore();
    const getAssetList = useGetAssetListApi()

    const fetchData = async () => {
        if (ChainListStore.isLoadingAssets) return;

        const data = await getAssetList();
        const showedAssets = getRandomElements(data.assets, 2, 5);
        ChainListStore.addAssetList(data.chain_name, showedAssets)

        const restAssets = data.assets.filter(item => {
            return !showedAssets.some(a => {
                return a.name === item.name;
            })
        })
            
        ChainListStore.addTempRestoreList(data.chain_name, restAssets);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const List = ChainListStore.getSelectedChainAssets();

    const onClickAddAsset = () => {
        ChainListStore.setIsAddAssetModalOpen(true);
    }

    const onClickCloseDepositModal = () => {
        ChainListStore.setIsDepositModalOpen(false);
    }

    return (
        <>
            <Box attributes={{ margin: '$5' }}>
                <Button intent="secondary" size="lg" fluid leftIcon={'add'} onClick={onClickAddAsset}>
                    <div style={{ padding: '10px' }}>{'Add Asset'}</div>
                </Button>
            </Box>

            <Box attributes={{ margin: '$5' }}>
                <AssetListComponent list={List} />
            </Box>

            <AddAssetModal />
            <DepositModal onClose={onClickCloseDepositModal}  isOpen={ChainListStore.isDepositModalOpen}  />
        </>
    )
})

export {
    ChainList
}
