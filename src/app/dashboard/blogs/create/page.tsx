'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Estilos do Quill

// Carregamento dinâmico para React Quill, pois ele só funciona no cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Category {
  id: string;
  name: string;
}

export default function CreateBlog() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // Data atual
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Estado para a imagem
  const [categoryId, setCategoryId] = useState<string>(''); // Estado para categoria
  const [categories, setCategories] = useState<Category[]>([]); // Lista de categorias
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Erro de envio
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories'); // Supondo que você tenha uma API para listar categorias
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples antes do envio
    if (!title || !subtitle || !content || !image || !categoryId) {
      setError('Por favor, preencha todos os campos, selecione uma categoria e faça o upload de uma imagem.');
      return;
    }

    setLoading(true);
    setError(null); // Reseta o erro antes do envio

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('categoryId', categoryId); // Envia o ID da categoria
    formData.append('file', image); // Adicionando a imagem ao FormData

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formData, // Enviando FormData
      });

      if (response.ok) {
        router.push('/dashboard/blogs'); // Redireciona para a lista de blogs
      } else {
        setError('Ocorreu um erro ao criar a postagem do blog.');
      }
    } catch (err) {
      setError('Ocorreu um erro na requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Blog</h1>
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
          <label className="block text-sm font-medium text-gray-700">Imagem do Blog</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}
