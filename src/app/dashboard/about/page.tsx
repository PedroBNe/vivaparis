'use client';

import { Button } from '@/components/ui/button';
// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function AboutList() {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      const res = await fetch('/api/about');
      const data = await res.json();
      setAbouts(data);
    };
    fetchAbouts();
  }, []);

  return (
    <div className='w-full min-h-screen flex justify-center text-black'>
      <div className='w-[90%] h-auto py-4'>
        <div className='w-full flex justify-between'>
          <h1 className='font-bold text-3xl'>About List</h1>
          <Link href={"/dashboard/about/new"}>
            <Button>Criar Novo About</Button>
          </Link>
        </div>
        <ul className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6'>
          {abouts.map((about, index) => (
            <li key={about.id} className='w-[250px] h-fit p-4 flex flex-col gap-2 justify-center items-center bg-white rounded-xl'>
              <h2>{about.title}</h2>
              {/* {about.imageUrl && <Image src={about.imageUrl} alt={about.title} width={100} height={100} />} */}
              <div className='w-full flex justify-between'>
                <Button variant={'destructive'}>Deletar</Button>
                <Link href={`/dashboard/about/${index}`}>
                  <Button variant={'default'}>Editar</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
