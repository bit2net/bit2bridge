"use client";
import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";

interface UseTokenBalanceParams {
  token?: Address;
  owner?: Address;
  chainId?: number;
}

export const useTokenBalance = ({
  token,
  owner,
  chainId,
}: UseTokenBalanceParams) => {
  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
    chainId: chainId ?? 1,
  });
};
