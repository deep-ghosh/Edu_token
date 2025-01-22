"use client";

import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { TransferForm } from "@/components/TransferForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <div className="flex-grow flex justify-center items-center">
        <div className="relative w-full max-w-3xl p-6 sm:p-10 bg-white shadow-2xl rounded-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🌟 EduToken Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your EduTokens effortlessly with our secure dashboard.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {/* Wallet Connect Section */}
            <WalletConnect setAccount={setAccount} />

            {/* Conditional UI */}
            {account ? (
              <div className="space-y-6">
                <BalanceDisplay account={account} />
                <TransferForm account={account} />
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                Please connect your wallet to view your balance and transfer
                tokens.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <div className="absolute -top-1 left-12 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute bottom-24 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-24 left-20 w-36 h-36 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-40 animate-bounce"></div>
            
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
