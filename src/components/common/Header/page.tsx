'use client'

import Logo from "@/components/assets/Logo";
import useWindowSize from "@/components/utils/SizeWindow";
import Link from "next/link";

export default function Header() {
    const window = useWindowSize();

    return(
        <header id="header" className="w-full h-[7em] flex justify-between px-4 bg-black z-20">
            <div className="h-full w-[10%] flex justify-center items-center">
                <Logo width={80} height={80} color="#ffffff" />
            </div>
            {window.width > 768 && (
                <>
                    <nav className="h-full flex justify-center items-center">
                        <ul className="flex gap-4 delay-50 text-lg font-semibold">
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition delay-50 cursor-pointer px-2 ">
                                <Link href="/inicio">Home</Link>
                            </li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">Sobre</li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">Visitas guiadas</li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">Roteiros</li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">Aulas online</li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                                <Link href="/midia">Midia</Link>
                            </li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li className="border-b-[2.5px] border-transparent hover:opacity-80 hover:border-green-700 ease-in transition cursor-pointer px-2 ">Contato</li>
                        </ul>
                    </nav>
                    <div className="h-full w-[10%] flex justify-center items-center">
                        <button className="border-2 border-green-700 hover:bg-green-700 ease-in transition p-3 rounded-xl text-white font-semibold">
                            Fale conosco
                        </button>
                    </div>
                </>
            )}
        </header>
    )
}