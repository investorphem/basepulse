"use client";

import { useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { createWalletClient, custom } from "viem";
import { base } from "viem/chains";
import { EXECUTOR_ADDRESS, EXECUTOR_ABI } from "../../lib/executor";
import { CONTRACTS } from "../../lib/contracts";

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<`0x${string}` | null>(null);

  const connectWallet = async () => {
    try {
      // Use the standard EIP-1193 provider from the Farcaster SDK
      const provider = sdk.wallet.ethProvider;
      const accounts = await provider.request({ method: "eth_requestAccounts" }) as `0x${string}`[];
      
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
      alert("Failed to connect Farcaster wallet");
    }
  };

  const handleClick = async () => {
    if (!account) {
      alert("Connect your Farcaster wallet first!");
      return;
    }

    setLoading(true);
    try {
      // Create viem client using the SDK's provider
      const client = createWalletClient({
        account,
        chain: base,
        transport: custom(sdk.wallet.ethProvider)
      });

      // Pick 5 random contracts
      const selected: string[] = [];
      const copyContracts = [...CONTRACTS];
      for (let i = 0; i < 5; i++) {
        if (copyContracts.length === 0) break;
        const idx = Math.floor(Math.random() * copyContracts.length);
        selected.push(copyContracts[idx]);
        copyContracts.splice(idx, 1);
      }

      // Send transaction via the Farcaster native wallet
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
      {!account ? (
        <button
          onClick={connectWallet}
          style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
        >
          Connect Farcaster Wallet
        </button>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "gray" }}>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <button
            onClick={handleClick}
            disabled={loading}
            style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
          >
            {loading ? "Sending..." : "⚡ Signal"}
          </button>
        </div>
      )}
    </div>
  );
}
