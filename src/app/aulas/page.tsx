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

  // Função para buscar as aulas online da API
  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/onlineclass");

      if (!res.ok) {
        throw new Error(`Erro ao buscar aulas: ${res.status}`);
      }

      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error("Erro ao buscar aulas:", err);
    }
  };

  // Chama a função ao montar o componente
  useEffect(() => {
    fetchClasses();
  }, []);

  if (classes.length === 0) {
    return (
      <p className="h-screen text-black flex justify-center items-top mt-4 text-lg">
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
        className={`h-full overflow-hidden relative shadow-2xl rounded-xl ${isFirst ? "col-span-2 md:col-span-3" : "md:w-[500px] lg:w-auto"
          }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={`h-full`}>
          <div
            className={`relative ${isFirst ? "aspect-video" : "aspect-video lg:aspect-square"
              }`}
          >
            <Image
              src={lesson.imageUrl}
              alt={lesson.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start z-20">
              <CardTitle
                className={`${isFirst ? "text-2xl md:text-3xl" : "text-lg"
                  }`}
              >
                {lesson.title}
              </CardTitle>
              <Badge variant="secondary">
                {new Date(lesson.date).toLocaleDateString()}
              </Badge>
            </div>
            <div className="z-20">
              <CardDescription>{lesson.subtitle}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center z-20">
                <Users className="mr-1 h-4 w-4" />
                {lesson.students} alunos
              </div>
            </div>
          </CardContent>
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
    <div className="w-full h-auto container mx-auto py-12 px-4 text-black bg-[var(--background)] z-20 relative">
      <div>
        <h1 className="text-4xl font-bold mb-8 text-center">
          Nossas Aulas Online
        </h1>
        <div className="w-full flex flex-col md:justify-center md:items-center lg:grid lg:grid-flow gap-12">
          {classes.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
