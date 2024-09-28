'use client'

import React from "react";
import Logo from "@/assets/Logo";
import useWindowSize from "@/utils/SizeWindow";
import Link from "next/link";
import Menu from "@/assets/Manu";

export default function Header() {
  const [ isHidden, setIsHidden ] = React.useState(true);
  const window = useWindowSize();

  return(
    <header id="header" className="w-full h-[5em] flex justify-between px-4 bg-transparent border-b-[1px] border-gray-600 z-20 shadow-2xl mb-3">
      <div className="h-full w-[10%] flex justify-center items-center">
        <Logo width={65} height={65} color="#000000" />
      </div>
      {window.width > 768 && (
        <>
          <nav className="h-full flex justify-center items-center text-black">
            <ul className="flex gap-4 delay-50 text-lg font-semibold">
              <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition delay-50 cursor-pointer px-2 ">
                <Link href="/inicio">Home</Link>
              </li>
              <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                <Link href={'#sobre'}>Sobre</Link>
              </li>
              <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                <Link href={'/aulas'}>Aulas online</Link>
              </li>
              <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                <Link href="/midia">Midia</Link>
              </li>
              <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="h-full w-[10%] flex justify-center items-center">
            <Link href={'/contato'}>
              <button className="border-2 border-green-700 hover:bg-green-700 ease-in transition p-3 px-5 rounded-xl text-black hover:text-white font-semibold text-sm">
                Contato
              </button>
            </Link>
          </div>
        </>
      )}
      {window.width <= 768 && (
        <>
          <div className="h-full flex justify-center items-center">
            <button className="text-black px-2" onClick={() => { setIsHidden(false) }}>
              <Menu width={35} height={35} />
            </button> {/* Open Menu Button */}
            <div className={`fixed justify-center items-center h-screen w-screen bg-white z-30 left-0 top-0 ${isHidden ? 'hidden' : 'flex'}`}>
              <nav className="relative w-[90%] h-[80%] text-black">
                <button className="absolute top-2 right-2 text-black font-bold text-3xl" onClick={() => { setIsHidden(true) }}>x</button> {/* Close Menu Button */}
                <ul className="flex h-full flex-col gap-4 delay-50 text-lg font-semibold justify-center items-center">
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition delay-50 cursor-pointer px-2 ">
                    <Link href="/inicio" onClick={() => { setIsHidden(true) }}>Home</Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link href={'#sobre'} onClick={() => { setIsHidden(true) }}>Sobre</Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link href={'/aulas'} onClick={() => { setIsHidden(true) }}>Aulas online</Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link href="/midia" onClick={() => { setIsHidden(true) }}>Midia</Link>
                  </li>
                  <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                    <Link href="/blog" onClick={() => { setIsHidden(true) }}>Blog</Link>
                  </li>
                  <Link href={'/contato'}>
                    <button className="bg-green-700 ease-in transition p-3 px-5 rounded-xl text-white font-semibold text-sm" onClick={() => { setIsHidden(true) }}>
                      Contato
                    </button>
                </Link>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
