'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Blog = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  categoryId: string;
  content: string;
  imageUrl: string;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar posts
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog', { method: 'GET' });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data = await res.json();
      setBlogs(data);
    } catch (error: any) {
      console.error('Falha ao buscar os posts:', error);
      setError('Erro ao carregar os posts. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <p className="h-screen flex justify-center items-center text-lg">
        Carregando posts...
      </p>
    );
  }

  if (error) {
    return (
      <p className="h-screen text-red-500 flex justify-center items-center text-lg">
        {error}
      </p>
    );
  }

  return (
    <div className="w-full min-h-screen py-4 flex justify-center text-black">
      <div className="w-full flex flex-col h-auto">
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="font-bold text-3xl">Lista de Posts</h1>
          <Link href="/dashboard/blog/new">
            <Button>Criar Post</Button>
          </Link>
        </div>
        <ul className="p-5 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="w-auto max-h-[400px] p-4 flex flex-col justify-between items-center bg-white rounded-xl shadow-lg"
            >
              <h2 className="w-full font-bold text-lg text-center mb-2">
                {blog.title}
              </h2>
              <div className="w-full text-sm mb-4">
                <p><strong>Sobre:</strong> {blog.subtitle}</p>
                <p><strong>Data:</strong> {new Date(blog.date).toLocaleDateString()}</p>
                <p><strong>Categoria:</strong> {blog.categoryId}</p>
              </div>
              <div className="relative w-full h-[150px] mb-4">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="w-full flex justify-between">
                <Link href={`/dashboard/blog/edit/${blog.id}`}>
                  <Button>Editar</Button>
                </Link>
                <Button
                  variant="destructive"
                >
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
