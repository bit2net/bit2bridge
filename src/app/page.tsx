import Bridge from "@/components/bridge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TipCard } from "@/components/tip-card";
import BridgeIcon from "@/components/bridge-icon";

export default function Home() {
  return (
    <>
      <main className="z-10 flex min-h-screen w-screen flex-col items-center justify-between p-24 relative">
        <Header />
        <div className="flex flex-col space-y-2 items-center justify-center w-full pointer-events-none">
          <TipCard />
          <Bridge />
        </div>
        <Footer />
      </main>
      <div className="absolute bottom-0 h-screen w-screen right-0 left-0 overflow-clip">
        <BridgeIcon className="text-black" />
      </div>
    </>
  );
}
