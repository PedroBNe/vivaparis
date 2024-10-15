import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body:", body); // Log para verificar o corpo da requisição

    const newMidia = await prisma.midia.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        date: new Date(body.date),
        content: body.content,
        imageUrl: body.imageUrl,
      },
    });

    console.log("New Midia Created:", newMidia); // Verificar o sucesso da criação
    return NextResponse.json(newMidia, { status: 201 });
  } catch (error) {
    console.error("Error creating Midia:", error); // Exibir o erro completo no console
    return NextResponse.json(
      { error: "Erro ao criar mídia." },
      { status: 500 }
    );
  }
}
