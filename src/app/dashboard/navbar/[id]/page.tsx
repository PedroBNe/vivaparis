'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type NavbarItem = {
  name: string;
  url: string;
};

export default function EditNavbarItem() {
  const [form, setForm] = useState<NavbarItem>({ name: '', url: '' });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchNavbarItem = async () => {
      const res = await fetch(`/api/navbar/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchNavbarItem();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/navbar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/navbar');
      } else {
        console.error('Erro ao atualizar item.');
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
          placeholder={form.name}
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="url"
          placeholder={form.url}
          value={form.url}
          onChange={handleChange}
          required
        />
        <Button type="submit">Update Navbar Item</Button>
      </form>
    </div>
  );
}
