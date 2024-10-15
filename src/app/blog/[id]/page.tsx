"use client"; // Use "use client" em vez de "use server" para componentes que utilizam hooks

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
  category: {
    name: string;
  };
};

export default function BlogPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [blog, setBlog] = useState<Blog | null>(null);

  // Função para buscar o blog individual
  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error(`Erro ao buscar o blog: ${res.status}`);

      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error("Erro ao buscar blog:", err);
    }
  };

  // Chamada da função ao carregar o componente
  useEffect(() => {
    if (id) fetchBlog(); // Faz a requisição somente se o ID estiver disponível
  }, [id]);

  return (
    <div>
      <h1>{blog?.title}</h1>
      <h2>{blog?.subtitle}</h2>
      <p>Data: {new Date(blog?.date ?? "").toLocaleDateString()}</p>
      <p>Categoria: {blog?.category.name}</p>
      {/* {blog.imageUrl && <img src={post.imageUrl} alt={blog.title} />} */}
      <div dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }} />
    </div>
  );
}
