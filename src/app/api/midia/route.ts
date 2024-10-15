import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todas as mídias
export async function GET() {
  try {
    const midias = await prisma.midia.findMany();
    return NextResponse.json(midias, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar mídias." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova mídia
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newMidia = await prisma.midia.create({
      data: body,
    });
    return NextResponse.json(newMidia, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar mídia." },
      { status: 500 }
    );
  }
}
