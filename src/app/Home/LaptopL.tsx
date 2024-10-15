import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverImages } from "@/components/HoverImages";
import CarouselHome from "./CarouseL";
import { useEffect, useState } from "react";

type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function LaptopL() {

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

  // Executar a busca ao montar o componente
  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <div className="w-[100% - 80px] mx-auto h-auto flex justify-center flex-col items-center overflow-hidden relative z-20">
      <div className="w-full">
        <HoverImages />
      </div>
      <div className="w-full h-[500px] flex justify-end flex-col items-center mt-[1000px]">
        <div className="h-full flex gap-16 justify-between items-center my-20">
          <div>
            <Avatar className="w-80 h-80">
              <AvatarImage
                src={aboutData.imageUrl}
                alt="@shadcn"
              />
            </Avatar>
          </div>
          <div className="max-w-[700px] flex flex-col gap-10 items-center">
            <p className="text-black text-lg">
              {aboutData?.title}
            </p>
            <button className="p-2 rounded-md bg-green-500 hover:bg-green-800 ease-in transition text-white font-semibold">
              Conheça sobre!
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 justify-center items-center bg-[var(--background)] rounded-b-[70px] py-6">
        <h1 className="font-bold text-4xl text-green-700">Quem sou eu ?</h1>
        <div>
          <CarouselHome width={80} height={100} />
        </div>
      </div>
    </div>
  );
}
