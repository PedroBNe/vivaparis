'use client';

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
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.subtitle}</p>
            <p>{new Date(blog.date).toLocaleDateString()}</p>
            {/* <img src={blog.imageUrl} alt={blog.title} width={100} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
