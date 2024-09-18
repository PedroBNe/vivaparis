import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import formatDate from "../utils/FormatData"
import Image from "next/image"

// Definindo o tipo para um post
type Post = {
  id: number
  title: string
  subtitle: string
  date: string
  imageUrl: string
}

// Componente para um único post
const PostCardBlog = ({ post }: { post: Post }) => (
  <Card className="overflow-hidden">
    <div className="aspect-video relative">
      <Image
        src={post.imageUrl}
        alt={post.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <CardHeader>
      <CardTitle>{post.title}</CardTitle>
      <p className="text-sm text-muted-foreground">{post.subtitle}</p>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
    </CardContent>
  </Card>
)

// Componente principal que renderiza a lista de posts
export default function BlogPage() {
  // mock de exemplo para os posts
  const posts: Post[] = [
    {
      id: 1,
      title: "Introdução ao React",
      subtitle: "Aprenda os fundamentos do React",
      date: "2023-07-01",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Dominando o Next.js",
      subtitle: "Construa aplicações web modernas com Next.js",
      date: "2023-07-15",
      imageUrl: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Estilização com Tailwind CSS",
      subtitle: "Crie interfaces bonitas e responsivas rapidamente",
      date: "2023-08-01",
      imageUrl: "/placeholder.svg?height=200&width=400",
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