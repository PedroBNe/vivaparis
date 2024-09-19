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
}

export default function EditPost() {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const { id } = useParams();
  const postId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;

      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const data: Post = await res.json();
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setDate(new Date(data.date).toISOString().slice(0, 10));
        setContent(data.content);
      } else {
        console.error('Failed to fetch the post');
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postId) return;

    const updatedPost: Post = {
      _id: postId,
      title,
      subtitle,
      content,
      date,
    };

    await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });

    router.push('/dashboard/posts');
  };

  return (
    <div className='text-black'>
      <h1>Editar Postagem</h1>
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
