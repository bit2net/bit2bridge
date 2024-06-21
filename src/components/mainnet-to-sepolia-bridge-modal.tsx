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

export const MainnetToSepoliaModal = () => {
  const { isApproving } = useBridgeStore();

  if (!isApproving) return null;

  return (
    <AlertDialog open={isApproving}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approval in progress</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Icons.loading className="w-12 h-12 animate-spin" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
