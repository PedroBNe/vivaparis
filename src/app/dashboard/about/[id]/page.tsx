'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />
      <button type="submit">Update About</button>
    </form>
  );
}
