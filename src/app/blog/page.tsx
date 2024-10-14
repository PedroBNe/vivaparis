/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import formatDate from "@/utils/FormatData";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  category: string;
};

export default function BlogPage() {
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        // Mapear os dados para corresponder ao tipo Post
        const formattedPosts = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          date: item.date,
          imageUrl: item.imageUrl,
          category: item.category.name, // Supondo que a categoria tenha uma propriedade 'name'
        }));

        setPosts(formattedPosts);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Falha ao buscar os posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Componente para um único post
  const PostCardBlog = ({ post }: { post: Post }) => {
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
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-primary rounded-full">
            {post.category}
          </span>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-sm mb-2 opacity-90">{post.subtitle}</p>
          <p className="text-xs opacity-75">{formatDate(post.date)}</p>
        </div>
        <motion.div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/blog/${post.id}`}>
            <button className="bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
              Ler mais
            </button>
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return <div className="text-center">Carregando posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="w-full min-h-screen container mx-auto py-8 flex flex-col gap-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-2">
        {posts.map((post) => (
          <PostCardBlog key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
