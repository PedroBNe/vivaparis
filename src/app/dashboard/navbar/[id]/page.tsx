'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="url"
        placeholder="URL"
        value={form.url}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Navbar Item</button>
    </form>
  );
}
