import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar informações do Info
export async function GET() {
  try {
    const infos = await prisma.info.findMany();
    return NextResponse.json(infos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar informações." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova entrada no Info
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newInfo = await prisma.info.create({
      data: body,
    });
    return NextResponse.json(newInfo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar informação." },
      { status: 500 }
    );
  }
}
