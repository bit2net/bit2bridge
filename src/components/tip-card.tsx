"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";

export function TipCard() {
  const [isShow, setIsShow] = useState(true);

  if (isShow === false) {
    return null;
  }

  return (
    <Card className="w-screen lg:max-w-lg p-6 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsShow(false)}
        className="flex items-center hover:scale-105 focus:scale-100 justify-center absolute top-0 m-2 right-0 rounded-full bg-stone-100"
      >
        <Icons.close className="w-4 h-4 text-stone-950" />
      </Button>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Tip of the Day</h3>
          <p className="text-sm text-gray-500">Lorem ipsum</p>
        </div>
      </div>
    </Card>
  );
}
