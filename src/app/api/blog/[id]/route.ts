import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter um blog por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar blog:", error);
    return NextResponse.json(
      { error: "Erro ao buscar blog." },
      { status: 500 }
    );
  }
}
