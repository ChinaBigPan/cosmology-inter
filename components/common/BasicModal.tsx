import styled from 'styled-components';
import { observer } from 'mobx-react';
import React from 'react';
import { I_BasicModalProps } from '@/interface';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative; 
  min-width: 450px;
  min-height: 250px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 4px;
  
  &:click {
    pointer-events: none;
  }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #fff;
    color: #333;
    border: 1px solid #ddd;
    padding: 5px 8px;  
    border-radius: 4px;

    &:hover {
      background: #eee;
      cursor: pointer;
    }
`

const LoadingIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`


const BasicModal: React.FC<I_BasicModalProps> = observer(({ isLoading = false, onClose = () => { }, isOpen = false, children }) => {

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={onClose}>
          <ModalContainer onClick={handleContainerClick}>
            <CloseButton onClick={onClose}>X</CloseButton>

            {isLoading && <LoadingIcon />}

            {children}
          </ModalContainer>
        </ModalWrapper>
      )
      }
    </>
  )
})

export default BasicModal;