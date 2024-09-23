import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs"; // Adicionar para lidar com o sistema de arquivos

// Singleton do PrismaClient
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

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
  try {
    // Lidar com FormData em vez de JSON
    const formData = await req.formData();

    // Extraindo campos do FormData
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string | Date;
    const file = formData.get("file"); // Não tratamos mais como `File`, mas sim como `Blob`.

    // Verificando se o arquivo foi recebido
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    // Convertendo para Blob para lidar com arquivos corretamente
    const buffer = Buffer.from(await (file as Blob).arrayBuffer());

    const filename =
      Date.now() + "_" + (file as Blob).name.replaceAll(" ", "_");
    const uploadPath = path.join(process.cwd(), "public/uploads/");

    // Criar a pasta se não existir
    await fs.promises.mkdir(uploadPath, { recursive: true });

    // Salvar o arquivo
    await writeFile(path.join(uploadPath, filename), buffer);

    // Criando a postagem no banco de dados
    const formattedDate = new Date(date);
    const newPost = await prisma.post.create({
      data: {
        title,
        subtitle,
        content,
        date: formattedDate,
        filePath: "/uploads/" + filename, // Caminho do arquivo
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error occurred while creating post: ", error);
    return NextResponse.json({ Message: "Failed to create post", status: 500 });
  }
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
