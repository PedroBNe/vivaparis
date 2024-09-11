"use client"; // Client component

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const HoverImages = () => {
  const imagesRef = useRef(null);

  useEffect(() => {

    // Crie a animação para a rolagem
    gsap.to(imagesRef.current, {

      ease: 'none',
      scrollTrigger: {
        trigger: imagesRef.current,
        start: "top center", // A animação começa quando o topo do contêiner atinge o centro da janela
        scrub: true, // Sincroniza com a rolagem
      },
    });
  }, []);

  return (
    <div className='w-full relative overflow-hidden rounded-3xl flex justify-center flex-col items-center py-4'>
      <div className='rounded-3xl w-[80%]'>
        <Image className='rounded-t-3xl' src="https://www.datocms-assets.com/106048/1708558230-woman-with-luggage-hailing-a-zoox-vehicle.jpg?crop=focalpoint&fit=crop&fp-x=0.79&fp-y=0.46&h=1128&w=1920" alt='Aqui' width={1350} height={1350} />
        <Image src="https://www.datocms-assets.com/106048/1706642604-a-zoox-vehicle-on-a-gradient-background.png?crop=focalpoint&fit=crop&fp-x=0.6&fp-y=0.59&h=1128&w=1920" alt='Aqui' width={1350} height={1350} />
        <Image src="https://www.datocms-assets.com/106048/1706642640-a-woman-riding-in-a-zoox-robotaxi.jpg?crop=focalpoint&fit=crop&fp-x=0.34&fp-y=0.5&h=1128&w=1920" alt='Aqui' width={1350} height={1350} />
        <Image src="https://www.datocms-assets.com/106048/1708558310-a-woman-walking-in-front-of-a-zoox-vehicle.jpg?crop=focalpoint&fit=crop&fp-x=0.7&fp-y=0.53&h=1128&w=1920" alt='Aqui' width={1350} height={1350} />
      </div>
    </div>
  );

};

export default HoverImages;
