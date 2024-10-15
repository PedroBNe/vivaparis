/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import useWindowSize from "@/utils/SizeWindow";
import Link from "next/link";
import Menu from "@/assets/Menu";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

type Info = {
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function Header() {
  const [isHidden, setIsHidden] = React.useState(true);
  const window = useWindowSize();
  const [info, setInfo] = useState<Info | null>(null);

  const handleScroll = () => (document.body.style.position = "sticky"); // Can scroll down

  const handleNoScroll = () => (document.body.style.position = "fixed"); // Can not scroll down

  const fetchInfo = async () => {
    try {
      const res = await fetch('/api/info');
      if (!res.ok) throw new Error(`Erro ao buscar Info: ${res.status}`);

      const data = await res.json();
      setInfo(data);
    } catch (err) {
      console.error('Erro ao buscar Info:', err);
    }
  };

  // Chama a função ao carregar o componente
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <header
      id="header"
      className="w-full h-[7em] flex justify-center items-center px-4 bg-transparent border-b-[1px] border-gray-600 z-20 mb-3 relative"
    >
      <div className="h-full w-fit flex justify-center items-center absolute left-[15px]">
        <Image src={info?.logo || Logo} alt="logo" width={140} height={140} />
      </div>
      {window.width > 1024 && (
        <nav className="w-[75%] h-full flex justify-center items-center text-black absolute right-[35px]">
          <ul className="w-full flex justify-between delay-50 text-lg font-semibold">
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition delay-50 cursor-pointer px-2 ">
              <Link href="/Home">Home</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href={"/sobre"}>Sobre</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href="/visitas">Visitas</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href="">Roteiros</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href={"/aulas"}>Aulas online</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href="/midia">Na Mídia</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </nav>
      )}
      {window.width <= 1024 && (
        <>
          <div className="h-full w-full flex justify-center items-center text-xl right-0 relative z-30">
            <button
              className="text-black px-2 absolute right-1 text-3xl"
              onClick={() => {
                setIsHidden(false), handleNoScroll();
              }}
            >
              <Menu width={35} height={35} />
            </button>{" "}
            {/* Open Menu Button */}
            <div
              className={`fixed z-30 justify-center items-center h-screen w-screen bg-white left-0 top-0 overflow-hidden ${isHidden ? "hidden" : "flex"}`}
            >
              <nav className="relative w-[90%] h-[80%] text-black">
                <button
                  className="absolute top-2 right-2 text-black font-bold text-3xl"
                  onClick={() => {
                    setIsHidden(true), handleScroll();
                  }}
                >
                  x
                </button>{" "}
                {/* Close Menu Button */}
                <ul className="flex h-full flex-col gap-4 delay-50 text-lg font-semibold justify-center items-center">
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition delay-50 cursor-pointer px-2 ">
                    <Link
                      href="/inicio"
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href={"#sobre"}
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Sobre
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href="/visitas"
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Visitas
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href=""
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Roteiros
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href={"/aulas"}
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Aulas online
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href="/midia"
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Na Mídia
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href="/blog"
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link
                      href="/contato"
                      onClick={() => {
                        setIsHidden(true);
                      }}
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
