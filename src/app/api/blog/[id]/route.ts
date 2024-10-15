import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter um blog por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog)
      return NextResponse.json(
        { error: "Blog não encontrado." },
        { status: 404 }
      );

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar blog." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar um blog por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        date: body.date,
        content: body.content,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar blog." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar um blog por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.blog.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar blog." },
      { status: 500 }
    );
  }
}
