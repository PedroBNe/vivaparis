'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

type InfoForm = {
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function EditInfo() {
  const [form, setForm] = useState<InfoForm>({
    email: '',
    phoneNumber: '',
    address: '',
    politicas: '',
    cookies: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
  });

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await fetch(`/api/info/${id}`);
      const data = await res.json();
      setForm(data);
    };
    fetchInfo();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/info');
      } else {
        console.error('Erro ao atualizar informação.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} required />
      <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
      <textarea name="address" value={form.address} onChange={handleChange} required />
      <textarea name="politicas" value={form.politicas} onChange={handleChange} />
      <textarea name="cookies" value={form.cookies} onChange={handleChange} />
      <input name="whatsapp" value={form.whatsapp} onChange={handleChange} />
      <input name="facebook" value={form.facebook} onChange={handleChange} />
      <input name="instagram" value={form.instagram} onChange={handleChange} />
      <button type="submit">Update Info</button>
    </form>
  );
}
