import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Buscar o único registro de About
export async function GET() {
  try {
    const about = await prisma.about.findFirst(); // Busca o primeiro registro
    if (!about) {
      return NextResponse.json(
        { error: "Registro de About não encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar About:", error);
    return NextResponse.json(
      { error: "Erro ao buscar About." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar o registro de About
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updatedAbout = await prisma.about.update({
      where: { id: body.id }, // Atualiza o registro pelo ID
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(updatedAbout, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar About:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar About." },
      { status: 500 }
    );
  }
}
