import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Singleton do PrismaClient
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// GET: Buscar uma postagem por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { category: true }, // Inclui os dados da categoria
    });

    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the blog" },
      { status: 500 }
    );
  }
}
