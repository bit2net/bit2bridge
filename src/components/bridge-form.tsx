"use client";

import React, { useCallback } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  useAccount,
  useWriteContract,
  useBalance,
  useSwitchChain,
} from "wagmi";
import { zapAbi as abi } from "@/lib/abi/zap";
import { wbtcAddress, zapperAddress } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";
import { useGetAllowance } from "@/hooks/use-get-allowance";
import { erc20Abi, formatEther, parseEther } from "viem";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useBridgeStore } from "@/stores/use-bridge-store";
import { mainnet } from "viem/chains";
import { MAX_UINT256 } from "@/lib/constants";

const BridgeForm = () => {
  const {
    fromToken,
    amount,
    setFromToken,
    setAmount,
    setIsApproving,
    setIsMainnetBridging,
  } = useBridgeStore();

  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();
  const { address } = useAccount();

  const { data: wbtcApprovalAmount, refetch: refetchWbtcApprovalAmount } =
    useGetAllowance({
      token: wbtcAddress,
      owner: address,
      spender: zapperAddress,
      chainId: mainnet.id,
    });

  const { data: wbtcBalance } = useTokenBalance({
    token: wbtcAddress,
    owner: address,
    chainId: mainnet.id,
  });

  const { data: ethBalance } = useBalance({
    address,
    chainId: mainnet.id,
  });

  const { switchChain } = useSwitchChain();

  const maxAmount = React.useMemo(() => {
    if (fromToken === "wbtc") {
      return wbtcBalance ? parseFloat(formatEther(wbtcBalance)) : 0;
    }
    return ethBalance ? parseFloat(formatEther(ethBalance.value)) : 0;
  }, [fromToken, wbtcBalance, ethBalance]);

  const handleApproval = useCallback(async () => {
    if (!address) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet to continue.",
      });
      return;
    }

    setIsApproving(true);
    try {
      const txHash = await writeContractAsync({
        abi: erc20Abi,
        address: wbtcAddress,
        functionName: "approve",
        args: [zapperAddress, MAX_UINT256],
        chainId: mainnet.id,
      });

      toast({ description: "Approval submitted successfully! " + txHash });
      await refetchWbtcApprovalAmount();
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Approval failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsApproving(false);
    }
  }, [
    address,
    writeContractAsync,
    toast,
    refetchWbtcApprovalAmount,
    setIsApproving,
  ]);

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
        await switchChain({
          chainId: mainnet.id,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: `Switch chain failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
        return;
      }

      if (fromToken === "wbtc") {
        let approvalAmount = wbtcApprovalAmount;
        if (!approvalAmount) {
          const { data } = await refetchWbtcApprovalAmount();
          approvalAmount = data;
          if (!approvalAmount) {
            await handleApproval();
          }
        }

        setIsMainnetBridging(true);

        try {
          const txHash = await writeContractAsync({
            abi,
            address: zapperAddress,
            functionName: "zapWBTC",
            args: [address, parseEther(amount)],
            chainId: mainnet.id,
          });

          toast({
            description:
              "Bridge to Sepolia transaction submitted successfully! " + txHash,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Unknown error";
          toast({
            variant: "destructive",
            description: `Bridge transaction failed: ${message}`,
          });
        } finally {
          return;
        }
      }

      try {
        const txHash = await writeContractAsync({
          abi,
          address: zapperAddress,
          functionName: "zapETH",
          value: parseEther(amount),
          args: [address],
          chainId: mainnet.id,
        });

        toast({
          description:
            "Bridge to Sepolia transaction submitted successfully! " + txHash,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        toast({
          variant: "destructive",
          description: `Bridge transaction failed: ` + message,
        });
      }
    },
    [
      amount,
      address,
      switchChain,
      fromToken,
      wbtcApprovalAmount,
      refetchWbtcApprovalAmount,
      handleApproval,
      setIsMainnetBridging,
      writeContractAsync,
      toast,
    ],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pointer-events-auto">
      <div className="space-y-2">
        <Label htmlFor="from-token">Token</Label>
        <Select value={fromToken} onValueChange={setFromToken}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
            <SelectItem value="wbtc">Wrapped Bitcoin (WBTC)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="any"
          min={0}
          max={maxAmount}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <div className="text-gray-500 dark:text-gray-400">You will receive</div>
        <div className="font-bold">{`${amount || "0.00"} WWBTC`}</div>
      </div>
      {fromToken === "wbtc" &&
      wbtcApprovalAmount !== undefined &&
      wbtcApprovalAmount < parseEther(amount || "0") ? (
        <Button className="w-full" type="button" onClick={handleApproval}>
          Approve
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Bridge
        </Button>
      )}
    </form>
  );
};

export default BridgeForm;
