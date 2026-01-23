"use client";

import SignalButton from "./components/SignalButton";
import { FarcasterProvider, useFarcaster } from "@farcaster/miniapp-sdk";

export default function Page() {
  return (
    <FarcasterProvider>
      <AppContent />
    </FarcasterProvider>
  );
}

function AppContent() {
  const { isConnected, connect } = useFarcaster();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      <h1>BasePulse Miniapp</h1>
      <p>Connect your Farcaster wallet and tap to signal onchain interactions.</p>

      {!isConnected ? (
        <button onClick={connect} style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
          Connect Farcaster Wallet
        </button>
      ) : (
        <SignalButton />
      )}
    </div>
  );
}
