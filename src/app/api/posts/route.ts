import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Post {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  date: string | Date;
}

// GET: Pegar todas as postagens
export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// POST: Criar uma nova postagem
export async function POST(req: Request) {
  const postData: Post = await req.json();
  const formattedDate = new Date(postData.date);

  const newPost = await prisma.post.create({
    data: {
      title: postData.title,
      subtitle: postData.subtitle,
      content: postData.content,
      date: formattedDate,
    },
  });
  return NextResponse.json(newPost);
}

// PUT: Atualizar uma postagem existente
export async function PUT(req: Request) {
  const { id, ...postData }: Post & { id: string } = await req.json();
  const formattedDate = new Date(postData.date);
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title: postData.title,
      subtitle: postData.subtitle,
      content: postData.content,
      date: formattedDate,
    },
  });
  return NextResponse.json(updatedPost);
}

// DELETE: Excluir uma postagem
export async function DELETE(req: Request) {
  const { id }: { id: string } = await req.json();
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ status: "Post deleted" });
}
