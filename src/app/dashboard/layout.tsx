'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Menu from '@/assets/menu.png';
import useWindowSize from "@/utils/SizeWindow";

type Info = {
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ hidden, setHidden ] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [info, setInfo] = useState<Info | null>(null);

  const fetchInfo = async () => {
    try {
      const res = await fetch('/api/info');
      if (!res.ok) throw new Error(`Erro ao buscar Info: ${res.status}`);

      const data = await res.json();
      setInfo(data);
    } catch (err) {
      console.error('Erro ao buscar Info:', err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="w-full bg-slate-100 min-h-screen top-0">
      <nav className="w-full h-[8vh] flex justify-between items-center p-4 bg-white">
        <div className="w-fit flex justify-center items-center text-3xl font-bold text-black">
          {/* {info && (
            <Image src={info.logo} alt="logo" width={100} height={100} />
          )} */}
          {useWindowSize().width < 1024 && (
            <button onClick={() => setHidden(!hidden)}>
              <Image src={Menu} alt="menu" width={20} />
            </button>
          )}
          {useWindowSize().width >= 1024 && (
            <h1>Dashboard</h1>
          )}
        </div>
        <div className="flex gap-4">
          <Button>Administração</Button>
          <Link href={'/Home'}>
            <Button variant={'destructive'}>Sair</Button>
          </Link>
        </div>
      </nav>
      <div className={`w-full h-auto flex gap-5 text-black relative`}>
        <nav className={`w-full lg:w-[350px] flex justify-center bg-gray-900 text-white ${hidden ? 'hidden' : 'flex'} ${useWindowSize().width <= 1024 ? 'p-5 absolute z-20' : ''}`}>
          <div className="w-full flex flex-col items-center text-start font-bold">
            <Link
              href={`/dashboard/analytics`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Analytics
            </Link>
            <Link
              href={`/dashboard/client`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Clientes
            </Link>
            <Link
              href={`/dashboard/config`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Configuração
            </Link>
            <Link
              href={`/dashboard/emails`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              E-mails
            </Link>
            <Link
              href={`/dashboard/forms`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Formulários
            </Link>
            <Link
              href={`/dashboard/leads`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Leads
            </Link>
            <Link
              href={`/dashboard/visit`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              LGPD
            </Link>
            <Link
              href={`/dashboard/blog`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Pagina Blog
            </Link>
            <Link
              href={`/dashboard/blog`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Pagina Inicial
            </Link>
            <Link
              href={`/dashboard/category`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Pop-up
            </Link>
            <Link
              href={`/dashboard/info`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Redes Sociais
            </Link>
            <Link
              href={`/dashboard/midia`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Serviços
            </Link>
            <Link
              href={`/dashboard/onlineclass`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Textos e Imagens
            </Link>
            <Link
              href={`/dashboard/visit`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Tripulação
            </Link>
            <Link
              href={`/dashboard/visit`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              WhatsApp
            </Link>
            <Link
              href={`/dashboard/about`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Sobre
            </Link>
            <Link
              href={`/dashboard/category`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Categoria
            </Link>
            <Link
              href={`/dashboard/midia`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Na Midia
            </Link>
            <Link
              href={`/dashboard/onlineclass`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Aulas online
            </Link>
            <Link
              href={`/dashboard/visit`}
              className="w-full h-fit p-3 hover:bg-slate-600 transition"
            >
              Visitas
            </Link>
          </div>
        </nav>
        <main className="w-full p-5 relative z-10">{children}</main>
      </div>
    </div>
  );
}
