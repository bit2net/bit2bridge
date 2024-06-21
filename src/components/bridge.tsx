"use client";
import { cn } from "@/lib/utils";
import BridgeForm from "./bridge-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sepolia } from "viem/chains";
import { wwbtcsSepoliaAddress } from "@/lib/contracts";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { useBridgeStore } from "@/stores/use-bridge-store";
import { ApprovalModal } from "./approval-modal";
import { MainnetToSepoliaModal } from "./mainnet-to-sepolia-bridge-modal";
import { SepoliaToBit2BridgeModal } from "./sepolia-to-bit2-bridge-modal";
import { useToast } from "./ui/use-toast";

export default function Bridge({ className }: { className?: string }) {
  const { address } = useAccount();
  const { data: wwbtcsSepoliaBalance, refetch: getWwbtcsSepoliaBalance } =
    useTokenBalance({
      token: wwbtcsSepoliaAddress,
      owner: address,
      chainId: sepolia.id,
    });
  const { toast } = useToast();
  const setIsSepoliaToBit2Bridging = useBridgeStore(
    (state) => state.setIsSepoliaToBit2Bridging,
  );
  const isSepoliaToBit2Bridging = useBridgeStore(
    (state) => state.isSepoliaToBit2Bridging,
  );
  const setWwbtcsAmount = useBridgeStore((state) => state.setWwbtcsAmount);
  const setRecipient = useBridgeStore((state) => state.setRecipient);

  const bridgeFromSepoliaToBit2 = async () => {
    let amount = wwbtcsSepoliaBalance;
    if (!amount) {
      const { data } = await getWwbtcsSepoliaBalance();
      if (!data) {
        toast({
          variant: "destructive",
          description: "Failed to get WWBTCS balance",
        });
        return;
      }
      amount = data;
    }

    if (amount === 0n) {
      toast({
        variant: "destructive",
        description: "You have no WWBTCS to bridge",
      });
      return;
    }

    if (!address) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      return;
    }

    if (amount) {
      setWwbtcsAmount(amount);
      setRecipient(address);
      setIsSepoliaToBit2Bridging(true);
    }
  };

  return (
    <>
      <div>
        <Tabs
          defaultValue={"deposit"}
          className={cn(
            "w-screen pointer-events-auto lg:max-w-lg bg-transparent text-brand-950 rounded-lg shadow-lg dark:text-bg-brand-50 dark:bg-brand-950",
            className,
          )}
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="deposit">
              Deposit
            </TabsTrigger>
            <TabsTrigger className="w-full" value="withdraw">
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <Card>
              <CardHeader className="h-6 p-0"></CardHeader>
              <CardContent>
                <BridgeForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="withdraw">
            <Card>
              <CardHeader className="h-6 p-0"></CardHeader>
              <CardContent>
                <span>WIP🚧</span>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {wwbtcsSepoliaBalance &&
        wwbtcsSepoliaBalance > 0n &&
        isSepoliaToBit2Bridging === false ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your balance</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm">
                You have {formatEther(wwbtcsSepoliaBalance)} WWBTCS in your
                wallet.
                <button
                  onClick={async () => await bridgeFromSepoliaToBit2()}
                  className="mx-1 pointer-events-auto text-brand-500 hover:underline"
                >
                  Bridge now.
                </button>
              </span>
            </CardContent>
          </Card>
        ) : null}
      </div>
      <ApprovalModal />
      <MainnetToSepoliaModal />
      <SepoliaToBit2BridgeModal />
    </>
  );
}
