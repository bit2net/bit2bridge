import { cn } from "@/lib/utils";
import BridgeForm from "./bridge-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Bridge({ className }: { className?: string }) {
  return (
    <Tabs
      defaultValue="account"
      className={cn(
        "w-screen pointer-events-auto lg:max-w-lg bg-transparent text-brand-950 rounded-lg shadow-lg dark:text-bg-brand-50 dark:bg-brand-950",
        className,
      )}
    >
      <TabsList className="w-full" defaultValue={"deposit"}>
        <TabsTrigger className="w-full" value="deposit">
          Deposit
        </TabsTrigger>
        <TabsTrigger className="w-full" value="withdraw">
          Withdraw
        </TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <Card>
          <CardContent>
            <BridgeForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="withdraw">
        <Card>
          <CardContent>
            <span>WIP🚧</span>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
