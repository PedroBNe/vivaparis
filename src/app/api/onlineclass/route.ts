import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todas as aulas online
export async function GET() {
  try {
    const classes = await prisma.onlineClass.findMany();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar aulas online." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova aula online
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newClass = await prisma.onlineClass.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        date: new Date(body.date),
        imageUrl: body.imageUrl,
        students: body.students,
      },
    });
    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar aula online." },
      { status: 500 }
    );
  }
}
