"use client";

import { useState } from "react";
import { createSolanaWalletProvider } from "@farcaster/miniapp-sdk";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";
import { EXECUTOR_ADDRESS, EXECUTOR_ABI } from "../../lib/executor";
import { CONTRACTS } from "../../lib/contracts";

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  // Initialize Farcaster wallet provider
  const farcasterProvider = createSolanaWalletProvider();

  const connectWallet = async () => {
    try {
      const walletAccount = await farcasterProvider.connect();
      setAccount(walletAccount);
    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert("Failed to connect wallet");
    }
  };

  const handleClick = async () => {
    if (!account) {
      alert("Connect your Farcaster wallet first!");
      return;
    }

    setLoading(true);
    try {
      // Create viem client for Base chain
      const client = createWalletClient({
        account,
        chain: base,
        transport: http()
      });

      // Pick 5 random contracts
      const selected: string[] = [];
      const copyContracts = [...CONTRACTS];
      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * copyContracts.length);
        selected.push(copyContracts[idx]);
        copyContracts.splice(idx, 1);
      }

      // Send transaction
      const hash = await client.writeContract({
        address: EXECUTOR_ADDRESS,
        abi: EXECUTOR_ABI,
        functionName: "executeAll",
        args: [selected]
      });

      console.log("Tx hash:", hash);
      alert(`✅ Signal sent! Tx hash: ${hash}`);
    } catch (err: any) {
      console.error(err);
      alert(`❌ Transaction failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {!account && (
        <button
          onClick={connectWallet}
          style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
        >
          Connect Farcaster Wallet
        </button>
      )}
      {account && (
        <button
          onClick={handleClick}
          disabled={loading}
          style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
        >
          {loading ? "Sending..." : "⚡ Signal"}
        </button>
      )}
    </div>
  );
}
