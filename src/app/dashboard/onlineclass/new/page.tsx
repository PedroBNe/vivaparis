'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type OnlineClassForm = {
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  students: string;
};

export default function NewOnlineClass() {
  const [form, setForm] = useState<OnlineClassForm>({
    title: '',
    subtitle: '',
    date: '',
    imageUrl: '',
    students: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/onlineclass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/onlineclass');
      } else {
        console.error('Erro ao criar aula online.');
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
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
      <textarea name="students" placeholder="Students" value={form.students} onChange={handleChange} />
      <button type="submit">Create Online Class</button>
    </form>
  );
}
