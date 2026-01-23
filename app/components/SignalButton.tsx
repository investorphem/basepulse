"use client";

import { useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { createWalletClient, createPublicClient, custom, http } from "viem";
import { base } from "viem/chains";
import { EXECUTOR_ADDRESS, EXECUTOR_ABI } from "../../lib/executor";
import { CONTRACTS } from "../../lib/contracts";

// 1. Initialize a Public Client for Base to handle simulations
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<`0x${string}` | null>(null);

  const connectWallet = async () => {
    try {
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
      // 2. Pick 5 random contracts
      const selected: string[] = [];
      const copyContracts = [...CONTRACTS];
      for (let i = 0; i < 5; i++) {
        if (copyContracts.length === 0) break;
        const idx = Math.floor(Math.random() * copyContracts.length);
        selected.push(copyContracts[idx]);
        copyContracts.splice(idx, 1);
      }

      console.log("Simulating with contracts:", selected);

      // 3. SIMULATE CONTRACT (This catches the error before the wallet pops up)
      // If this fails, it will jump straight to the catch block with the exact reason.
      const { request } = await publicClient.simulateContract({
        address: EXECUTOR_ADDRESS,
        abi: EXECUTOR_ABI,
        functionName: "executeAll",
        args: [selected],
        account,
      });

      // 4. Send transaction via the Farcaster native wallet provider
      const walletClient = createWalletClient({
        account,
        chain: base,
        transport: custom(sdk.wallet.ethProvider)
      });

      const hash = await walletClient.writeContract(request);

      console.log("Tx hash:", hash);
      alert(`✅ Signal sent! Tx hash: ${hash}`);
    } catch (err: any) {
      console.error("Detailed Error:", err);

      // Extract revert reason or short message for better UX
      const errorMsg = err.shortMessage || err.reason || err.message || "Unknown error";
      
      // If you get "Insufficient funds", the wallet needs more ETH on Base
      alert(`❌ Simulation failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {!account ? (
        <button
          onClick={connectWallet}
          className="connect-btn"
          style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
        >
          Connect Farcaster Wallet
        </button>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "gray" }}>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button
            onClick={handleClick}
            disabled={loading}
            style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer" }}
          >
            {loading ? "Simulating..." : "⚡ Signal"}
          </button>
        </div>
      )}
    </div>
  );
}
