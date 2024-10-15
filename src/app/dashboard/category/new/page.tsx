'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCategory() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        router.push('/category');
      } else {
        console.error('Erro ao criar categoria.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-20'>
      <input
        name="name"
        placeholder="Category Name"
        value={name}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Category</button>
    </form>
  );
}
