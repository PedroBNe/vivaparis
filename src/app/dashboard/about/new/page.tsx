'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function NewAbout() {
  const [form, setForm] = useState({ title: '', imageUrl: '' });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/dashboard/about');
      } else {
        console.error('Erro ao criar entrada do About.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center text-black'>
      <form onSubmit={handleSubmit} className='w-[15%] h-fit p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <Button variant={'meu'} type="submit">Create About</Button>
      </form>
    </div>
  );
}
