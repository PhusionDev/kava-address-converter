import React, { useState } from 'react';
import { convertEthAddressToKava } from '../utils/kavaAddressConverter';

const KavaAddressForm = () => {
  const [ethAddress, setEthAddress] = useState('');
  const [kavaAddress, setKavaAddress] = useState('');

  const handleChange = (event) => {
    setEthAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const kavaAddress = convertEthAddressToKava(ethAddress);
    setKavaAddress(kavaAddress);
  };

  return (
    <main>
      <h1>Eth (0x) to Kava Address Converter</h1>
      <form className='inputForm'>
        <input
          className='ethAddressInput'
          name='ethAddress'
          type='text'
          placeholder='Enter ETH (0x) Address'
          onChange={handleChange}
          value={ethAddress}
        />
        <button className='submitButton' onClick={handleSubmit}>
          Convert Address
        </button>
      </form>
      <div className='kavaAddressOutput'>
        <p>{kavaAddress}</p>
      </div>
    </main>
  );
};

export default KavaAddressForm;
