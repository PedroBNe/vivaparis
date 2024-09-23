'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  imageUrl?: string; // URL da imagem existente
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditBlog() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Para a nova imagem
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Para exibir erros
  const router = useRouter();

  const { id } = useParams();
  const blogId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;

  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;

      setLoading(true);

      const res = await fetch(`/api/blog/${blogId}`);
      if (res.ok) {
        const data: Blog = await res.json();
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setDate(new Date(data.date).toISOString().slice(0, 10));
        setContent(data.content);
        setCategoryId(data.categoryId);
      } else {
        setError('Falha ao buscar o blog');
      }

      setLoading(false);
    }

    async function fetchCategories() {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data: Category[] = await res.json();
        setCategories(data);
      }
    }

    if (blogId) {
      fetchBlog();
      fetchCategories();
    }
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blogId) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('categoryId', categoryId);

    if (image) {
      formData.append('file', image); // Enviando a nova imagem, se existir
    }

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard/blogs');
      } else {
        setError('Falha ao salvar alterações.');
      }
    } catch (error) {
      setError('Erro na requisição.');
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="text-black max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
          <input
            type="text"
            placeholder="Subtítulo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Escreva o conteúdo aqui..."
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nova Imagem (Opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
