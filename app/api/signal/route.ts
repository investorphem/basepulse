import { NextResponse } from "next/server";
import { EXECUTOR_ADDRESS, INTERACTION_CONTRACTS } from "@/lib/contracts";
import { pickRandomFive } from "@/lib/random";
import { EXECUTOR_ABI } from "@/lib/abi";

export async function POST() {
  const selected = pickRandomFive(INTERACTION_CONTRACTS);

  return NextResponse.json({
    chainId: "eip155:8453", // Base
    method: "eth_sendTransaction",
    params: {
      to: EXECUTOR_ADDRESS,
      data: {
        abi: EXECUTOR_ABI,
        functionName: "execute",
        args: [selected],
      },
    },
  });
}
