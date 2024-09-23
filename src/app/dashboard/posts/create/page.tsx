'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Estilos do Quill

// Carregamento dinâmico para React Quill, pois ele só funciona no cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // Data atual
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Estado para a imagem
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Erro de envio
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples antes do envio
    if (!title || !subtitle || !content || !image) {
      setError('Por favor, preencha todos os campos e faça o upload de uma imagem.');
      return;
    }

    setLoading(true);
    setError(null); // Reseta o erro antes do envio

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('file', image); // Adicionando a imagem ao FormData

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData, // Enviando FormData
      });

      if (response.ok) {
        router.push('/dashboard/posts'); // Redireciona para a lista de posts
      } else {
        setError('Ocorreu um erro ao criar a postagem.');
      }
    } catch (err) {
      setError('Ocorreu um erro na requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Postagem</h1>
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
          <label className="block text-sm font-medium text-gray-700">Imagem do Post</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Postagem'}
          </button>
        </div>
      </form>
    </div>
  );
}
