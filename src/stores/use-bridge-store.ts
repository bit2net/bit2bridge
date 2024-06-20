import { create } from "zustand";

interface BridgeStore {
  fromToken: string;
  amount: string;
  isMainnetBridging: boolean;
  isSepolitaBit2Bridging: boolean;
  wwbtcSepoliaBalance: string;
  setFromToken: (token: string) => void;
  setAmount: (amount: string) => void;
  isApproving: boolean;
  setIsApproving: (isApproving: boolean) => void;
  setIsMainnetBridging: (isMainnetBridging: boolean) => void;
  setIsSepolitaBit2Bridging: (isSepolitaBit2Bridging: boolean) => void;
  setWwbtcSepoliaBalance: (balance: string) => void;
}

export const useBridgeStore = create<BridgeStore>((set) => ({
  fromToken: "eth",
  amount: "",
  isMainnetBridging: false,
  isSepolitaBit2Bridging: false,
  wwbtcSepoliaBalance: "0",
  setFromToken: (token) => set({ fromToken: token }),
  setAmount: (amount) => set({ amount }),
  isApproving: false,
  setIsApproving: (isApproving) => set({ isApproving }),
  setIsMainnetBridging: (isMainnetBridging) => set({ isMainnetBridging }),
  setIsSepolitaBit2Bridging: (isSepolitaBit2Bridging) =>
    set({ isSepolitaBit2Bridging }),
  setWwbtcSepoliaBalance: (balance) => set({ wwbtcSepoliaBalance: balance }),
}));
