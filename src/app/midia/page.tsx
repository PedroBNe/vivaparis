'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import truncate from 'html-truncate';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  date: string;
  status: string;
}

function fixLinks(content: string): string {
  return content.replace(/href="(www\.[^"]+)"/g, 'href="http://$1"');
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar todos os posts da API
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  if (posts.length === 0) {
    return <p>Nenhuma postagem encontrada.</p>;
  }

  return (
    <div>
      <h1>Postagens</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <h3>{post.subtitle}</h3>
            <p>Autor: {post.author}</p>
            <p>Data: {new Date(post.date).toLocaleDateString()}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(truncate(fixLinks(post.content), 100, { ellipsis: '...' }))
              }}
            />
            {/* Link para ver o post completo */}
            <a href={`/midia/${post.id}`}>Leia mais</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
