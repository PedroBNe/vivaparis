import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverImages } from "@/components/HoverImages";
import CarouselHome from "./Carousel";

export default function LaptopL() {
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
                src="https://img.freepik.com/fotos-gratis/torre-eiffel-paris-melhores-destinos-na-europa_268835-969.jpg?w=740&t=st=1726510205~exp=1726510805~hmac=0d3a5a3c6b805316b26a892a153370494b3ebf23e5e0a62b36832cae8fcdb190"
                alt="@shadcn"
              />
            </Avatar>
          </div>
          <div className="max-w-[700px] flex flex-col gap-10 items-center">
            <p className="text-black text-lg">
              Viva Paris de uma maneira leve e divertida.
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
