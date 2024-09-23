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
    const post = await prisma.post.findUnique({
      where: { id }, // Verifica se o ID está correto e existe no banco
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}
