"use client";
import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";

interface UseGetAllowanceParams {
  token?: Address;
  owner?: Address;
  spender?: Address;
  chainId?: number;
}

export const useGetAllowance = ({
  token,
  owner,
  spender,
  chainId,
}: UseGetAllowanceParams) => {
  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: owner && spender ? [owner, spender] : undefined,
    chainId: chainId ?? 1,
  });
};
