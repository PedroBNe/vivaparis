'use client'

import Logo from '@/assets/Logo';
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";50
const gradientVariants = {
  gradient1: { background: 'linear-gradient(to right, #055647, #db6e4e)' },
  gradient2: { background: 'linear-gradient(to right, #db6e4e, #f3b6b6)' },
  gradient3: { background: 'linear-gradient(to right, #f3b6b6, #c59bc7)' },
  gradient4: { background: 'linear-gradient(to right, #c59bc7, #f2c261)' },
  gradient5: { background: 'linear-gradient(to right, #f2c261, #ddc1b6)' },
  gradient6: { background: 'linear-gradient(to right, #ddc1b6, #055647)' },
};

export default function Footer() {
  const [currentGradient, setCurrentGradient] = useState('gradient1');

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

  return(
    <footer>
      <motion.div
        className="mt-[-80px] h-[950px] md:h-[700px] w-full flex items-center justify-center text-white relative"
        variants={gradientVariants}
        animate={currentGradient}
        transition={{ duration: 2 }}
      >
        <div className='absolute top-[100px]'>
          <Logo width={60} height={60} color={'#ffffff'} />
        </div>
        <div className='w-full h-[35%] md:h-[20%] md:w-[70%] flex flex-col md:flex-row gap-8 justify-between items-center relative'>
          <ul className="w-fit h-full flex flex-col justify-center md:justify-start items-center md:items-start gap-3 text-sm lg:text-lg font-semibold">
            <h2 className='mb-5 text-lg lg:text-xl'>Site:</h2>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/inicio#header">Inicio</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="/inicio#sobre">Sobre</Link>
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
          <ul className="w-fit h-full flex flex-col justify-center md:justify-start items-center md:items-start gap-3 text-sm lg:text-lg font-semibold">
            <h2 className='mb-5 text-lg lg:text-xl'>Contato:</h2>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">Email</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">Telefone</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">Endereco</Link>
            </li>
          </ul>
          <ul className="w-fit h-full flex flex-col justify-center md:justify-start items-center md:items-start gap-3 text-sm lg:text-lg font-semibold">
            <h2 className='mb-5 text-lg lg:text-xl'>Redes:</h2>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">WhatsApp</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">Instagram</Link>
            </li>
            <li className="hover:opacity-80 hover:underline transition ease-in">
              <Link href="">Facebook</Link>
            </li>
          </ul>
        </div>
        <span className="absolute bottom-0 text-sm">&copy;VivaParis 2024 Todos os direitos reservados</span>
      </motion.div>
    </footer>
  )
}
