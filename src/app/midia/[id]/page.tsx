"use server";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
}

export default function PostPage() {
  const { id } = useParams(); // Pega o ID da URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID from URL:", id); // Verifique se o ID está correto

    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null); // Define como null caso não encontre o post
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost(); // Faz a requisição apenas se o ID estiver presente
    }
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (!post) {
    return <p>Postagem não encontrada.</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.subtitle}</h2>
      <p>Data: {new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
