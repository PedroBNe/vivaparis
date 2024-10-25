import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverImages } from "@/components/HoverImages";
import CarouselHome from "./Carousel"; // Verifique se o nome está correto
import { useEffect, useState } from "react";

type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function Laptop() {
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
    <div className="w-[100% - 80px] mx-auto h-auto flex justify-center flex-col items-center overflow-hidden relative z-20">
      <div className="w-full">
        <HoverImages />
      </div>
      <div
        id="sobre"
        className="w-full h-[500px] flex justify-end flex-col items-center mt-[1050px] bg-[var(--background)] rounded-b-3xl"
      >
        <div className="h-full flex flex-col gap-16 justify-between items-center my-20">
          {aboutData.length > 0 ? (
            aboutData.map((about) => (
              <div key={about.id} className="flex flex-col items-center">
                <Avatar className="w-60 h-60">
                  <AvatarImage src={about.imageUrl} alt={about.title} />
                </Avatar>
                <p className="text-black">{about.title}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma informação disponível.</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 justify-center items-center bg-[var(--background)] rounded-b-[70px] py-6">
        <h1 className="font-bold text-4xl text-green-700">Quem sou eu?</h1>
        <div>
          <CarouselHome width={80} height={100} />
        </div>
      </div>
    </div>
  );
}
