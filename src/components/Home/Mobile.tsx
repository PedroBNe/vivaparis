import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HoverImages } from "@/components/HoverImages";

export default function Mobile() {
  return(
    <div className="w-[100% - 80px] mx-auto min-h-[50em] flex justify-center flex-col items-center">
      <div className="w-full">
        <HoverImages />
      </div>
      <div id="sobre" className="w-full h-[600px] flex justify-end flex-col items-center mt-[1050px] bg-[var(--background)] rounded-b-3xl relative z-20">
        <div className="h-full flex flex-col gap-10 justify-between items-center my-20">
          <div>
            <Avatar className="w-60 h-60">
              <AvatarImage src="https://img.freepik.com/fotos-gratis/torre-eiffel-paris-melhores-destinos-na-europa_268835-969.jpg?w=740&t=st=1726510205~exp=1726510805~hmac=0d3a5a3c6b805316b26a892a153370494b3ebf23e5e0a62b36832cae8fcdb190" alt="@shadcn" />
            </Avatar>
          </div>
          <div className="max-w-[500px] flex flex-col gap-7 justify-center items-center px-3">
            <h1 className="font-bold text-xl text-green-700">Quem sou eu ?</h1>
            <p className="text-black text-sm text-center">Viva Paris de uma maneira leve e divertida.</p>
            <button className="p-2 rounded-md bg-green-500 hover:bg-green-800 ease-in transition text-white font-semibold">Conheça sobre!</button>
          </div>
        </div>
      </div>
    </div>
  )
}
