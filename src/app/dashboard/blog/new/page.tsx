"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
}

export default function CreateBlogPost() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    date: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Função para buscar as categorias da API
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Busca as categorias ao montar o componente
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("content", form.content);
      formData.append("date", form.date);
      formData.append("categoryId", form.categoryId); // Categoria selecionada
      formData.append("file", selectedFile);

      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard/blog');
      } else {
        console.error('Erro ao criar blog.');
      }
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center p-4 text-black'>
      <form onSubmit={handleSubmit} className='w-[15%] h-fit p-4 bg-white rounded-xl flex flex-col justify-center items-center gap-4'>
        <h2 className='font-semibold'>New Post</h2>
        <Input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtítulo"
          value={form.subtitle}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Conteúdo"
          value={form.content}
          onChange={handleChange}
          rows={5}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        {/* Dropdown de Categorias */}
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        />
        <Input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <Select name="categoryId" value={form.categoryId} onValueChange={(value) => setForm({ ...form, categoryId: value })} required>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant={"meu"} type="submit">Create Post</Button>
      </form>
    </div>
  );
}
