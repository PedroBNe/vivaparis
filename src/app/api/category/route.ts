import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todas as categorias
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar categorias." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova categoria
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar categoria." },
      { status: 500 }
    );
  }
}
