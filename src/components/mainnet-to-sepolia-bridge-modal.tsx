"use client";
import { useBridgeStore } from "@/stores/use-bridge-store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/lib/icons";
import { wwbtcsSepoliaAddress } from "@/lib/contracts";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { sepolia } from "viem/chains";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useToast } from "./ui/use-toast";

export const MainnetToSepoliaModal = () => {
  const {
    isMainnetBridging,
    setIsMainnetBridging,
    setIsSepoliaToBit2Bridging,
    setRecipient,
    setWwbtcsAmount,
  } = useBridgeStore();
  const { address } = useAccount();
  const { data: wwbtcsSepoliaBalance } = useTokenBalance({
    token: wwbtcsSepoliaAddress,
    owner: address,
    chainId: sepolia.id,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (
      isMainnetBridging === true &&
      wwbtcsSepoliaBalance !== undefined &&
      wwbtcsSepoliaBalance > 0n
    ) {
      if (!address) {
        setIsMainnetBridging(false);
        toast({
          description: "Please connect your wallet to continue.",
        });
        return;
      }

      toast({
        description:
          "Seems like your WWBTCS balance on Sepolia is not zero. Time for step 2.",
      });
      setIsMainnetBridging(false);
      setWwbtcsAmount(wwbtcsSepoliaBalance);
      setRecipient(address);
      setIsSepoliaToBit2Bridging(true);
    }
  }, [
    isMainnetBridging,
    setIsSepoliaToBit2Bridging,
    setIsMainnetBridging,
    wwbtcsSepoliaBalance,
    toast,
    address,
    setRecipient,
    setWwbtcsAmount,
  ]);

  if (!isMainnetBridging) return null;

  return (
    <AlertDialog open={isMainnetBridging}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bridging to Sepolia</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Icons.loading className="w-12 h-12 animate-spin" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
