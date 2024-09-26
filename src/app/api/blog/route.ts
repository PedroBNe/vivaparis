import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

// Singleton do PrismaClient
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

interface Blog {
  id?: string;
  title: string;
  subtitle: string;
  date: string | Date;
  content: string;
  imageUrl?: string;
  categoryId: string;
}

// GET: Pegar todas as postagens do blog
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: { category: true }, // Inclui a categoria relacionada
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova postagem no blog
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extraindo campos do FormData
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const date = formData.get("date") as string | Date;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("file");

    // Verificando se o arquivo de imagem foi recebido
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No image file received." },
        { status: 400 }
      );
    }

    // Manipulação de arquivo (imagem)
    const buffer = Buffer.from(await (file as Blob).arrayBuffer());
    const filename =
      Date.now() + "_" + (file as Blob).name.replaceAll(" ", "_");
    const uploadPath = path.join(process.cwd(), "public/blog/");

    // Criar a pasta se não existir
    await fs.promises.mkdir(uploadPath, { recursive: true });

    // Salvar o arquivo de imagem
    await writeFile(path.join(uploadPath, filename), buffer);

    // Criando a postagem no banco de dados
    const formattedDate = new Date(date);
    const newBlog = await prisma.blog.create({
      data: {
        title,
        subtitle,
        content,
        date: formattedDate.toISOString(),
        imageUrl: "/blog/" + filename, // Caminho da imagem
        categoryId, // Relaciona com a categoria
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error occurred while creating blog post: ", error);
    return NextResponse.json({
      Message: "Failed to create blog post",
      status: 500,
    });
  }
}

// PUT: Atualizar uma postagem existente do blog
export async function PUT(req: Request) {
  try {
    const { id, ...blogData }: Blog & { id: string } = await req.json();
    const formattedDate = new Date(blogData.date);

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: blogData.title,
        subtitle: blogData.subtitle,
        content: blogData.content,
        date: formattedDate.toISOString(),
        categoryId: blogData.categoryId,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error occurred while updating blog post: ", error);
    return NextResponse.json({
      Message: "Failed to update blog post",
      status: 500,
    });
  }
}

// DELETE: Excluir uma postagem do blog
export async function DELETE(req: Request) {
  try {
    const { id }: { id: string } = await req.json();
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ status: "Blog post deleted" });
  } catch (error) {
    console.error("Error occurred while deleting blog post: ", error);
    return NextResponse.json({
      Message: "Failed to delete blog post",
      status: 500,
    });
  }
}
