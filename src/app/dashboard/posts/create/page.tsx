'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Estilos do Quill

// Carregamento dinâmico para React Quill, pois ele só funciona no cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Post {
  title: string;
  subtitle: string;
  content: string;
  date: string;
}

export default function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // Data atual
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post: Post = {
      title,
      subtitle,
      content,
      date,
    };

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    router.push('/dashboard/posts');
  };

  return (
    <div className='text-black'>
      <h1>Criar Nova Postagem</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Escreva o conteúdo aqui..."
        />
        <button type="submit">Criar Postagem</button>
      </form>
    </div>
  );
}
