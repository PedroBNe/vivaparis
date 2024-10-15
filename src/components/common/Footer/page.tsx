"use client";

import Facebook from "@/assets/Face";
import Instagram from "@/assets/Insta";
import WhatsApp from "@/assets/Whats";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
50;
const gradientVariants = {
  gradient1: { background: "linear-gradient(to right, #055647, #db6e4e)" },
  gradient2: { background: "linear-gradient(to right, #db6e4e, #f3b6b6)" },
  gradient3: { background: "linear-gradient(to right, #f3b6b6, #c59bc7)" },
  gradient4: { background: "linear-gradient(to right, #c59bc7, #f2c261)" },
  gradient5: { background: "linear-gradient(to right, #f2c261, #ddc1b6)" },
  gradient6: { background: "linear-gradient(to right, #ddc1b6, #055647)" },
};

type Info = {
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function Footer() {
  const [currentGradient, setCurrentGradient] = useState("gradient1");
  const [info, setInfo] = useState<Info | null>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => {
        const gradientKeys = Object.keys(gradientVariants);
        const currentIndex = gradientKeys.indexOf(prev);
        return gradientKeys[(currentIndex + 1) % gradientKeys.length];
      });
    }, 3000); // Altere o gradiente a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <footer className="mt-[-80px] h-[1000px] lg:h-[600px] w-full flex items-center justify-center text-white">
      <motion.div
        className="w-full h-full flex flex-col justify-center items-center relative z-10"
        variants={gradientVariants}
        animate={currentGradient}
        transition={{ duration: 2 }}
      >
        <div className="w-full h-[50%] lg:h-[50%] md:w-[80%] flex flex-col lg:flex-row gap-10 justify-between items-center relative">
          <ul className="w-fit h-full flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 text-lg font-semibold">
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/inicio">Inicio</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/sobre">Sobre</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/visitas">Visitas</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/aulas">Aulas</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/midia">Midia</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
          <ul className="w-fit h-full flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 text-lg">
            <li>{info?.email}</li>
            <li>{info?.phoneNumber}</li>
            <li>{info?.address}</li>
          </ul>
          <ul className="w-fit h-full flex flex-col justify-center lg:justify-start items-center lg:items-start gap-5 text-lg font-semibold">
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/lgpd">Política de Privacidade e Cookies</Link>
            </li>
          </ul>
          <ul className="w-fit h-full flex lg:flex-col justify-center lg:justify-start items-center lg:items-start gap-5">
            <li className="border-[2px] border-white hover:bg-green-500 p-1 rounded-lg transition ease-in delay-50">
              <a href={info?.whatsapp} target="__blanc">
                <WhatsApp width={28} height={28} color={"#ffffff"} />
              </a>
            </li>
            <li className="border-[2px] border-white hover:bg-[#F20267] p-1 rounded-lg transition ease-in delay-50">
              <a href={info?.facebook} target="__blanc">
                <Instagram width={28} height={28} color={"#ffffff"} />
              </a>
            </li>
            <li className="border-[2px] border-white hover:bg-blue-500 p-1 rounded-lg transition ease-in delay-50">
              <a href={info?.instagram} target="__blanc">
                <Facebook width={28} height={28} color={"#ffffff"} />
              </a>
            </li>
          </ul>
        </div>
        <span className="absolute bottom-0 text-sm">
          &copy;VivaParis 2024 Todos os direitos reservados
        </span>
      </motion.div>
    </footer>
  );
}
