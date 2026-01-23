"use client";

import { useState } from "react";
import { useFarcaster } from "@farcaster/miniapp-sdk";
import { createWalletClient, custom } from "viem";
import { base } from "viem/chains";
import { EXECUTOR_ADDRESS, EXECUTOR_ABI } from "../../lib/executor";
import { CONTRACTS } from "../../lib/contracts";

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const { account } = useFarcaster();

  const handleClick = async () => {
    if (!account) {
      alert("Connect your Farcaster wallet first!");
      return;
    }

    setLoading(true);
    try {
      // create client connected to Base chain
      const client = createWalletClient({
        account: account,
        chain: base,
        transport: custom
      });

      // pick 5 random contracts
      const selected = [];
      const copyContracts = [...CONTRACTS];
      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * copyContracts.length);
        selected.push(copyContracts[idx]);
        copyContracts.splice(idx, 1);
      }

      // send transaction to executor
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
    <button
      onClick={handleClick}
      disabled={loading}
      style={{ padding: "1rem 2rem", fontSize: "1rem", cursor: "pointer", marginTop: "1rem" }}
    >
      {loading ? "Sending..." : "⚡ Signal"}
    </button>
  );
}
