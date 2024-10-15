"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import useWindowSize from "@/utils/SizeWindow";

// Definição do tipo para as imagens do campo "Quem Sou Eu"
type ImageProps = {
  id: number;
  url: string;
  alt: string;
};

export default function CarouselQuemSouEu({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [images, setImages] = useState<ImageProps[]>([]); // Armazena as imagens carregadas
  const window = useWindowSize(); // Detecta o tamanho da tela

  // Função para buscar as imagens do campo "Quem Sou Eu" da API
  const fetchQuemSouEuImages = async () => {
    try {
      const res = await fetch("/api/info"); // Chamada para a API de Info
      if (!res.ok) throw new Error("Erro ao carregar as imagens de Quem Sou Eu.");

      const data = await res.json();
      if (data.quemsoueu) {
        // Mapeia as imagens do campo "Quem Sou Eu"
        const loadedImages = data.quemsoueu.map((url: string, index: number) => ({
          id: index,
          url,
          alt: `Quem Sou Eu ${index + 1}`, // Descrição dinâmica
        }));
        setImages(loadedImages); // Define o estado das imagens
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Carrega as imagens assim que o componente for montado
  useEffect(() => {
    fetchQuemSouEuImages();
  }, []);

  return (
    <Carousel className="w-full h-[32em] sm:h-[40em] flex px-2 relative">
      <CarouselContent className="w-[20em] h-[28em] sm:w-[28em] sm:h-[40em]">
        {images.map((image) => (
          <CarouselItem key={image.id} className="w-full h-full">
            <div className="w-full h-full p-1">
              <Card className="w-full h-full shadow-none">
                <CardContent className="w-full h-full flex items-center justify-center p-6">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={width}
                    height={height}
                    className="w-full h-full rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {window.width > 425 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
      {window.width <= 425 && (
        <div className="absolute bottom-0 left-[50%] h-[4em] flex gap-16">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      )}
    </Carousel>
  );
}
