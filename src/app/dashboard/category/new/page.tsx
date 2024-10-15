'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewCategory() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        router.push('/dashboard/category');
      } else {
        console.error('Erro ao criar categoria.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className='w-full min-h-screen text-black flex justify-center py-4'>
      <form onSubmit={handleSubmit} className='w-[15%] h-fit p-4 bg-white rounded-xl flex flex-col justify-center items-center gap-4'>
        <Input
          name="name"
          placeholder="Category Name"
          value={name}
          onChange={handleChange}
          required
        />
        <Button variant={"meu"} type="submit">Create Category</Button>
      </form>
    </div>
  );
}
