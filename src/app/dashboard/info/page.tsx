'use client';

import { Button } from '@/components/ui/button';
import { CardContent, Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Info = {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function InfoList() {
  const [infos, setInfos] = useState<Info[]>([]);

  useEffect(() => {
    const fetchInfos = async () => {
      const res = await fetch('/api/info');
      const data = await res.json();
      setInfos(data);
    };
    fetchInfos();
  }, []);

  return (
    <div className='w-full min-h-screen py-4 flex justify-center text-black'>
      <div className='w-[70%] flex flex-col'>
        <div className='w-full flex justify-between'>
          <h1 className='font-bold text-3xl'>Info List</h1>
          <Link href={"/dashboard/info/new"}>
            <Button>Criar Info</Button>
          </Link>
        </div>
        <ul className='p-5 m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {infos.map((info, index) => (
            <Card key={info.id} className='w-[300px] h-auto flex flex-col gap-1 justify-center items-center bg-white rounded-xl'>
              <CardHeader className='w-full'>
                <CardTitle>Info</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className='w-full flex flex-col gap-2 text-sm'>
                <p>Email: {info.email}</p>
                <p>Phone: {info.phoneNumber}</p>
                <p>Address: {info.address}</p>
                <p>Políticas: {info.politicas}</p>
                <p>Cookies: {info.cookies}</p>
                <p>WhatsApp: {info.whatsapp}</p>
                <p>Facebook: {info.facebook}</p>
                <p>Instagram: {info.instagram}</p>  
              </CardContent>
              <CardFooter className='w-full flex justify-between'>
                <Button variant={'destructive'}>Excluir</Button>
                <Link href={`/dashboard/info/${index}`}>
                  <Button>Editar</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
