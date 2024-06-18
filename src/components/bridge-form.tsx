"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useAccount, useWriteContract } from "wagmi";
import { zapAbi as abi } from "@/lib/abi/zap";
import { zapperAddress } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";
import { parseEther } from "viem";

// Zod schema definition
const schema = z.object({
  fromToken: z.string(),
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be a positive number" })
    .min(0, { message: "Minimum amount is 0" }),
});

type BridgeFormData = z.infer<typeof schema>;

const BridgeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BridgeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fromToken: "eth",
      amount: 0,
    },
  });
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  const { address } = useAccount();

  const onSubmit = (data: BridgeFormData) => {
    console.log(data);
    const { fromToken, amount } = data;

    if (!address) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet to continue.",
      });
      return;
    }

    if (fromToken === "wbtc") {
      toast({
        variant: "destructive",
        description: "WBTC is not supported yet. Try using ETH instead.",
      });
      return;
    }

    writeContract({
      abi,
      address: zapperAddress,
      functionName: "zapETH",
      value: parseEther(amount.toString()),
      args: [address],
    });
  };

  const amount = watch("amount"); // Watch the amount input to update the UI dynamically

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="from-token">From</Label>
        <Select defaultValue={"eth"} {...register("fromToken")}>
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={"eth"} placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eth">Ethereum (ETH)</SelectItem>
            <SelectItem value="wbtc">Wrapped Bitcoin (WBTC)</SelectItem>
          </SelectContent>
        </Select>
        {errors.fromToken && (
          <p className="text-red-500">{errors.fromToken.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="any"
          min={0}
          placeholder="Enter amount"
          {...register("amount")}
        />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <div className="text-gray-500 dark:text-gray-400">You will receive</div>
        <div className="font-bold">{`${amount || "0.00"} WWBTC`}</div>
      </div>
      <Button className="w-full" type="submit">
        Bridge
      </Button>
    </form>
  );
};

export default BridgeForm;
