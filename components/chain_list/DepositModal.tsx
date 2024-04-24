import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useRootStore } from '@/store';
import { Icon } from "@interchain-ui/react";

import BasicModal from '../common/BasicModal';

const Container = styled.div`  
  // max-width: 450px; 
  padding: 0;
  border-radius: 5px;
  margin: 0 auto;  
  background-color: white;  
  font-family: 'Inter', sans-serif;  
`;

const FlexRow = styled.div`  
  display: flex;
  justify-content: space-between;  
  align-items: center;
  margin-bottom: 20px;  

  .left-part, .right-part {
    .part-title {
      color: #748191;
      margin-bottom: 10px;
    }

    .asset-part {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #EDF2FA;
      padding: 15px 10px;
      border-radius: 8px;
      color: #909CA9;
    }
  }

  .arrow-to-right {
    margin: 38px 10px 10px;
    font-size: 18px;
    color: #667183; 
  }
`;

const TransferPart = styled.div` 
  .top-part {
    display: flex;
    align-item: center;
    justify-content: space-between;
    color: #667486;
    font-weight: bold;

    .available {
      font-weight: normal;
    }
  }

  .mid-input {
    text-align: center;  
    border: 1px solid #ccc;  
    border-radius: 5px;  
    padding: 12px 10px; 
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .input-container {
      flex: 1;
      position: relative;

      &::before {
        content: "";  
        position: absolute;  
        top: 50%; 
        left: 0;  
        width: 1px;  
        height: 55px;   
        background: #ccc;  
        transform: translateY(-50%);  
      }
    }

    .exchange-rate {
      .bold-currency {
        font-weight: bold;
      }
    }
  }
`

const TransferInput = styled.input`
  border: none;
  width: 100%;
  height: 30px;
  flex: 1;
  z-index: 2;
  padding-left: 10px;
  position: relative;  
  background-color: transparent;

  &:focus {
    outline: none;
    border-color: inherit; 
    box-shadow: none;
  }
`

const FlexColumn = styled.div`  
  display: flex;  
  flex-direction: column; 
  justify-content: center;   
  align-items: center;  
`;

const Title = styled.h2`  
  font-size: 20px;  
  font-weight: 500;  
  padding-bottom: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Logo = styled.img`  
  height: 24px;  
  width: 24px;  
  margin-right: 10px;  
`;

const InfoBox = styled.div`  
  padding: 10px;  
  background-color: #EDF2FA; 
  border-radius: 5px;  
  margin-bottom: 20px;  
  display: flex;  
  align-items: center;  
  color: #999;  
`;

const BoldSpan = styled.span`
  font-weight: bold;
`

const NormalSpan = styled.span`
  font-weight: normal;
`

const TagList = styled.div`
  display: flex;
  justify-content: flex-end;  
  align-items: center;
  margin-top: 15px;
  margin-bottom: 30px;
`

const TagListItem = styled.div`
  color: #999; 
  background-color: #EDF2FA;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: bold;
  margin-left: 5px;
`

const Button = styled.button`  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 30px;  
  border-radius: 5px;  
  border: none;
  cursor: pointer;  

  &.primary {  
    background-color: black;  
    color: white;  
    transition: all 300ms linear;
  
    &:hover {
      opacity: 0.7;
    }
  }  

  &.secondary {  
    border: none;
    background-color: transparent;
    color: #666;  
  }  
`;



const DepositModal = observer(({ isLoading = false, isOpen = false, onClose = () => {} }): JSX.Element => {


    const cosmoHub = 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png';
    const osmosisHub = 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png';


    return (
        <BasicModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
            <Container>
                <FlexRow>
                    <Title>Deposit ATOM</Title>
                </FlexRow>

                <FlexRow>
                    <div className='left-part'>
                        <div className='part-title'>From Cosmos Hub</div>
                        <div className='asset-part'>
                          <Logo src={cosmoHub}/>
                          <span>atom1xy5y...m6wvz9a</span>
                        </div>
                    </div>
                    <div className='arrow-to-right'>{'→'}</div>
                    <div className='right-part'>
                        <div className='part-title'>To Osmosis</div>
                        <div className='asset-part'>
                          <Logo src={osmosisHub}/>
                          <span>atom1xy5y...m6wvz9a</span>
                          <Icon name="pencilLine" attributes={{ marginLeft: '$2' }} />
                        </div>
                    </div>
                </FlexRow>

                <TransferPart>
                  <div className='top-part'>
                    <div>Select amount</div>
                    <div><NormalSpan>Available</NormalSpan> 2 ATOM</div>
                  </div>
                  
                  <div className="mid-input">
                    <Logo src={cosmoHub} className="mid-input-logo" />
                    <div className='input-container'>
                      <TransferInput />
                    </div>
                    <div className='exchange-rate'>
                      <BoldSpan>Atom</BoldSpan> ≈ $1,013
                    </div>
                  </div>

                  <TagList>
                    <TagListItem>{'Max'}</TagListItem>
                    <TagListItem>{'1/2'}</TagListItem>
                    <TagListItem>{'1/3'}</TagListItem>
                  </TagList>
                </TransferPart>

                <InfoBox>
                    <Icon name="timeLine" attributes={{ marginLeft: '$2', marginRight: '$4'}} />
                    <div>Estimated time: <BoldSpan style={{ color: '#2D343B' }}>20 seconds</BoldSpan></div>
                </InfoBox>
                <FlexColumn>
                  <Button className="primary">Transfer</Button>
                  <Button className="secondary" onClick={onClose}>Cancel</Button>
                </FlexColumn>
            </Container>
        </BasicModal>
    )
})

export {
    DepositModal
}