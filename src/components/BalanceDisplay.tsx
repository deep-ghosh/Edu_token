"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState, useEffect } from "react";
import { JsonRpcProvider, Contract, formatUnits, isAddress } from "ethers";

const TOKEN_ADDRESS = "YOUR_ACTUAL_CONTRACT_ADDRESS_ON_LINEA_SEPOLIA";
const ABI = ["function balanceOf(address owner) view returns (uint256)"];
const LINEA_SEPOLIA_RPC = "https://rpc.sepolia.linea.build";

interface BalanceDisplayProps {
  account: string;
}

export function BalanceDisplay({ account }: BalanceDisplayProps) {
  const [balance, setBalance] = useState<string>("0");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      // Reset states
      setError(null);
      setBalance("0");

      // Validate inputs
      if (!account) {
        setError("No account address provided");
        return;
      }

      if (!isAddress(account)) {
        setError("Invalid Ethereum address");
        return;
      }

      try {
        // Initialize provider with Linea Sepolia RPC
        const provider = new JsonRpcProvider(LINEA_SEPOLIA_RPC);

        // Verify network connection
        const network = await provider.getNetwork();
        if (network.chainId !== 59141n) {
          // Linea Sepolia chainId
          setError("Please connect to Linea Sepolia network");
          return;
        }

        // Initialize contract
        const contract = new Contract(TOKEN_ADDRESS, ABI, provider);

        // Fetch balance directly using the account address
        const rawBalance = await contract.balanceOf(account);
        const formattedBalance = formatUnits(rawBalance, 18);
        setBalance(formattedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch balance"
        );
      }
    };

    fetchBalance();
  }, [account]);

  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="text-lg font-semibold">
        {error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <div>Your EduToken Balance: {balance} EDU</div>
        )}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Connected Address: {account}
      </div>
    </div>
  );
}
