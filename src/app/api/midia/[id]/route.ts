import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma mídia por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const midia = await prisma.midia.findUnique({ where: { id } });
    if (!midia)
      return NextResponse.json(
        { error: "Mídia não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(midia, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar mídia." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma mídia por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedMidia = await prisma.midia.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedMidia, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar mídia." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma mídia por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.midia.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar mídia." },
      { status: 500 }
    );
  }
}
