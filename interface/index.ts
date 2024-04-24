import React, { ReactNode } from 'react'; 
import { Chain, AssetList, Asset } from '@chain-registry/types';

export interface I_OptionComponentProps {
    icon: string;
    label: string;
    onMouseDown: (option: any) => void;
}

export interface I_ComboboxComponentProps {
    openOnFocus?: boolean;
    options: Asset[];
    onSelectionChange: (option: any) => void;
} 

export interface I_ChainRegistry {  
    getChainAssetList(chainName: string): Promise<AssetList | []>;  
} 

export interface I_BasicModalProps {  
    isLoading?: boolean;  
    onClose?: () => void;  
    isOpen?: boolean;  
    children?: ReactNode;  
} 
