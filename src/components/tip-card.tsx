"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";

export function TipCard() {
  const [isShow, setIsShow] = useState(true);

  if (isShow === false) {
    return null;
  }

  return (
    <Card
      className={
        "w-screen rounded-2xl lg:max-w-lg p-2 flex flex-row min-h-[10vh] bg-brand-50 shadow-lg dark:bg-brand-950 relative"
      }
    >
      <div className="absolute flex items-end top-0 justify-between flex-col right-0">
        <button
          onClick={() => setIsShow(false)}
          className="flex items-center pointer-events-auto p-1 justify-center w-5 h-5 m-2 rounded-full bg-red-200 hover:ring-2 focus:ring-2 ring-red-300"
        >
          <Icons.close className="w-4 h-4 text-stone-950" />
        </button>
      </div>
      <div>
        <h3 className="font-bold">Tip of the Day</h3>
        <p className="text-sm">Lorem ipsum</p>
      </div>
    </Card>
  );
}
