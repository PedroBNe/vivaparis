"use client";

import React from "react";
import Link from "next/link";

export default function Dashboard({

}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen pb-4 flex text-black bg-[var(--background)] relative z-20">
      <nav className="w-[300px] flex justify-center bg-black rounded-r-xl text-white">
        <div className="w-full flex flex-col items-center text-start font-bold gap-4 m-4">
          <Link
            href={`/dashboard/about`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Sobre
          </Link>
          <Link
            href={`/dashboard/blog`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Blog
          </Link>
          <Link
            href={`/dashboard/category`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Categoria
          </Link>
          <Link
            href={`/dashboard/info`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Informação
          </Link>
          <Link
            href={`/dashboard/midia`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Na Midia
          </Link>
          <Link
            href={`/dashboard/navbar`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Barra de navegação
          </Link>
          <Link
            href={`/dashboard/onlineclass`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Aulas online
          </Link>
          <Link
            href={`/dashboard/visit`}
            className="w-full h-fit border-2 border-slate-600 p-3 rounded-lg hover:bg-slate-600 transition delay-75"
          >
            Visitas
          </Link>
        </div>
      </nav>
      <div className="w-full m-5 flex flex-col gap-10 items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </div>
    </div>
  );
}
