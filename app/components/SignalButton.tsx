"use client";

import { useState } from "react";
import { useFarcaster } from "@farcaster/miniapp-sdk";

export default function SignalButton() {
  const [loading, setLoading] = useState(false);
  const { account } = useFarcaster(); // currently connected wallet

  const handleClick = async () => {
    if (!account) {
      alert("Please connect your Farcaster wallet first!");
      return;
    }

    setLoading(true);

    try {
      // You can replace this with your actual onchain transaction
      // For now, we'll just simulate sending a signal
      console.log("Signal sent from", account.address);

      alert(`✅ Signal sent from ${account.address}`);
    } catch (err) {
      console.error(err);
      alert("❌ Transaction failed");
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
