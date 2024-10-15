'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

type OnlineClassForm = {
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  students: string;
};

export default function EditOnlineClass() {
  const [form, setForm] = useState<OnlineClassForm>({
    title: '',
    subtitle: '',
    date: '',
    imageUrl: '',
    students: '',
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchClass = async () => {
      const res = await fetch(`/api/onlineclass/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchClass();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/onlineclass/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/onlineclass');
      } else {
        console.error('Erro ao atualizar aula online.');
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
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      <textarea name="students" value={form.students} onChange={handleChange} />
      <button type="submit">Update Online Class</button>
    </form>
  );
}
