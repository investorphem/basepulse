"use client";

import { useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { base } from "viem/chains";
import { EXECUTOR_ADDRESS, EXECUTOR_ABI } from "../../lib/executor";
import { CONTRACTS } from "../../lib/contracts";

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const connectWallet = async () => {
    try {
      const provider = sdk.wallet.ethProvider;
      const accounts = await provider.request({ method: "eth_requestAccounts" }) as `0x${string}`[];
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setStatusMessage({ text: "Wallet Connected", type: "success" });
      }
    } catch (err) {
      setStatusMessage({ text: "Connection failed", type: "error" });
    }
  };

  const handleClick = async () => {
    if (!account) {
      setStatusMessage({ text: "Connect wallet first!", type: "error" });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. Pick 5 random contracts and ensure they are typed as addresses
      const selected: `0x${string}`[] = []; 
      const copyContracts = [...CONTRACTS];
      
      for (let i = 0; i < 5; i++) {
        if (copyContracts.length === 0) break;
        const idx = Math.floor(Math.random() * copyContracts.length);
        // Cast string from lib/contracts to the required 0x${string} type
        selected.push(copyContracts[idx] as `0x${string}`);
        copyContracts.splice(idx, 1);
      }

      // 2. Initialize Wallet Client using Farcaster's provider
      const walletClient = createWalletClient({
        account,
        chain: base,
        transport: custom(sdk.wallet.ethProvider)
      });

      // 3. Send Transaction
      // Using 'executeRandom' from your ABI and a manual gas limit
      const hash = await walletClient.writeContract({
        address: EXECUTOR_ADDRESS,
        abi: EXECUTOR_ABI,
        functionName: "executeRandom",
        args: [selected],
        gas: 1000000n, 
      });

      setStatusMessage({ text: `Success! Hash: ${hash.slice(0, 10)}...`, type: "success" });
    } catch (err: any) {
      console.error("Detailed Error:", err);
      // Display error in UI since alert() is blocked in 2026 Farcaster sandboxes
      const msg = err.shortMessage || "Transaction failed. Check Base ETH balance or cooldown.";
      setStatusMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      {!account ? (
        <button 
          onClick={connectWallet} 
          style={{ padding: "1rem 2rem", borderRadius: "8px", cursor: "pointer" }}
        >
          Connect Farcaster Wallet
        </button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "gray" }}>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button 
            onClick={handleClick} 
            disabled={loading} 
            style={{ 
              padding: "1rem 2rem", 
              borderRadius: "8px", 
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: loading ? "#ccc" : "#0070f3",
              color: "white",
              border: "none"
            }}
          >
            {loading ? "Processing..." : "⚡ Signal"}
          </button>
        </div>
      )}

      {statusMessage && (
        <div style={{ 
          marginTop: "15px", 
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: statusMessage.type === "error" ? "#fee2e2" : "#dcfce7",
          color: statusMessage.type === "error" ? "#dc2626" : "#16a34a", 
          fontSize: "0.9rem" 
        }}>
          {statusMessage.text}
        </div>
      )}
    </div>
  );
}
