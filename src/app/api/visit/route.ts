import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todas as visitas
export async function GET() {
  try {
    const visits = await prisma.visit.findMany();
    return NextResponse.json(visits, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar visitas." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova visita
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newVisit = await prisma.visit.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar visita." },
      { status: 500 }
    );
  }
}
