"use client";

import SignalButton from "./components/SignalButton";

export default function Page() {
  return (
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/signal.png" />
        <meta property="fc:frame:button:1" content="⚡ Signal" />
        <meta property="fc:frame:post_url" content="/api/signal" />
      </head>
      <body style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <div>
          <h1>BasePulse Miniapp</h1>
          <p>Connect your wallet and tap to signal onchain interactions.</p>
          <SignalButton />
        </div>
      </body>
    </html>
  );
}
