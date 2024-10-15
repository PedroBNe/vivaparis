'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <div className='w-full min-h-screen flex justify-center text-black'>
      <form onSubmit={handleSubmit} className='w-[350px] h-fit p-4 flex flex-col gap-2 bg-white rounded-lg'>
        <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
        <Input placeholder="Telefone" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        <Textarea placeholder="Endereço" name="address" value={form.address} onChange={handleChange} required />
        <Textarea placeholder="Politicas" name="politicas" value={form.politicas} onChange={handleChange} />
        <Textarea placeholder="Cookies" name="cookies" value={form.cookies} onChange={handleChange} />
        <Input placeholder="Whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
        <Input placeholder="Facebook" name="facebook" value={form.facebook} onChange={handleChange} />
        <Input placeholder="Instagram" name="instagram" value={form.instagram} onChange={handleChange} />
        <Button variant='meu' type="submit" className='m-5'>Update Info</Button>
      </form>
    </div>
  );
}
