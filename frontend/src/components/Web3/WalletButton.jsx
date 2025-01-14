import React, { useState } from 'react';
import { ethers } from 'ethers';
 import { Button } from '../UI/Button';

export function WalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
      } else {
        alert('Please install MetaMask to use this feature!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
    setIsConnecting(false);
  };

  return (
    <Button
      onClick={connectWallet}
      isLoading={isConnecting}
      variant="primary"
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </Button>
  );
}