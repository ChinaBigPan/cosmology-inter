import { chains } from 'chain-registry';
import { Asset, Chain } from '@chain-registry/types';

export function getLogo(from: Asset | Chain) {
  return from.logo_URIs?.svg || from.logo_URIs?.png || from.logo_URIs?.jpeg;
}

export function getChainLogo(name: string) {
  const chain = chains.find(chain => chain.chain_name === name)
  return chain ? getLogo(chain) : null;
}

export function getRandomElements(arr: any[], minElements = 2, maxElements = 5): Asset[] {  

  if (arr.length < minElements) {  
     return arr; 
  }  

  const numElements = Math.min(Math.max(Math.floor(Math.random() * (maxElements - minElements + 1)) + minElements, minElements), arr.length);  

  let elementsCopy = [...arr];  
  let result: any[] = [];  

  for (let i = 0; i < numElements; i++) {  
      let randomIndex = Math.floor(Math.random() * elementsCopy.length);  
      result.push(elementsCopy[randomIndex]);  
      elementsCopy.splice(randomIndex, 1);  
  }  

  return result;  
} 