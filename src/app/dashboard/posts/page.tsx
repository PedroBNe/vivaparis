'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  date: string | null; // Permitir que a data seja opcional
  filePath?: string; // Novo campo opcional para a imagem
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
    <div className="w-full min-h-screen flex justify-center p-12 text-black">
      <div className="w-[60vw] h-auto flex flex-col items-center gap-3 border-2 rounded-xl border-black bg-slate-200 shadow-2xl">
        <h1 className="text-lg font-semibold mt-2">Postagens</h1>
        <button className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white ease-in transition p-3 rounded-2xl font-semibold text-sm">
          <Link href="/dashboard/posts/create">Criar Nova Postagem</Link>
        </button>
        <ul className="w-[90%] flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.id} className="border-2 border-black p-3 rounded-lg">
              <div>
                <strong>{post.title}</strong>
              </div>
              {/* Renderizando a imagem se o filePath estiver presente */}
              {post.filePath && (
                <div className="mt-2">
                  <Image
                    src={post.filePath}
                    alt={post.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              {/* Verificar se a data está definida e se é válida */}
              <div>
                {post.date ? (
                  <p>Data: {new Date(post.date).toLocaleDateString()}</p>
                ) : (
                  <p>Sem data</p>
                )}
              </div>
              <Link href={`/dashboard/posts/edit/${post.id}`} className="underline text-blue-500">Editar</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
