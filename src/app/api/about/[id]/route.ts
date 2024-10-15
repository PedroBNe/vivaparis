import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma entrada do About por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const about = await prisma.about.findUnique({ where: { id } });
    if (!about)
      return NextResponse.json(
        { error: "Informação não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar informação." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma entrada do About por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedAbout = await prisma.about.update({
      where: { id },
      data: { title: body.title, imageUrl: body.imageUrl },
    });

    return NextResponse.json(updatedAbout, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar informação." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma entrada do About por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.about.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar informação." },
      { status: 500 }
    );
  }
}
