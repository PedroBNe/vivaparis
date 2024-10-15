'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
        router.push('/midia');
      } else {
        console.error('Erro ao criar mídia.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
      <button type="submit">Create Midia</button>
    </form>
  );
}
