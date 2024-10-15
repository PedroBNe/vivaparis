'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type MidiaForm = {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
};

export default function NewMidia() {
  const [form, setForm] = useState<MidiaForm>({
    title: '',
    subtitle: '',
    date: '',
    content: '',
    imageUrl: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', form);

    try {
      const res = await fetch('/api/midia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/dashboard/midia');
      } else {
        console.error('Erro ao criar mídia.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };


  return (
    <div className='w-full min-h-screen py-4 flex justify-center text-black'>
      <form onSubmit={handleSubmit} className='w-[350px] h-fit p-4 flex flex-col gap-2 bg-white rounded-lg'>
        <h2 className='font-semibold my-2'>New Post Midia</h2>
        <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <Input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} required />
        <Input name="date" type="date" value={form.date} onChange={handleChange} required />
        <Textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
        <Input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <Button variant={"meu"} type="submit" className='m-5'>Create Midia</Button>
      </form>
    </div>
  );
}
