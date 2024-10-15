import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma visita por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const visit = await prisma.visit.findUnique({ where: { id } });
    if (!visit)
      return NextResponse.json(
        { error: "Visita não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(visit, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar visita." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma visita por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedVisit = await prisma.visit.update({
      where: { id },
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(updatedVisit, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar visita." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma visita por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.visit.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar visita." },
      { status: 500 }
    );
  }
}
