'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Blog = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog', {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Falha ao buscar os posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='w-full min-h-screen py-4 flex justify-center text-black'>
      <div className='w-[90%] h-auto'>
        <div className='w-full flex justify-between'>
          <h1 className='font-bold text-3xl'>Blog List</h1>
          <Link href={"/dashboard/blog/new"}>
            <Button>Criar Post</Button>
          </Link>
        </div>
        <ul className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6'>
          {blogs.map((blog) => (
            <li key={blog.id} className='w-[250px] h-fit p-4 flex flex-col gap-2 justify-center items-center bg-white rounded-xl'>
              <h2>{blog.title}</h2>
              <p>{blog.subtitle}</p>
              <p>{new Date(blog.date).toLocaleDateString()}</p>
              {/* <img src={blog.imageUrl} alt={blog.title} width={100} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
