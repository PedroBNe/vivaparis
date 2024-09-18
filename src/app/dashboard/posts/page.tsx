'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  date: string | null; // Permitir que a data seja opcional
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data: Post[] = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Postagens</h1>
      <Link href="/dashboard/posts/create">Criar Nova Postagem</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <strong>{post.title}</strong>
            </div>
            {/* Verificar se a data está definida e se é válida */}
            <div>
              {post.date ? (
                <p>Data: {new Date(post.date).toLocaleDateString()}</p>
              ) : (
                <p>Sem data</p>
              )}
            </div>
            <Link href={`/dashboard/posts/edit/${post.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
