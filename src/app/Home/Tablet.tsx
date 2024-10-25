import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverImages } from "@/components/HoverImages";
import CarouselHome from "./Carousel"; // Verifique a capitalização correta
import { useEffect, useState } from "react";

type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function Tablet() {
  const [aboutData, setAboutData] = useState<About[]>([]);

  const fetchAboutData = async () => {
    try {
      const res = await fetch('/api/about', { method: 'GET' });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data = await res.json();
      setAboutData(data);
    } catch (err) {
      console.error('Erro ao buscar informações de About:', err);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <div className="w-[100% - 80px] mx-auto h-auto flex justify-center flex-col items-center overflow-hidden relative">
      <div className="w-full">
        <HoverImages />
      </div>
      <div
        id="sobre"
        className="w-full h-[500px] flex justify-end flex-col items-center mt-[1050px]"
      >
        <div className="h-full flex flex-col gap-10 justify-between items-center my-20">
          {aboutData.length > 0 ? (
            <div className="flex flex-col gap-7 justify-center items-center">
              <Avatar className="w-60 h-60">
                <AvatarImage src={aboutData[0]?.imageUrl} alt="@shadcn" />
              </Avatar>
              <p className="text-black">{aboutData[0]?.title}</p>
              <button className="p-2 rounded-md bg-green-500 hover:bg-green-800 ease-in transition text-white font-semibold">
                Conheça sobre!
              </button>
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 justify-center items-center bg-[var(--background)] rounded-b-[70px] py-6 relative z-20">
        <h1 className="font-bold text-4xl text-green-700">Quem sou eu ?</h1>
        <div>
          <CarouselHome width={80} height={100} />
        </div>
      </div>
    </div>
  );
}
