import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todos os blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar blogs:", error);
    return NextResponse.json(
      { error: "Erro ao buscar blogs." },
      { status: 500 }
    );
  }
}

// POST: Criar um novo blog
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        date: new Date(body.date),
        content: body.content,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar blog:", error);
    return NextResponse.json({ error: "Erro ao criar blog." }, { status: 500 });
  }
}
