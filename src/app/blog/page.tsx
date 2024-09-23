'use client'

import formatDate from "@/components/utils/FormatData"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

type Post = {
  id: number
  title: string
  subtitle: string
  date: string
  imageUrl: string
  category: string
}


// Componente para um único post
const PostCardBlog = ({ post }: { post: Post }) => {
  const [isHovered, setIsHovered] = useState(false)

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
        <button className="bg-white text-primary font-semibold py-2 px-4 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
          Ler mais
        </button>
      </motion.div>
    </motion.div>
  )
}

  export default function BlogPage() {
  // mock de exemplo para os posts
  const posts: Post[] = [
    {
      id: 1,
      title: "Introdução ao React",
      subtitle: "Aprenda os fundamentos do React",
      date: "2023-07-01",
      imageUrl: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
      category: "Tecnology"
    },
    {
      id: 2,
      title: "Dominando o Next.js",
      subtitle: "Construa aplicações web modernas com Next.js",
      date: "2023-07-15",
      imageUrl: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
      category: "Tecnology"
    },
    {
      id: 3,
      title: "Estilização com Tailwind CSS",
      subtitle: "Crie interfaces bonitas e responsivas rapidamente",
      date: "2023-08-01",
      imageUrl: "https://th.bing.com/th/id/OIP.OF5buqsdIK6lTf-yGZi4KwHaEo?w=311&h=180&c=7&r=0&o=5&pid=1.7",
      category: "Tecnology"
    },
  ]

  return (
    <div className="w-full min-h-screen container mx-auto py-8 flex flex-col gap-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCardBlog key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
