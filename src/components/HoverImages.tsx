"use client"; // Indica que é um componente client-side

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Baguette from "./assets/Baguette";
import TorreVermelha from '@/components/assets/Torre Vermelho.png';

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const HoverImages = () => {
  const containerRef = useRef(null); // Referência ao contêiner principal
  const [imagesLoaded, setImagesLoaded] = useState(false); // Estado para verificar se as imagens foram carregadas

  // Função para verificar se todas as imagens foram carregadas
  const handleImageLoad = () => {
    // Aqui podemos verificar se todas as imagens estão carregadas
    setImagesLoaded(true); // Atualiza o estado para indicar que as imagens foram carregadas
  };

  useEffect(() => {
    if (imagesLoaded) {
      // Animação com GSAP para as imagens, só após o carregamento
      const sections = gsap.utils.toArray(".image-section");

      gsap.to(sections, {
        yPercent: -100 * (sections.length - 1), // Move as imagens verticalmente
        ease: "none", // Sem easing para transição suave
        scrollTrigger: {
          trigger: containerRef.current, // O contêiner será o gatilho da rolagem
          pin: true, // Fixa o contêiner na tela
          scrub: 3, // Sincroniza a rolagem com a animação
          end: "+=900", // Define o ponto final da animação
          invalidateOnRefresh: true, // Recalcula os valores na atualização
        },
      });

      // Recalcular animações em resize da tela
      ScrollTrigger.refresh();
    }
  }, [imagesLoaded]); // Executa o efeito apenas quando as imagens forem carregadas

  return (
    <div className="relative flex justify-center items-center w-full h-screen">
      <div className="absolute left-1 top-16 overflow-hidden">
        <Baguette height={400} width={400} color={""} />
      </div>
      <Image src={TorreVermelha} alt="torre-vermelha" width={360} height={360} className="absolute right-1 bottom-0 overflow-hidden rotate-[30deg]" />
      {/* Contêiner fixo com bordas arredondadas */}
      <div
        ref={containerRef}
        className="relative w-[calc(100%-160px)] max-w-[1400px] h-[calc(100vh-80px)] rounded-[40px] mt-[80px] overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 w-full h-[calc(100vh-80px)]">
          {/* Seções de imagens que rolam */}
          <section className="image-section w-full h-[calc(100vh-80px)]">
            <Image
              className="w-full h-[calc(100vh-160px)] object-cover"
              src="https://img.freepik.com/fotos-gratis/vista-da-cidade-de-paris-sob-o-sol-e-um-ceu-azul-em-fra_181624-50289.jpg?size=626&ext=jpg&ga=GA1.1.117719557.1725584679&semt=ais_hybrid"
              alt="Imagem 1"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad} // Verifica se a imagem foi carregada
            />
          </section>

          <section className="image-section w-full h-[calc(100vh-80px)]">
            <Image
              className="w-full h-[calc(100vh-160px)] object-cover"
              src="https://img.freepik.com/fotos-gratis/torre-eiffel-de-paris-com-ponte_1101-916.jpg?size=626&ext=jpg&ga=GA1.1.117719557.1725584679&semt=ais_hybrid"
              alt="Imagem 2"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad}
            />
          </section>

          <section className="image-section w-full h-[calc(100vh-80px)]">
            <Image
              className="w-full h-[calc(100vh-160px)] object-cover"
              src="https://img.freepik.com/fotos-gratis/mulher-muculmana-viajando-em-paris_23-2149364085.jpg?size=626&ext=jpg&ga=GA1.1.117719557.1725584679&semt=ais_hybrid"
              alt="Imagem 3"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad}
            />
          </section>

          <section className="image-section w-full h-[calc(100vh-80px)]">
            <Image
              className="w-full h-[calc(100vh-160px)] object-cover"
              src="https://img.freepik.com/fotos-gratis/vista-horizontal-do-famoso-arco-do-triunfo-paris-franca_268835-819.jpg?size=626&ext=jpg&ga=GA1.1.117719557.1725584679&semt=ais_hybrid"
              alt="Imagem 4"
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HoverImages;
