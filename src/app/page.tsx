import Bridge from "@/components/bridge";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-brand-400 p-24 relative">
      <Header />
      <div className="flex items-center justify-center absolute inset-0 pointer-events-none">
        <Bridge className="pointer-events-auto" />
      </div>
    </main>
  );
}
