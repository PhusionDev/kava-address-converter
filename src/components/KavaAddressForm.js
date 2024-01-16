import React, { useState } from 'react';
import {
  convertEthAddressToKava,
  convertKavaAddressToEth,
  isEthAddress,
  isKavaAddress,
} from '../utils/kavaAddressConverter';

const KavaAddressForm = () => {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [validInput, setValidInput] = useState(false);

  const inputMessage = () => {
    if (validInput) {
      const baseMessage = isEthAddress(userInput)
        ? 'Eth (0x) Address: '
        : 'Kava Address: ';
      return baseMessage + userInput;
    } else {
      return '';
    }
  };

  const outputMessage = () => {
    if (validInput) {
      const baseMessage = isEthAddress(userInput)
        ? 'Kava Address: '
        : 'Eth (0x) Address: ';
      return baseMessage + output;
    } else {
      return '';
    }
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
    const userInput = event.target.value;
    if (isEthAddress(userInput)) {
      const kavaAddress = convertEthAddressToKava(userInput);
      setOutput(kavaAddress);
      setValidInput(true);
    } else if (isKavaAddress(userInput)) {
      const ethAddress = convertKavaAddressToEth(userInput);
      setOutput(ethAddress);
      setValidInput(true);
    } else {
      setOutput('');
      setValidInput(false);
    }
  };

  return (
    <main>
      <h1>Kava/Ethereum (0x) Address Converter</h1>
      <form className='inputForm'>
        <input
          className='addressInput'
          name='addressInput'
          type='text'
          placeholder='Enter ETH or Kava Address'
          onChange={handleChange}
          value={userInput}
        />
      </form>
      <div className='addressOutput'>
        <p>{inputMessage()}</p>
        <p>{outputMessage()}</p>
      </div>
    </main>
  );
};

export default KavaAddressForm;
