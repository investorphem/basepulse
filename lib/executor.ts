export const EXECUTOR_ADDRESS = "0x68Ec3260171F3609bc68Dff81A14fd168A7bf1A1" as const;

export const EXECUTOR_ABI = [
  {
    inputs: [{ internalType: "address[]", name: "targets", type: "address[]" }],
    name: "executeRandom", // Changed from executeAll
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;
