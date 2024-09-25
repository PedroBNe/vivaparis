"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  students: number
  image: string
  level: "Iniciante" | "Intermediário" | "Avançado"
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introdução à Programação Web",
    description: "Aprenda os fundamentos de HTML, CSS e JavaScript nesta aula introdutória.",
    duration: "2h 30min",
    students: 1500,
    image: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
    level: "Iniciante",
  },
  {
    id: 2,
    title: "React para Iniciantes",
    description: "Comece sua jornada no desenvolvimento com React neste curso prático.",
    duration: "3h 15min",
    students: 1200,
    image: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
    level: "Iniciante",
  },
  {
    id: 3,
    title: "Desenvolvimento Backend com Node.js",
    description: "Aprenda a criar APIs robustas e escaláveis com Node.js e Express.",
    duration: "4h",
    students: 980,
    image: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
    level: "Intermediário",
  },
  {
    id: 4,
    title: "Arquitetura de Microsserviços",
    description: "Explore os princípios e práticas da arquitetura de microsserviços.",
    duration: "3h 45min",
    students: 750,
    image: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
    level: "Avançado",
  },
]

const LessonCard = ({ lesson, isFirst }: { lesson: Lesson; isFirst: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`h-full overflow-hidden relative shadow-2xl rounded-xl ${isFirst ? 'col-span-2 md:col-span-3' : 'md:w-[500px] lg:w-auto'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`h-full`}>
        <div className={`relative ${isFirst ? 'aspect-video' : 'aspect-video lg:aspect-square'}`}>
          <Image
            src={lesson.image}
            alt={lesson.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start z-20">
            <CardTitle className={`${isFirst ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{lesson.title}</CardTitle>
            <Badge variant="secondary">{lesson.level}</Badge>
          </div>
          <div className="z-20">
            <CardDescription>{lesson.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center z-20">
              <Clock className="mr-1 h-4 w-4" />
              {lesson.duration}
            </div>
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
          onClick={() => alert(`Iniciando a aula: ${lesson.title}`)}
        >
          Iniciar Aula
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Aulas() {
  return (
    <div className="container mx-auto py-12 px-4 text-black">
      <h1 className="text-4xl font-bold mb-8 text-center">Nossas Aulas Online</h1>
      <div className="w-full flex flex-col md:justify-center md:items-center lg:grid lg:grid-flow gap-12">
        {lessons.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} isFirst={index === 0} />
        ))}
      </div>
    </div>
  )
}
