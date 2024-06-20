"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/lib/siteConfig";
import { env } from "@/env.mjs";
import { bit2_testnet } from "@/lib/bit2-testnet";

const config = getDefaultConfig({
  appName: siteConfig.title,
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains: [mainnet, sepolia, bit2_testnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletProvider;
