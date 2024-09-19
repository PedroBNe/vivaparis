'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import truncate from 'html-truncate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  date: string;
  status: string;
  imageUrl: string
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
    return <p className='h-screen text-black flex justify-center items-top mt-4 text-lg'>Carregando posts...</p>;
  }

  if (posts.length === 0) {
    return <p className='h-screen text-black flex justify-center items-top mt-4 text-lg'>Nenhuma postagem encontrada.</p>;
  }  

  return (
    <div className="w-full min-h-screen container mx-auto py-8 flex flex-col gap-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Postagens</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="flex justify-between overflow-hidden h-[18em]">
            <div className='h-full flex gap-5 flex-col justify-center'>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.subtitle}</p>
              </CardHeader>
              <CardContent>
                <p>Autor: {post.author}</p> 
                <div className='flex flex-col gap-2'>
                  <p>Data: {new Date(post.date).toLocaleDateString()}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(truncate(fixLinks(post.content), 100, { ellipsis: '...' }))
                    }}
                  />
                  {/* Link para ver o post completo */}
                  <a href={`/midia/${post.id}`} className='w-fit underline text-blue-500 hover:text-blue-800 ease-in transition'>Leia mais</a>
                </div>
              </CardContent>
            </div>
            <div className='w-[50%] h-full flex justify-center items-center'>
              imagem
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
}
