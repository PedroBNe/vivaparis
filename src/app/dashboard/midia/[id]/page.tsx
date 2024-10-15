'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

type MidiaForm = {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
};

export default function EditMidia() {
  const [form, setForm] = useState<MidiaForm>({
    title: '',
    subtitle: '',
    date: '',
    content: '',
    imageUrl: '',
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchMidia = async () => {
      const res = await fetch(`/api/midia/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchMidia();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/midia/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/midia');
      } else {
        console.error('Erro ao atualizar mídia.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} required />
      <input name="subtitle" value={form.subtitle} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <textarea name="content" value={form.content} onChange={handleChange} required />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      <button type="submit">Update Midia</button>
    </form>
  );
}
