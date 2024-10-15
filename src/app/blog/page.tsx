/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import formatDate from "@/utils/FormatData";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  // Estado para armazenar os posts
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Função para buscar blogs da API
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog', { method: 'GET' });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Erro ao buscar blogs:', err);
    }
  };

  // Chamada da função ao carregar o componente
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Componente para um único post
  const PostCardBlog = ({ blog }: { blog: Blog }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative overflow-hidden rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/3] relative">
          {/* <Image
            src={blog.imageUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-primary rounded-full">
            {blog.category?.name || 'Sem categoria'}
          </span>
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-sm mb-2 opacity-90">{blog.subtitle}</p>
          <p className="text-xs opacity-75">{formatDate(blog.date)}</p>
        </div>
        <motion.div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/blog/${blog.id}`}>
            <button className="bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
              Ler mais
            </button>
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full min-h-screen container mx-auto py-8 flex flex-col gap-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2">
        {blogs.map((post) => (
          <PostCardBlog key={post.id} blog={post} />
        ))}
      </div>
    </div>
  );
};
