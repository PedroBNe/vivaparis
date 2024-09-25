'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  date: string | null; // Permitir que a data seja opcional
  imageUrl?: string; // Campo opcional para a imagem
  category: {
    name: string;
  }; // Categoria relacionada ao blog
}

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch('/api/blog'); // Supondo que você tenha uma rota de API para blogs
      const data: Blog[] = await res.json();
      setBlogs(data);
    }

    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center p-12 text-black">
      <div className="w-[60vw] h-auto flex flex-col items-center gap-3 border-2 rounded-xl border-black bg-slate-200 shadow-2xl">
        <h1 className="text-lg font-semibold mt-2">Blogs</h1>
        <button className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white ease-in transition p-3 rounded-2xl font-semibold text-sm">
          <Link href="/dashboard/blogs/create">Criar Novo Blog</Link>
        </button>
        <ul className="w-[90%] flex flex-col gap-3">
          {blogs.map((blog) => (
            <li key={blog.id} className="border-2 border-black p-3 rounded-lg">
              <div>
                <strong>{blog.title}</strong>
              </div>
              <div>
                <p>{blog.subtitle}</p>
              </div>
              {/* Renderizando a imagem se o imageUrl estiver presente */}
              {blog.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              {/* Verificar se a data está definida e se é válida */}
              <div>
                {blog.date ? (
                  <p>Data: {new Date(blog.date).toLocaleDateString()}</p>
                ) : (
                  <p>Sem data</p>
                )}
              </div>
              <div>
                <p>Categoria: {blog.category.name}</p>
              </div>
              <Link href={`/dashboard/blogs/edit/${blog.id}`} className="underline text-blue-500">
                Editar
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
