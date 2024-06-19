import Bridge from "@/components/bridge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TipCard } from "@/components/tip-card";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-brand-400 p-24 relative">
      <Header />
      <div className="flex flex-col space-y-2 items-center justify-center absolute inset-0 pointer-events-none">
        <TipCard />
        <Bridge className="pointer-events-auto" />
      </div>
      <Footer />
    </main>
  );
}
