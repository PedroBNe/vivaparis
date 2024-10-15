"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import Image from "next/image";

// Define o tipo para Mídia
interface Midia {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  imageUrl: string;
}

export default function MidiaDetailPage() {
  const { id } = useParams(); // Captura o ID da URL
  const [midia, setMidia] = useState<Midia | null>(null);

  // Função para buscar os detalhes da mídia
  const fetchMidia = async () => {
    try {
      const res = await fetch(`/api/midia/${id}`);

      if (!res.ok) {
        throw new Error(`Erro ao buscar mídia: ${res.status}`);
      }

      const data = await res.json();
      setMidia(data);
    } catch (err) {
      console.error("Erro ao buscar mídia:", err);
    }
  };

  // Chama a função ao montar o componente
  useEffect(() => {
    if (id) fetchMidia();
  }, [id]);

  if (!midia) {
    return (
      <p className="h-screen text-black flex justify-center items-top mt-4 text-lg">
        Mídia não encontrada.
      </p>
    );
  }

  return (
    <div className="w-full min-h-screen container mx-auto py-8 text-black">
      <h1 className="text-4xl font-bold mb-4">{midia.title}</h1>
      <h2 className="text-2xl text-gray-500 mb-6">{midia.subtitle}</h2>
      <p className="text-sm text-gray-400 mb-4">
        Data: {new Date(midia.date).toLocaleDateString()}
      </p>
      <div className="relative w-full h-96 mb-8">
        {/* <Image
          src={midia.imageUrl}
          alt={midia.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        /> */}
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(midia.content) }}
      />
    </div>
  );
}
