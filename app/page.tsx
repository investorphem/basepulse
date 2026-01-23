"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import SignalButton from "./components/SignalButton";

export default function Page() {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      // 1. Initialize the SDK and signal that the app is ready to display
      await sdk.actions.ready();
      
      // 2. Fetch the current Farcaster context (user data, etc.)
      const ctx = await sdk.context;
      setContext(ctx);
      setIsSdkReady(true);
    };

    load();
  }, []);

  if (!isSdkReady) {
    return <div>Loading BasePulse...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      <h1>BasePulse Miniapp</h1>
      <p>Logged in as: {context?.user?.displayName || "Farcaster User"}</p>
      <p>Tap below to signal onchain interactions.</p>

      {/* The SDK handles connection natively; SignalButton should manage its own wallet logic */}
      <SignalButton />
    </div>
  );
}
