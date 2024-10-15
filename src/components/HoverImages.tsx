"use client"; // Indica que é um componente client-side

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Interface para definir os dados do carrossel
type CarouselImage = {
  id: number;
  url: string;
  alt: string;
};

export const HoverImages = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Referência ao contêiner principal
  const [images, setImages] = useState<CarouselImage[]>([]); // Estado para as imagens do carrossel
  const [imagesLoaded, setImagesLoaded] = useState(false); // Verifica se as imagens foram carregadas

  // Função para verificar se todas as imagens foram carregadas
  const handleImageLoad = () => {
    setImagesLoaded(true); // Atualiza o estado para indicar que as imagens foram carregadas
  };

  // Função para buscar as imagens do carrossel da API
  const fetchCarouselImages = async () => {
    try {
      const res = await fetch("/api/info"); // Chamada para a API de Info
      if (!res.ok) throw new Error("Erro ao carregar as imagens do carrossel.");

      const data = await res.json();
      if (data.carosel) {
        const loadedImages = data.carosel.map((url: string, index: number) => ({
          id: index,
          url,
          alt: `Carrossel ${index + 1}`,
        }));
        setImages(loadedImages); // Armazena as imagens no estado
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Carregar as imagens assim que o componente for montado
  useEffect(() => {
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      // Animação com GSAP para as imagens, só após o carregamento
      const sections = gsap.utils.toArray(".image-section");

      gsap.to(sections, {
        yPercent: -100 * (sections.length - 1), // Move as imagens verticalmente
        ease: "none", // Transição suave
        scrollTrigger: {
          trigger: containerRef.current, // O contêiner será o gatilho da rolagem
          pin: true, // Fixa o contêiner na tela
          scrub: 3, // Sincroniza a rolagem com a animação
          end: "+=900", // Define o ponto final da animação
          invalidateOnRefresh: true, // Recalcula os valores na atualização
        },
      });

      // Recalcula animações no redimensionamento da tela
      ScrollTrigger.refresh();
    }
  }, [imagesLoaded]); // Executa o efeito apenas quando as imagens forem carregadas

  return (
    <div className="relative flex justify-center items-center w-full h-screen">
      <div
        ref={containerRef}
        className="relative w-[calc(100%-160px)] max-w-[1400px] h-[calc(100vh-80px)] rounded-[40px] mt-[80px] overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 w-full h-[calc(100vh-80px)]">
          {/* Renderização das imagens dinamicamente */}
          {images.map((image) => (
            <section key={image.id} className="image-section w-full h-[calc(100vh-80px)]">
              <Image
                className="w-full h-[calc(100vh-160px)] object-cover"
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                onLoadingComplete={handleImageLoad} // Verifica se a imagem foi carregada
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoverImages;
