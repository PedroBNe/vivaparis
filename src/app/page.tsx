"use client";

import { HoverImages } from "@/components/HoverImages";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const gradientVariants = {
  gradient1: { background: 'linear-gradient(to right, #055647, #db6e4e)' },
  gradient2: { background: 'linear-gradient(to right, #db6e4e, #f3b6b6)' },
  gradient3: { background: 'linear-gradient(to right, #f3b6b6, #c59bc7)' },
  gradient4: { background: 'linear-gradient(to right, #c59bc7, #f2c261)' },
  gradient5: { background: 'linear-gradient(to right, #f2c261, #ddc1b6)' },
  gradient6: { background: 'linear-gradient(to right, #ddc1b6, #055647)' },
};

export default function Home() {

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

  return (
    <div className="w-[100% - 80px] mx-auto flex justify-center flex-col items-center">
      <HoverImages />
      <div className="h-[1250px] w-full flex justify-end flex-col items-center">
        <div className="flex gap-10 justify-between items-center my-20">
          <div>
            <Avatar className="w-60 h-60">
              <AvatarImage src="https://img.freepik.com/fotos-gratis/torre-eiffel-paris-melhores-destinos-na-europa_268835-969.jpg?w=740&t=st=1726510205~exp=1726510805~hmac=0d3a5a3c6b805316b26a892a153370494b3ebf23e5e0a62b36832cae8fcdb190" alt="@shadcn" />
            </Avatar>
          </div>
          <div className="max-w-[500px]">
            <h1 className="font-bold text-4xl text-green-700">Quem sou eu ?</h1>
            <p className="text-black">Texto sobre Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus in nesciunt nulla eveniet unde eius aliquam consequatur adipisci. Illum nam distinctio id perferendis accusantium eius fugit nisi, accusamus neque commodi.</p>
            <button className="p-2 rounded-md bg-green-500 text-white font-semibold">Conheça sobre!</button>
          </div>
        </div>
      </div>
      <div className="bg-[#FBFBFB] rounded-b-[80px] w-full flex flex-col items-center justify-center z-10">
        <div>
          <h1>TExotekjlanwdla</h1>
          <p>Subtiouiadsodadks</p>
        </div>
        <div>
          <div>Imagem</div>
          <button>Botão</button>
        </div>
        <div>
          <h1>FORM</h1>
          <p>textoform</p>
        </div>
      </div>
      <motion.div
        className="mt-[-80px] h-[600px] w-full flex items-center justify-center text-white"
        variants={gradientVariants}
        animate={currentGradient}
        transition={{ duration: 2 }}
      >
        <h1 className="text-4xl">Gradiente Dinâmico com Tailwind e Framer Motion</h1>
      </motion.div>
    </div >
  );
}
