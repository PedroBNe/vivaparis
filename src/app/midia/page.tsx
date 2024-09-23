'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import truncate from 'html-truncate';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  filePath: string
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

  const PostCardMidia = ({ post }: { post: Post }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        className="w-full h-[17em] relative overflow-hidden rounded-lg shadow-lg z-10 bg-slate-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full absolute bottom-0 left-0 right-0 p-6 flex justify-between">
          <div className='w-[40%] h-[17em] flex flex-col relative'>
            <div className='absolute top-32 z-20'>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm mb-2 opacity-90">{post.subtitle}</p>
              <div className='flex flex-col gap-2'>
                <p>Data: {new Date(post.date).toLocaleDateString()}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(truncate(fixLinks(post.content), 100, { ellipsis: '...' }))
                  }}
                />
              </div>
            </div>
          </div>
          <div className='flex absolute right-0 top-12'>
            {/* <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          /> */}
            <div className="aspect-[2/1] relative">
              <Image src={post.filePath} alt='asdhjijlsd' width={500} height={500} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>
        </div>
        <motion.div
          className="absolute right-0 inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 z-15"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-primary text-black hover:text-white transition-colors duration-300">
            {/* Link para ver o post completo */}
            <Link href={`/midia/${post.id}`}>Leia mais</Link>
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="w-full min-h-screen container mx-auto py-8 flex flex-col gap-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Postagens</h1>
      <ul className="flex flex-col gap-12">
        {posts.map((post) => (
          <PostCardMidia key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
