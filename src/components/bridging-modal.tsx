import { useBridgeStore } from "@/stores/use-bridge-store";

export const MainnetToSepoliaModal = () => {
  const { isMainnetBridging } = useBridgeStore();

  if (!isMainnetBridging) return null;

  return (
    <div className="modal">
      <h2>Bridging from Mainnet to Sepolia</h2>
      <p>Progress: In progress...</p>
      {/* Add more details or a progress bar here */}
    </div>
  );
};
