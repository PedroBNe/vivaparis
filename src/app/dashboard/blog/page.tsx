'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
            <Card key={blog.id} className='w-[250px] h-auto flex flex-col gap-1 justify-center items-center bg-white rounded-xl'>
              <CardHeader className='w-full'>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.subtitle}</CardDescription>
                <CardDescription className='text-sm'>{new Date(blog.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className='w-full flex flex-col gap-1'>
                <p>{blog.content}</p>
                {/* <img src={blog.imageUrl} alt={blog.title} width={100} /> */}
              </CardContent>
              <CardFooter className='w-full flex justify-between'>
                <Button variant={'destructive'}>Excluir</Button>
                <Button>Editar</Button>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
