"use client";

import React from "react";
import Link from "next/link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen pb-4 flex text-black bg-[var(--background)] relative z-20">
      <div className="w-full m-5 flex flex-col gap-10 items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </div>
    </div>
  );
}
