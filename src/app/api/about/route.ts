import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar informações do About
export async function GET() {
  try {
    const abouts = await prisma.about.findMany();
    return NextResponse.json(abouts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar informações." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova entrada em About
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newAbout = await prisma.about.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(newAbout, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar informação." },
      { status: 500 }
    );
  }
}
