'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewNavbarItem() {
  const [form, setForm] = useState({ name: '', url: '' });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/dashboard/navbar');
      } else {
        console.error('Erro ao criar item na Navbar.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center text-black'>
      <form onSubmit={handleSubmit} className='w-[350px] h-fit p-4 flex flex-col gap-2 bg-white rounded-lg'>
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="url"
          placeholder="URL"
          value={form.url}
          onChange={handleChange}
          required
        />
        <Button variant={"meu"} type="submit" className='m-5'>Create Navbar Item</Button>
      </form>
    </div>
  );
}
