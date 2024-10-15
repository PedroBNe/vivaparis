'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type NavbarItem = {
  id: string;
  name: string;
  url: string;
};

export default function NavbarList() {
  const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);

  useEffect(() => {
    const fetchNavbarItems = async () => {
      const res = await fetch('/api/navbar');
      const data = await res.json();
      setNavbarItems(data);
    };
    fetchNavbarItems();
  }, []);

  return (
    <div className='w-full min-h-screen py-4 flex justify-center text-black'>
      <div className='w-[70%] flex flex-col'>
        <div className='w-full flex justify-between'>
          <h1 className='font-bold text-3xl'>Navbar Items</h1>
          <Link href={"/dashboard/navbar/new"}>
            <Button>Criar Item</Button>
          </Link>
        </div>
        <ul className='p-5 m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {navbarItems.map((item, index) => (
            <Card key={item.id} className='w-[300px] h-auto flex flex-col gap-1 justify-center items-center bg-white rounded-xl'>
              <CardHeader className='w-full'>
                <CardTitle>Info</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className='w-full flex flex-col gap-2 text-sm'>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </CardContent>
              <CardFooter className='w-full flex justify-between'>
                <Button variant={'destructive'}>Excluir</Button>
                <Link href={`/dashboard/navbar/${index}`}>
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
