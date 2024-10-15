'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type AboutForm = {
  title: string;
  imageUrl: string;
};

export default function EditAbout() {
  const [form, setForm] = useState<AboutForm>({ title: '', imageUrl: '' });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchAbout = async () => {
      const res = await fetch(`/api/about/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchAbout();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/about/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/about');
      } else {
        console.error('Erro ao atualizar entrada.');
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
        <Button variant={'meu'} type="submit">Update About</Button>
      </form>
    </div>
  );
}
