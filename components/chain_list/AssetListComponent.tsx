import styled from 'styled-components';
import { Asset } from '@chain-registry/types';
import { useRootStore } from '@/store';

const AssetListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssetListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const AssetImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px; 
  
  background: url('/error-img.png') no-repeat center center;  
  background-size: cover;  
  object-fit: cover; 
`;

const AssetName = styled.span`
  flex: 1;
  font-size: 14px;
  color: black;
`;

const ActionButton = styled.button`
  padding: 8px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AssetDepositButton = styled(ActionButton)`
  background-color: palegreen;

  &:hover {
    background-color: lightgreen;
  }
`;

const AssetWithdrawButton = styled(ActionButton)`
  background-color: palevioletred;

  &:hover {  
    background-color: pink;
  }
`;


const AssetListItemContainer: React.FC<{ item: Asset }> = ({ item }) => {

  const { ChainListStore } = useRootStore();

  const onDeposit = () => {
    ChainListStore.setIsDepositModalOpen(true);
  }

  const onWithDraw = () => {
  }

  const iconUrl = item?.logo_URIs?.png ?? undefined;


  return (
    <AssetListItem>
      <AssetImage src={iconUrl} />
      <AssetName>{item.name}</AssetName>
      <AssetDepositButton onClick={onDeposit}>{'Deposit'}</AssetDepositButton>
      <AssetWithdrawButton onClick={onWithDraw}>{'Withdraw'}</AssetWithdrawButton>
    </AssetListItem>
  )
}

const AssetListComponent = ({ list = ([] as Asset[]) }) => {

  return (
    <AssetListContainer>
      {
        list.map((item) => {
          return <AssetListItemContainer key={item.name} item={item} />
        })
      }
    </AssetListContainer>
  )
}

export {
  AssetListComponent,
};