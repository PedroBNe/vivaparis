'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <div className='w-full min-h-screen flex justify-center text-black'>
      <form onSubmit={handleSubmit} className='w-[350px] h-fit p-4 flex flex-col gap-2 bg-white rounded-lg'>
        <h2 className='font-semibold my-2'>New Info Form</h2>
        <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <Input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
        <Textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <Textarea name="politicas" placeholder="Políticas" value={form.politicas} onChange={handleChange} />
        <Textarea name="cookies" placeholder="Cookies" value={form.cookies} onChange={handleChange} />
        <Input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} />
        <Input name="facebook" placeholder="Facebook" value={form.facebook} onChange={handleChange} />
        <Input name="instagram" placeholder="Instagram" value={form.instagram} onChange={handleChange} />
        <Button variant={"meu"} type="submit" className='m-5'>Create Info</Button>
      </form>
    </div>
  );
}
