import FOTO from "@/assets/TorreRoxo.png";
import FOTO2 from "@/assets/TorreVermelho.png";
import FOTO3 from "@/assets/TorreBege.png";
import FOTO4 from "@/assets/TorreRosa.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import * as React from "react";
import useWindowSize from "@/utils/SizeWindow";

type PostProps = {
  id: number;
  image: any;
  alt: string;
};

const posts: PostProps[] = [
  {
    id: 0,
    alt: "Imagem 1",
    image: FOTO,
  },
  {
    id: 1,
    alt: "Imagem 2",
    image: FOTO2,
  },
  {
    id: 2,
    alt: "Imagem 3",
    image: FOTO3,
  },
  {
    id: 3,
    alt: "Imagem 4",
    image: FOTO4,
  },
];

export default function CarouselHome({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const window = useWindowSize();

  return (
    <Carousel className="w-full h-[32em] sm:h-[40em] flex px-2 relative">
      <CarouselContent className="w-[20em] h-[28em] sm:w-[28em] sm:h-[40em]">
        {posts.map((post) => (
          <CarouselItem key={post.id} className="w-full h-full">
            <div className="w-full h-full p-1">
              <Card className="w-full h-full shadow-none">
                <CardContent
                  className={`w-full h-full flex items-center justify-center p-6`}
                >
                  <Image
                    src={post.image}
                    alt={post.alt}
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
