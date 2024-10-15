'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/category');
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className='w-full min-h-screen py-4 flex justify-center text-black'>
      <div className='w-[50%] h-auto flex flex-col items-center'>
        <div className='w-full flex justify-between'>
          <h1 className='font-bold text-3xl'>Category List</h1>
          <Link href={"/dashboard/category/new"}>
            <Button>Criar Categoria</Button>
          </Link>
        </div>
        <ul className='w-[40%] p-4 m-5 flex flex-col gap-2 justify-center items-center bg-white rounded-xl'>
          {categories.map((category) => (
            <div key={category.id} className='w-full flex items-center gap-2'>
              <li className='w-full p-2 rounded-lg flex justify-center font-semibold border-[1px] border-black'>
                {category.name}
              </li>
              <Button variant={'destructive'}>Deletar</Button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
