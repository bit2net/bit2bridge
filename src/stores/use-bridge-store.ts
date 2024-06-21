import { Address } from "viem";
import { create } from "zustand";

interface BridgeStore {
  fromToken: string;
  amount: string;
  isMainnetBridging: boolean;
  isSepoliaToBit2Bridging: boolean;
  wwbtcSepoliaBalance: string;
  setFromToken: (token: string) => void;
  setAmount: (amount: string) => void;
  wwbtcsAmount: undefined | bigint;
  setWwbtcsAmount: (amount: bigint) => void;
  recipient: undefined | Address;
  setRecipient: (recipient: Address) => void;
  isApproving: boolean;
  setIsApproving: (isApproving: boolean) => void;
  setIsMainnetBridging: (isMainnetBridging: boolean) => void;
  setIsSepoliaToBit2Bridging: (isSepolitaBit2Bridging: boolean) => void;
  setWwbtcSepoliaBalance: (balance: string) => void;
}

export const useBridgeStore = create<BridgeStore>((set) => ({
  fromToken: "eth",
  amount: "",
  isMainnetBridging: false,
  isSepoliaToBit2Bridging: false,
  wwbtcSepoliaBalance: "0",
  setFromToken: (token) => set({ fromToken: token }),
  setAmount: (amount) => set({ amount }),
  wwbtcsAmount: undefined,
  setWwbtcsAmount: (amount) => set({ wwbtcsAmount: amount }),
  recipient: undefined,
  setRecipient: (recipient) => set({ recipient }),
  isApproving: false,
  setIsApproving: (isApproving) => set({ isApproving }),
  setIsMainnetBridging: (isMainnetBridging) => set({ isMainnetBridging }),
  setIsSepoliaToBit2Bridging: (isSepoliaToBit2Bridging) =>
    set({ isSepoliaToBit2Bridging }),
  setWwbtcSepoliaBalance: (balance) => set({ wwbtcSepoliaBalance: balance }),
}));
