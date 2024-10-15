import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma categoria por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category)
      return NextResponse.json(
        { error: "Categoria não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar categoria." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma categoria por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: body.name },
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar categoria." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma categoria por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar categoria." },
      { status: 500 }
    );
  }
}
