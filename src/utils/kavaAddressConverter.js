const { bech32 } = require('bech32');
const Buffer = require('buffer').Buffer;

const isEthAddress = (address) => {
  if (!address) {
    return false;
  }
  if (address.length !== 42) {
    return false;
  }
  if (address.slice(0, 2) !== '0x') {
    return false;
  }
  return true;
};

const isKavaAddress = (address) => {
  if (!address) {
    return false;
  }
  if (address.length !== 43) {
    return false;
  }
  if (address.slice(0, 5) !== 'kava1') {
    return false;
  }
  return true;
};

const convertBits = (buffer, fromBits, toBits, pad) => {
  let accumulator = 0;
  let bits = 0;
  const result = [];
  const maxV = (1 << toBits) - 1;
  for (let i = 0; i < buffer.length; i++) {
    const value = buffer[i];
    if (value < 0 || value >> fromBits !== 0) {
      return null;
    }
    accumulator = (accumulator << fromBits) | value;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((accumulator >> bits) & maxV);
    }
  }
  if (pad) {
    if (bits > 0) {
      result.push((accumulator << (toBits - bits)) & maxV);
    }
  } else if (bits >= fromBits || (accumulator << (toBits - bits)) & maxV) {
    return null;
  }
  return result;
};

const convertAddressToBytes = (address) => {
  const addressBytes = Buffer.from(address.slice(2), 'hex');
  return addressBytes;
};

const convertEthAddressToKava = (ethAddress) => {
  if (!isEthAddress(ethAddress)) {
    return 'Invalid ETH address';
  }
  const addressBytes = convertAddressToBytes(ethAddress);
  const words = convertBits(addressBytes, 8, 5, true);
  const address = bech32.encode('kava', words);
  return address;
};

const toHexString = (byteArray) => {
  return Array.from(byteArray, (byte) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

const convertBytesToAddress = (bytes) => {
  const address = '0x' + toHexString(bytes);
  return address;
};

const convertKavaAddressToEth = (kavaAddress) => {
  if (!isKavaAddress(kavaAddress)) {
    return 'Invalid Kava address';
  }
  const { words } = bech32.decode(kavaAddress);
  const bytes = convertBits(words, 5, 8, false);
  const address = convertBytesToAddress(bytes);
  return address;
};

module.exports = {
  convertEthAddressToKava,
  convertKavaAddressToEth,
  isEthAddress,
  isKavaAddress,
};
