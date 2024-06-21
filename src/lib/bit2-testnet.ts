import { env } from "@/env.mjs";
import { type Chain } from "@rainbow-me/rainbowkit";

export const bit2_testnet = {
  id: 222222,
  name: "bit2",
  iconUrl: "/logo.png",
  nativeCurrency: { name: "Wrapped Bitcoin", symbol: "WWBTCS", decimals: 18 },
  rpcUrls: {
    default: { http: [env.NEXT_PUBLIC_BIT2_RPC] },
  },
  blockExplorers: {
    default: { name: "Blockscan", url: "https://explorer.bit2.network" },
  },
  contracts: {
    multicall3: {
      address: "0x455CfAa64b706BC0534bd08B9570aE7CbDDd7a0F",
      blockCreated: 147340,
    },
  },
  testnet: false,
} as const satisfies Chain;
