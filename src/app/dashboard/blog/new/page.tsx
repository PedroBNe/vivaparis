'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

type BlogForm = {
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

export default function NewBlog() {
  const [form, setForm] = useState<BlogForm>({
    title: '',
    subtitle: '',
    date: '',
    content: '',
    imageUrl: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/category');
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/blog');
      } else {
        console.error('Erro ao criar blog.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center p-4 text-black'>
      <form onSubmit={handleSubmit} className='w-[15%] h-fit p-4 bg-white rounded-xl flex flex-col gap-4'>
        <Input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
          required
        />
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <Textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <Input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <Select name="categoryId" value={form.categoryId} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
