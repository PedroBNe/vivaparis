'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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

export default function NewInfo() {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/info');
      } else {
        console.error('Erro ao criar informação.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
      <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <textarea name="politicas" placeholder="Políticas" value={form.politicas} onChange={handleChange} />
      <textarea name="cookies" placeholder="Cookies" value={form.cookies} onChange={handleChange} />
      <input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} />
      <input name="facebook" placeholder="Facebook" value={form.facebook} onChange={handleChange} />
      <input name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} />
      <button type="submit">Create Info</button>
    </form>
  );
}
