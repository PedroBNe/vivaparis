import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter uma aula online por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const onlineClass = await prisma.onlineClass.findUnique({ where: { id } });
    if (!onlineClass)
      return NextResponse.json(
        { error: "Aula não encontrada." },
        { status: 404 }
      );

    return NextResponse.json(onlineClass, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar aula." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma aula online por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedClass = await prisma.onlineClass.update({
      where: { id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        date: new Date(body.date),
        imageUrl: body.imageUrl,
        students: body.students,
      },
    });

    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar aula." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar uma aula online por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.onlineClass.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar aula." },
      { status: 500 }
    );
  }
}
