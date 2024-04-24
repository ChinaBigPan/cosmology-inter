import styled from 'styled-components';
import { Chain, AssetList, Asset } from '@chain-registry/types';
import { useState, useEffect, FC } from 'react';
import { I_OptionComponentProps, I_ComboboxComponentProps } from '@/interface';

const Combobox = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
  margin-top: 40px;
`;

const InputContainer = styled.div`    
  position: relative;    
  display: flex;    
  align-items: center;    
  width: 100%;
`;

const Input = styled.div`  
  position: relative;  
  display: flex;  
  align-items: center;  
  flex: 1;
  
  & input {  
    padding: 10px;   
    width: 100%;  
    border-radius: 4px;  
    border: 1px solid #ccc;  
    padding-left: ${props => props['data-has-selected-option'] ? 48 : 10}px;  
    padding-right: 40px;
  
    &:focus {  
      outline: none;   
      border-color: #1890ff;  
    }  
  }  
  
  & button {  
    position: absolute;  
    right: 0;  
    top: 50%;  
    transform: translateY(-50%);  
    background: none;  
    border: none;  
    padding: 0 10px;  
    cursor: pointer;  
    color: #999;  
    font-size: 16px;  
    line-height: 1;  
  
    &:hover {  
      color: #333;  
    }  
  }  
`;

const DropdownArrow = styled.div`  
  position: absolute;  
  right: 10px;  
  top: 50%;  
  transform: translateY(-50%);  
  cursor: pointer;  
  color: #999;
  font-size: 14px;  
  
  &:hover {    
    color: #333;
  } 
`;

const ClearButton = styled.button`    
  position: absolute;    
  right: 20px;
  top: 50%;    
  transform: translateY(-50%);    
  background: none;    
  border: none;    
  padding: 0 5px;    
  cursor: pointer;    
  color: #999;    
  font-size: 16px;    
  line-height: 1;  
  
  &:hover {    
    color: #333;    
  }    
`;

const SelectedOption = styled.div`  
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 5px;
`;

const SelectedIcon = styled.img`  
  width: 32px;  
  height: 32px;
  display: block;
`;


const Options = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border-radius: 4px;
  background: white;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 3;
`;

const Option = styled.li`
    padding: 5px;
    display: flex;
    align-items: center;

    &:hover {
        background: #f3f3f3; 
    }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const Label = styled.span`
  flex: 1;
`;

const OptionComponent: FC<I_OptionComponentProps> = ({ icon, label, onMouseDown }) => (
    <Option onMouseDown={onMouseDown}>
        <Icon src={icon} />
        <Label>{label}</Label>
    </Option>
)

const ComboboxComponent: FC<I_ComboboxComponentProps> = ({
    openOnFocus,
    options,
    onSelectionChange,
}) => {


    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Asset | null>(null);
    const [text, setText] = useState(selectedOption?.name || '')
    const [filteredOptions, setFilteredOptions] = useState(options);


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        if (!e.target.value) {
            setSelectedOption(null);
            setFilteredOptions(options);
        } else {
            const inputText = e.target.value.toLowerCase();
            const filteredOptions = options.filter(option =>
                option.name.toLowerCase().includes(inputText)
            );

            setFilteredOptions(filteredOptions);
        }
    };

    const handleClear = () => {
        setText('');
        setSelectedOption(null);
        setOpen(false);
    };

    const handleDropdownClick = () => {
        setOpen(!open);
    };

    const handleSelection = (option: Asset) => {
        setOpen(false);
        setSelectedOption(option);
        setText(option.name);
        onSelectionChange(option);
    };

    useEffect(() => {

        return () => {
            setSelectedOption(null);
        }
    }, [])

    return (
        <Combobox>
            {/* {JSON.stringify(selectedOption)} */}
            {selectedOption && (
                <SelectedOption>
                    <SelectedIcon src={selectedOption.logo_URIs?.png || selectedOption.logo_URIs?.svg} alt="" />
                </SelectedOption>
            )}

            <InputContainer>
                <Input data-has-selected-option={!!selectedOption} onFocus={() => setOpen(true) }>
                    <input type="text" value={text} onChange={handleInput} />
                    {text && (
                        <ClearButton onClick={handleClear}>X</ClearButton> // 当text有值时显示清除按钮  
                    )}
                    {!text && (
                        <DropdownArrow onClick={handleDropdownClick}>▼</DropdownArrow> // 仅在text为空时显示箭头  
                    )}
                </Input>
            </InputContainer>

            {open &&
                <Options>
                    {filteredOptions.map(option => {

                        const iconUrl = option?.logo_URIs?.png ?? option?.logo_URIs?.svg ?? undefined;

                        return (
                            <OptionComponent
                                key={option.name}
                                icon={iconUrl}
                                label={option.name}
                                onMouseDown={() => handleSelection(option)}
                            />
                        )
                    })}
                </Options>
            }
        </Combobox>
    )
}

export default ComboboxComponent;