import { Icons } from "@/lib/icons";
import { siteConfig } from "@/lib/siteConfig";

export const Footer = () => {
  return (
    <div className="absolute bottom-0 w-screen flex flex-row items-center justify-between px-2 py-2">
      <div>
        <p className="">accelerate with b2</p>
      </div>
      <div className="flex flex-row space-x-2">
        <a
          href={siteConfig.homepage}
          target="_blank"
          rel="noopenner noreferrer"
          className="hover:scale-105 hover:bg-stone-50/10 rounded-full p-1"
        >
          <Icons.home className="text-white h-6	w-6" />
          <span className="sr-only">Home</span>
        </a>
        <a
          href={siteConfig.twitterUrl}
          target="_blank"
          rel="noopenner noreferrer"
          className="hover:scale-105 hover:bg-stone-50/10 rounded-full p-1"
        >
          <Icons.twitter className="text-white h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </a>
      </div>
    </div>
  );
};
