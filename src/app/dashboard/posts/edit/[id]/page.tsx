'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Post {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  image?: File; // Campo opcional para imagem
}

export default function EditPost() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Para a nova imagem
  const [loading, setLoading] = useState<boolean>(false); // Indicador de carregamento
  const [error, setError] = useState<string | null>(null); // Para exibir erros
  const router = useRouter();

  const { id } = useParams();
  const postId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;

      setLoading(true);

      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const data: Post = await res.json();
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setDate(new Date(data.date).toISOString().slice(0, 10));
        setContent(data.content);
      } else {
        setError('Falha ao buscar o post');
      }

      setLoading(false);
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('date', date);

    if (image) {
      formData.append('file', image); // Enviando a nova imagem, se existir
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard/posts');
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
      <h1 className="text-2xl font-bold mb-6">Editar Postagem</h1>
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
