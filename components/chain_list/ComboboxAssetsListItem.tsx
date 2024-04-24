import React from 'react';  
import styled from 'styled-components';  
  
const ItemWrapper = styled.div`  
  display: flex;  
  align-items: center;  
  justify-content: flex-start;  
`;  
  
const Image = styled.img`  
  width: 32px;  
  height: 32px;  
  margin-right: 8px;   
`;  
  
const Text = styled.span`  
  font-size: 14px;  
  flex-grow: 1; 
`;  
  
const ComboBoxAssetListItem = ({ imageSrc, text }) => {  
  return (  
    <ItemWrapper>  
      <Image src={imageSrc} alt="" />  
      <Text>{text}</Text>  
    </ItemWrapper>  
  );  
};  
  
export default ComboBoxAssetListItem;