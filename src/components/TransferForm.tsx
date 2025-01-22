"use client";

import { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";

const TOKEN_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your deployed contract address
const ABI = ["function transfer(address to, uint256 amount) returns (bool)"];

interface TransferFormProps {
  account: string;
}

export function TransferForm({ account }: TransferFormProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsTransferring(true);
    setMessage("");

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(TOKEN_ADDRESS, ABI, signer);
      const tx = await contract.transfer(recipient, parseUnits(amount, 18));
      await tx.wait();
      setMessage("Transfer successful!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transfer error:", error);
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-4">
      <div>
        <label
          htmlFor="recipient"
          className="block text-sm font-medium text-gray-700"
        >
          Recipient Address
        </label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          min="0"
          step="0.000000000000000001"
        />
      </div>
      <button
        type="submit"
        disabled={isTransferring}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isTransferring ? "Transferring..." : "Transfer Tokens"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
}
