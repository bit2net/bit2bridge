"use client";
import { useEffect } from "react";
import { useBridgeStore } from "@/stores/use-bridge-store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import { superbridgeAddress } from "@/lib/contracts";
import { sepolia } from "viem/chains";
import { superbridgeAbi } from "@/lib/abi/superbridgeAbi";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/lib/icons";
import { formatEther } from "viem";
import { bit2_testnet } from "@/lib/bit2-testnet";

export const SepoliaToBit2BridgeModal = () => {
  const {
    isSepoliaToBit2Bridging,
    setIsSepoliaToBit2Bridging,
    recipient,
    wwbtcsAmount,
  } = useBridgeStore();
  const { address } = useAccount();
  const { toast } = useToast();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        setIsSepoliaToBit2Bridging(false);
        toast({
          description:
            "Bridged successfully. It may take 3-5 minutes to reflect in your wallet.",
        });
      },
    },
  });

  useEffect(() => {
    const bridge = async () => {
      let to = recipient;
      if (!to) {
        if (!address) {
          toast({
            variant: "destructive",
            description: "Please connect your wallet",
          });
          setIsSepoliaToBit2Bridging(false);
          return;
        }
        to = address;
      }

      if (!wwbtcsAmount) {
        toast({
          variant: "destructive",
          description: "Please enter an amount",
        });
        setIsSepoliaToBit2Bridging(false);
        return;
      }
      switchChain({ chainId: sepolia.id });

      const txHash = await writeContractAsync({
        address: superbridgeAddress,
        abi: superbridgeAbi,
        functionName: "depositERC20Transaction",
        args: [to, wwbtcsAmount, wwbtcsAmount, 21016n, false, "0x"],
        chainId: sepolia.id,
      });

      toast({ description: "Switching chain to bit2." });

      switchChain({ chainId: bit2_testnet.id });
    };

    if (isSepoliaToBit2Bridging === true) {
      bridge();
    }
  }, [
    isSepoliaToBit2Bridging,
    recipient,
    wwbtcsAmount,
    address,
    setIsSepoliaToBit2Bridging,
    toast,
    writeContractAsync,
  ]);

  return (
    <AlertDialog open={isSepoliaToBit2Bridging}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bridging...</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div>Recipient: {recipient}</div>
          <div>
            Amount: {wwbtcsAmount ? formatEther(wwbtcsAmount) : "Not specified"}
          </div>
          <div>
            <Icons.loading className="h-12 w-12 animate-spin" />
          </div>
        </div>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
