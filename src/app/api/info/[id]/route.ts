import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma entrada do Info por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const info = await prisma.info.findUnique({ where: { id } });
    if (!info)
      return NextResponse.json(
        { error: "Informação não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar informação." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma entrada do Info por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedInfo = await prisma.info.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar informação." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma entrada do Info por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.info.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar informação." },
      { status: 500 }
    );
  }
}
