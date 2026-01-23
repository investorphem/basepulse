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
  // UI state for error and success messages instead of alert()
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
    setStatusMessage(null); // Clear previous messages

    try {
      const selected: string[] = [];
      const copyContracts = [...CONTRACTS];
      for (let i = 0; i < 5; i++) {
        if (copyContracts.length === 0) break;
        const idx = Math.floor(Math.random() * copyContracts.length);
        selected.push(copyContracts[idx]);
        copyContracts.splice(idx, 1);
      }

      // Simulation - This will catch reverts without using alert()
      const { request } = await publicClient.simulateContract({
        address: EXECUTOR_ADDRESS,
        abi: EXECUTOR_ABI,
        functionName: "executeAll",
        args: [selected],
        account,
      });

      const walletClient = createWalletClient({
        account,
        chain: base,
        transport: custom(sdk.wallet.ethProvider)
      });

      const hash = await walletClient.writeContract(request);
      setStatusMessage({ text: `Success! Hash: ${hash.slice(0, 10)}...`, type: "success" });
    } catch (err: any) {
      // Catch revert reason (e.g. "execution reverted: cooldown active")
      const msg = err.shortMessage || "Transaction Reverted. Check contract requirements.";
      setStatusMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      {!account ? (
        <button onClick={connectWallet} style={{ padding: "1rem 2rem", cursor: "pointer" }}>
          Connect Farcaster Wallet
        </button>
      ) : (
        <button onClick={handleClick} disabled={loading} style={{ padding: "1rem 2rem", cursor: "pointer" }}>
          {loading ? "Simulating..." : "⚡ Signal"}
        </button>
      )}

      {/* NEW: UI-based status feedback since alert() is blocked */}
      {statusMessage && (
        <div style={{ marginTop: "15px", color: statusMessage.type === "error" ? "red" : "green", fontSize: "0.9rem" }}>
          {statusMessage.text}
        </div>
      )}
    </div>
  );
}
