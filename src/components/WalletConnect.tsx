'use client'

import { useState } from 'react'
import { BrowserProvider } from "ethers";

interface WalletConnectProps {
  setAccount: (account: string | null) => void
}

export function WalletConnect({ setAccount }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setConnectionError(null);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        handleConnectionError(error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      setConnectionError('Please install MetaMask!');
    }
  };

  const handleConnectionError = (error: unknown) => {
    if (typeof error === 'object' && error !== null) {
      if ('code' in error && error.code === 4001) {
        // User rejected request
        setConnectionError('Connection request was rejected. Please try again and approve the connection in your wallet.');
      } else if ('message' in error && typeof error.message === 'string') {
        setConnectionError(`An error occurred: ${error.message}`);
      } else {
        setConnectionError('An unknown error occurred while connecting to the wallet. Please try again.');
      }
    } else {
      setConnectionError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {connectionError && (
        <p className="text-red-500 mt-2">{connectionError}</p>
      )}
    </div>
  )
}

