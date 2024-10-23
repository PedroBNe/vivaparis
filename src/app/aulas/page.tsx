"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define o tipo para OnlineClass
interface OnlineClass {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  date: string;
  students: string;
}

export default function OnlineClassPage() {
  const [classes, setClasses] = useState<OnlineClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as aulas online da API
  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/onlineclass");

      if (!res.ok) {
        throw new Error(`Erro ao buscar aulas: ${res.status}`);
      }

      const data = await res.json();
      setClasses(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Erro ao carregar as aulas. Tente novamente mais tarde.");
      console.error("Erro ao buscar aulas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Chama a função ao montar o componente
  useEffect(() => {
    fetchClasses();
  }, []);

  if (isLoading) {
    return (
      <p className="h-screen text-black flex justify-center items-center text-lg bg-[var(--background)] rounded-b-[70px]">
        Carregando aulas...
      </p>
    );
  }

  if (error) {
    return (
      <p className="h-screen text-red-500 flex justify-center items-center text-lg bg-[var(--background)] rounded-b-[70px]">
        {error}
      </p>
    );
  }

  if (classes.length === 0) {
    return (
      <p className="h-screen text-black flex justify-center items-center text-lg bg-[var(--background)] rounded-b-[70px]">
        Nenhuma aula encontrada.
      </p>
    );
  }

  const LessonCard = ({
    lesson,
    isFirst,
  }: {
    lesson: OnlineClass;
    isFirst: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className={`overflow-hidden relative rounded-lg ${
          isFirst ? "col-span-2 md:col-span-3" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="w-full h-full">
          <div
            className={`relative ${
              isFirst ? "aspect-video" : "aspect-square md:aspect-square"
            }`}
          >
            <Image
              src={lesson.imageUrl}
              alt={lesson.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="bg-white relative z-20 rounded-b-lg">
            <CardHeader className="relative z-10">
              <div className="flex justify-between items-start">
                <CardTitle className={`${isFirst ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {lesson.title}
                </CardTitle>
                <Badge variant="secondary">
                  {new Date(lesson.date).toLocaleDateString()}
                </Badge>
              </div>
              <CardDescription>{lesson.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {lesson.students} alunos
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
        <motion.div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={() => console.log("Iniciar aula")}
          >
            Iniciar Aula
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-auto text-black py-16 rounded-b-[70px] bg-[var(--background)] relative z-20">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Nossas Aulas Online</h1>
        <div className="w-[90%] h-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
