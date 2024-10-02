import Image from "next/image";
import TorreVermelha from '@/assets/TorreVermelho.png';
import TorreRosa from '@/assets/TorreRosa.png';
import TorreAmarela from '@/assets/TorreAmarelo.png'
import TorreRoxa from '@/assets/TorreRoxo.png';
import TorreBege from '@/assets/TorreBege.png';
import TorreVerde from '@/assets/TorreVerde.png';
import Croissaint from "@/assets/Croissaint";
import French from "@/assets/French";

export default function Laptop() {
  return(
    <div className="w-[100% - 80px] mx-auto min-h-[550em] flex justify-center flex-col items-center overflow-hidden">
      <div className="w-full h-[195em] flex flex-col gap-[80px] items-center justify-around p-[80px] text-xl">
        <h2 className="flex text-green-700 text-2xl font-semibold">
          <p
          data-aos="fade-right"
          data-aos-duration="900"
          >
            Mu
          </p>
          <p
          data-aos="fade-up"
          data-aos-duration="900"
          >
            se
          </p>
          <p
          data-aos="fade-left"
          data-aos-duration="900"
          >
            us
          </p>
        </h2>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreRosa} alt="torre-rosa" width={180} height={180} className="absolute left-[-50px] bottom-8 rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#f3b6b6]" data-aos="fade-left" data-aos-duration="900">Museu do Louvre</h1>
            <p className="font-bold text-[#f3b6b6]" data-aos="fade-left" data-aos-duration="900">(Clássico)</p>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#f3b6b6] hover:bg-[#ea8888] ease-in transition text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreRoxa} alt="torre-roxa" width={180} height={180} className="absolute right-[-50px] bottom-8 rotate-[15deg]" />
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center  items-center gap-4">
            <h1 className="font-bold text-[#c59bc7]" data-aos="fade-right" data-aos-duration="900">Museu do Louvre</h1>
            <p className="font-bold text-[#c59bc7]" data-aos="fade-right" data-aos-duration="900">(Egito)</p>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#c59bc7] hover:bg-[#c16fc5] ease-in transition text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreAmarela} alt="torre-vermelha" width={180} height={180} className="absolute left-[-50px] bottom-8 rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://ifpnews.com/wp-content/uploads/2018/02/Louvre-Museum-2-696x464.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center  items-center gap-4">
            <h1 className="font-bold text-[#f2c261]" data-aos="fade-left" data-aos-duration="900">Museu do Louvre</h1>
            <p className="font-bold text-[#f2c261]" data-aos="fade-left" data-aos-duration="900">(Kids)</p>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#f2c261] hover:bg-[#c8a051] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreBege} alt="torre-vermelha" width={180} height={180} className="absolute right-[-50px] bottom-8 rotate-[15deg]" />
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.bing.com/th?id=OADD2.8452591962238_1W7IQLFEC9B74EQ7HS&pid=21.2&c=16&roil=0&roit=0&roir=1&roib=1&w=472&h=247&rs=2&qlt=100" alt="museu-louvre" width={600} height={600} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#ddc1b6]" data-aos="fade-right" data-aos-duration="900">Museu d’Orsay</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#ddc1b6] hover:bg-[#d89479] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreVerde} alt="torre-vermelha" width={180} height={180} className="absolute left-[-50px] bottom-8 rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://cdn.sortiraparis.com/images/80/107318/1087967-le-decor-du-defile-dior-haute-couture-automne-hiver-2024-2025-au-musee-rodin-image00001.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#055647]" data-aos="fade-left" data-aos-duration="900">Museu Rodin</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#055647] hover:bg-[#0e1e1c] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[225em] flex flex-col gap-[80px] items-center justify-around p-[80px] text-xl">
        <h2 className="flex text-2xl text-green-700 font-semibold">
          <p
          data-aos="fade-right"
          data-aos-duration="900"
          >
            R
          </p>
          <p
          data-aos="fade-up-right"
          data-aos-duration="900"
          >
            u
          </p>
          <p
          data-aos="fade-up-left"
          data-aos-duration="900"
          >
            a
          </p>
          <p
          data-aos="fade-left"
          data-aos-duration="900"
          >
            s
          </p>
        </h2>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreVermelha} alt="torre-vermelha" width={180} height={180} className="absolute right-[-50px] bottom-8 rotate-[15deg]" />
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.tripsavvy.com/thmb/g8mHCcJkvnaulQhxJcnmpL4xkug=/3000x2000/filters:fill(auto,1)/GettyImages-532063893-57bed7bf3df78cc16eefdf98.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#db6e4e]" data-aos="fade-right" data-aos-duration="900">Montmartre</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#db6e4e] hover:bg-[#924a34] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreAmarela} alt="torre-vermelha" width={180} height={180} className="absolute left-[-50px] bottom-8 rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.paristouristinformation.fr/fr/wp-content/uploads/2021/01/Ile-de-la-Cite-of-Pariss-top-attractions.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#f2c261]" data-aos="fade-left" data-aos-duration="900">Île de la Cité</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#f2c261] hover:bg-[#c8a051] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreBege} alt="torre-vermelha" width={180} height={180} className="absolute right-[-50px] bottom-8 rotate-[15deg]" />
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.tout-paris.org/wp-content/uploads/2021/12/15-choses-a-voir-au-quartier-latin-de-Paris-1000x675.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#ddc1b6]" data-aos="fade-right" data-aos-duration="900">Quartier Latin</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#ddc1b6] hover:bg-[#d89479] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreRosa} alt="torre-vermelha" width={180} height={180} className="absolute left-[-50px] top-5 rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://th.bing.com/th/id/R.c4fb700d7ff904819bbd971ecd99ff5a?rik=vcg8Xn%2br9pz1MQ&pid=ImgRaw&r=0" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#f3b6b6]" data-aos="fade-left" data-aos-duration="900">Le Marais</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#f3b6b6] hover:bg-[#ea8888] ease-in transition text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreRoxa} alt="torre-vermelha" width={180} height={180} className="absolute right-[-50px] top-[-30px] rotate-[15deg]" />
          <div data-aos="fade-left" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.rodei.com.br/wp-content/uploads/2013/01/La-Defense-05-1160x769.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#c59bc7]" data-aos="fade-right" data-aos-duration="900">Eixos Historicos da Franca</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#c59bc7] hover:bg-[#c16fc5] ease-in transition text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-[80px] justify-center items-center">
          <Image src={TorreVerde} alt="torre-vermelha" width={180} height={180} className="absolute left-[-50px] top-[-30px] rotate-[-15deg]" />
          <div data-aos="fade-right" data-aos-duration="900">
            <Image className="rounded-xl" src="https://www.worldbyisa.com/wp-content/uploads/2017/08/22583324985_8f9cb20809_k.jpg" alt="museu-louvre" width={500} height={500} />
          </div>
          <div className="max-w-[500px] flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-[#055647]" data-aos="fade-left" data-aos-duration="900">Ruas da Revolução Francesa</h1>
            <div data-aos="fade-up" data-aos-duration="900">
              <button className="w-fit p-3 rounded-md bg-[#055647] hover:bg-[#0e1e1c] transition ease-in text-white font-semibold">
                <p className="text-sm">Saiba mais</p></button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[38em] flex flex-col gap-[80px] items-center justify-around p-[80px] text-xl bg-[var(--background)] rounded-b-[70px] relative z-20">
        <h2 className="flex gap-3 text-green-700 text-2xl font-semibold">
          <div className="flex">
            <p
            data-aos="fade-right"
            data-aos-duration="400"
            >
              Pa
            </p>
            <p
            data-aos="fade-right"
            data-aos-duration="500"
            >
              la
            </p>
            <p
            data-aos="fade-right"
            data-aos-duration="600"
            >
              cio
            </p>
          </div>
          <div className="flex">
            <p
            data-aos="fade-up"
            data-aos-duration="900"
            >
              de
            </p>
          </div>
          <div className="flex">
            <p
            data-aos="fade-up-right"
            data-aos-duration="900"
            >
              Ver
            </p>
            <p
            data-aos="fade-up-left"
            data-aos-duration="900"
            >
              sa
            </p>
            <p
            data-aos="fade-left"
            data-aos-duration="900"
            >
              lhes
            </p>
          </div>
        </h2>
        <div className="w-full h-full flex flex-col gap-[80px] justify-center items-center">
          <div className="relative w-fit h-fit flex flex-col gap-6" data-aos="fade-up" data-aos-duration="800">
            <div className="absolute z-30 left-[-40px] top-[-40px] rotate-[-40deg]">
              <Croissaint height={100} width={100} />
            </div>
            <div className="absolute right-[-40px] top-[-40px] rotate-[20deg] z-30">
              <French height={100} width={100} />
            </div>
            <Image className="rounded-xl relative z-20" src="https://th.bing.com/th/id/OIP.t46VHszcIqSMCJuhvA9Q6gHaEO?rs=1&pid=ImgDetMain" alt="museu-louvre" width={700} height={700} />
            <div className="relative z-10 flex flex-col justify-center items-center" data-aos="fade-down" data-aos-duration="1000">
              <button className="p-3 rounded-md bg-green-700 hover:bg-green-900 ease-in transition text-white font-semibold">
                <p className="text-sm">Saiba mais</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
