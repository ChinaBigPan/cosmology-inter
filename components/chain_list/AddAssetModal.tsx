import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Divider, Box } from '@interchain-ui/react';
import { useRootStore } from '@/store';

// subComponent
import ComboboxComponent from './ComboboxComponent';
import BasicModal from '../common/BasicModal';


const AddAssetModal: FC = observer((): JSX.Element => {

    const { ChainListStore } = useRootStore();

    const fetchData = () => {
        if (ChainListStore.isLoadingAssets) return;
        if (ChainListStore.isAddAssetModalOpen) {
            ChainListStore.getTempRestoreList();
        }
    }

    const closeSelf = () => {
        ChainListStore.setIsAddAssetModalOpen(false);
        ChainListStore.setSelectedKey(null);
    }

    useEffect(() => {
        fetchData();
    }, [ChainListStore.selectedChain])

    if (ChainListStore.isLoadingAssets) {
        return (
            <div>{'Loading...'}</div>
        )
    }

    const confirmToAdd = () => {

        const oldSelectList = ChainListStore.getSelectedChainAssets();
        let newSelectList;
        if (ChainListStore.selectedKey) {
            newSelectList = [...oldSelectList, ChainListStore.selectedKey];
        } else {
            newSelectList = [...oldSelectList];
        }
        ChainListStore.addAssetList(ChainListStore.selectedChain, newSelectList);
        
        const oldTempSelectList = ChainListStore.getTempRestoreList() || [];
        const newTempSelectList = oldTempSelectList.filter(i => i.name !== ChainListStore.selectedKey?.name ?? '');

        ChainListStore.addTempRestoreList(ChainListStore.selectedChain, newTempSelectList);
        ChainListStore.setSelectedKey(null);
        ChainListStore.setIsAddAssetModalOpen(false);
    }

    return (
        <>
            <BasicModal
                isOpen={ChainListStore.isAddAssetModalOpen}
                onClose={closeSelf}
                isLoading={false}
            >
                <ComboboxComponent 
                    options={ChainListStore.assetOptions} 
                    openOnFocus
                    onSelectionChange={(item: any) => {
                        ChainListStore.setSelectedKey(item ?? null);
                    }}
                />

                <Divider mt="$4" mb="$4" />

                <Box attributes={{ margin: '0 auto' }}>
                    <Button intent="secondary" size="sm" attributes={{margin: '0 auto'}} disabled={!ChainListStore.selectedKey}
                        onClick={confirmToAdd}
                    >
                        <div style={{padding: '15px'}}>{'Confirm'}</div>
                    </Button>
                </Box>
            </BasicModal>

        </>
    )
})


export {
    AddAssetModal
}




























