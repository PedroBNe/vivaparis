"use client";

import React from "react";
import Link from "next/link";

export default function Dashboard({

}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto pb-4 flex text-black bg-[var(--background)] relative z-20">
      <nav className="w-[300px] flex justify-center bg-black rounded-r-xl text-white">
        <div className="w-full flex flex-col items-center text-start font-bold gap-4 m-4">
          <Link
            href={``}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Blog Posts
          </Link>
          <Link
            href={`/dashboard/aula`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Aulas online
          </Link>
          <Link
            href={`/dashboard/midia`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Na Midia
          </Link>
          <Link
            href={`/dashboard/home`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Home
          </Link>
          <Link
            href={``}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Contato
          </Link>
        </div>
      </nav>
      <div className="w-full m-5 flex flex-col gap-10 items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </div>
    </div>
  );
}
