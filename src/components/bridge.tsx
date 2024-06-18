import { cn } from "@/lib/utils";
import BridgeForm from "./bridge-form";

export default function Bridge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-screen lg:max-w-lg p-6 bg-brand-50 rounded-lg shadow-lg dark:bg-gray-950",
        className,
      )}
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">the bridge to bit2</h1>
        <p className="text-gray-500 dark:text-gray-400"></p>
        <BridgeForm />
      </div>
    </div>
  );
}
