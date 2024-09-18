"use client";

import { HoverImages } from "@/components/HoverImages";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Image from "next/image";

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
    AOS.init({
      mirror: true, 
    });

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
      <div className="bg-[#FBFBFB] rounded-b-[80px] w-full h-[195em] flex flex-col gap-[80px] items-center justify-between p-[80px] z-10">
        <h2 className="flex text-4xl text-[#055647] font-semibold">
          <p 
          data-aos="fade-right"
          data-aos-duration="900"
          >
            Mu
          </p>
          <p 
          data-aos="fade-up"
          data-aos-duration="900"
          >
            se
          </p>
          <p 
          data-aos="fade-left"
          data-aos-duration="900"
          >
            us
          </p>
        </h2>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#f3b6b6]" data-aos="fade-left" data-aos-duration="900">Museu do Louvre – Clássico</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div className="max-w-[500px] flex flex-col justify-center  items-center gap-3">
            <h1 className="font-bold text-4xl text-[#c59bc7]" data-aos="fade-right" data-aos-duration="900">Museu do Louvre – Egito</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center  items-center gap-3">
            <h1 className="font-bold text-4xl text-[#f2c261]" data-aos="fade-left" data-aos-duration="900">Museu do Louvre p/ crianças</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#ddc1b6]" data-aos="fade-right" data-aos-duration="900">Museu d’Orsay</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.bing.com/th?id=OADD2.8452591962238_1W7IQLFEC9B74EQ7HS&pid=21.2&c=16&roil=0&roit=0&roir=1&roib=1&w=472&h=247&rs=2&qlt=100" alt="museu-louvre" width={600} height={600} />
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://cdn.sortiraparis.com/images/80/107318/1087967-le-decor-du-defile-dior-haute-couture-automne-hiver-2024-2025-au-musee-rodin-image00001.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center  items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-left" data-aos-duration="900">Museu Rodin</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
      </div>
      <div className="rounded-b-[80px] w-full h-[230em] flex flex-col gap-[80px] items-center justify-between p-[80px] z-10">
        <h2 className="flex text-4xl text-[#055647] font-semibold">
          <p 
          data-aos="fade-right"
          data-aos-duration="900"
          >
            R
          </p>
          <p 
          data-aos="fade-up-right"
          data-aos-duration="900"
          >
            u
          </p>
          <p 
          data-aos="fade-up-left"
          data-aos-duration="900"
          >
            a
          </p>
          <p 
          data-aos="fade-left"
          data-aos-duration="900"
          >
            s
          </p>
        </h2>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-right" data-aos-duration="900">Montmartre</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.tripsavvy.com/thmb/g8mHCcJkvnaulQhxJcnmpL4xkug=/3000x2000/filters:fill(auto,1)/GettyImages-532063893-57bed7bf3df78cc16eefdf98.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.paristouristinformation.fr/fr/wp-content/uploads/2021/01/Ile-de-la-Cite-of-Pariss-top-attractions.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-left" data-aos-duration="900">Île de la Cité</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center">
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-right" data-aos-duration="900">Quartier Latin</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.tout-paris.org/wp-content/uploads/2021/12/15-choses-a-voir-au-quartier-latin-de-Paris-1000x675.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center pb-16">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://th.bing.com/th/id/R.c4fb700d7ff904819bbd971ecd99ff5a?rik=vcg8Xn%2br9pz1MQ&pid=ImgRaw&r=0" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-left" data-aos-duration="900">Le Marais</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center pb-16">
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-right" data-aos-duration="900">Eixos Historicos da Franca</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.rodei.com.br/wp-content/uploads/2013/01/La-Defense-05-1160x769.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
        </div>
        <div className="w-[70%] flex gap-[150px] justify-between items-center pb-16">
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.worldbyisa.com/wp-content/uploads/2017/08/22583324985_8f9cb20809_k.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-start items-start gap-3">
            <h1 className="font-bold text-4xl text-[#055647]" data-aos="fade-left" data-aos-duration="900">Ruas da Revolução Francesa</h1>
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="900">Saiba mais</button>
          </div>
        </div>
      </div>
      <div className="bg-[#FBFBFB] rounded-b-[80px] w-full h-[50em] flex flex-col gap-[80px] items-center justify-around p-[80px] z-10">
        <h2 className="flex gap-3 text-4xl text-[#055647] font-semibold">
          <div className="flex">
            <p 
            data-aos="fade-right"
            data-aos-duration="400"
            >
              Pa
            </p>
            <p 
            data-aos="fade-right"
            data-aos-duration="500"
            >
              la
            </p>
            <p 
            data-aos="fade-right"
            data-aos-duration="600"
            >
              cio
            </p>
          </div>
          <div className="flex">
            <p 
            data-aos="fade-up"
            data-aos-duration="900"
            >
              de
            </p>
          </div>
          <div className="flex">
            <p 
            data-aos="fade-up-right"
            data-aos-duration="900"
            >
              Ver
            </p>
            <p 
            data-aos="fade-up-left"
            data-aos-duration="900"
            >
              sa
            </p>
            <p 
            data-aos="fade-left"
            data-aos-duration="900"
            >
              lhes
            </p>
          </div>
        </h2>
        <div className="w-[70%] flex flex-col gap-6 justify-between items-center">
          <div data-aos="fade-up" data-aos-duration="8  00">
            <Image className="rounded-xl" src="https://th.bing.com/th/id/OIP.t46VHszcIqSMCJuhvA9Q6gHaEO?rs=1&pid=ImgDetMain" alt="museu-louvre" width={700} height={700} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button className="w-fit p-3 rounded-md bg-green-500 text-white font-semibold" data-aos="fade-up" data-aos-duration="1000">Saiba mais</button>
          </div>
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
