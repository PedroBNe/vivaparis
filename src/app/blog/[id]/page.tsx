"use client"; // Use "use client" em vez de "use server" para componentes que utilizam hooks

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
};

export default function BlogPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('ID from URL:', id); // Verifique se o ID está correto

    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null); // Define como null caso não encontre o post
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost(); // Faz a requisição apenas se o ID estiver presente
    }
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (!post) {
    return <p>Postagem não encontrada.</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.subtitle}</h2>
      <p>Data: {new Date(post.date).toLocaleDateString()}</p>
      <p>Categoria: {post.category.name}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
