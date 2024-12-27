"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount, useWriteContract } from "wagmi";
import { hyperc20Abi as abi } from "@/lib/abi/hyperc20";
import { useToast } from "@/components/ui/use-toast";
import { parseEther, pad } from "viem";
import { mainnet } from "viem/chains";
import { wwbtcsSepoliaAddress } from "@/lib/contracts";

const WithdrawForm = () => {
  const [amount, setAmount] = React.useState("");
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();
  const { address } = useAccount();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (parseFloat(amount) === 0) {
        toast({
          variant: "destructive",
          description: "Please enter an amount greater than 0.",
        });
        return;
      }

      if (!address) {
        toast({
          variant: "destructive",
          description: "Please connect your wallet to continue.",
        });
        return;
      }

      try {
        const paddedAddress = pad(address, { size: 32 });

        toast({
          description: `Transferring to ${paddedAddress} on mainnet (1)`,
        });

        const txHash = await writeContractAsync({
          abi,
          address: wwbtcsSepoliaAddress,
          functionName: "transferRemote",
          args: [1, paddedAddress, parseEther(amount)],
          chainId: mainnet.id,
        });

        toast({
          description: "Withdraw transaction submitted successfully! " + txHash,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast({
          variant: "destructive",
          description: `Withdraw failed: ${message}`,
        });
      }
    },
    [amount, address, writeContractAsync, toast],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pointer-events-auto">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="any"
          min={0}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button className="w-full" type="submit">
        Withdraw
      </Button>
    </form>
  );
};

export default WithdrawForm;
