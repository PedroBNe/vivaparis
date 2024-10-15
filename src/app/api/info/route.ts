import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Obter o único registro de Info
export async function GET() {
  try {
    const info = await prisma.info.findFirst(); // Busca o primeiro registro
    if (!info) {
      return NextResponse.json(
        { error: "Nenhuma entrada encontrada." },
        { status: 404 }
      );
    }
    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar Info:", error);
    return NextResponse.json(
      { error: "Erro ao buscar Info." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar ou criar o registro de Info
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Tenta encontrar o registro existente
    let info = await prisma.info.findFirst();

    if (!info) {
      // Se não houver registro, cria um novo
      info = await prisma.info.create({
        data: {
          email: body.email,
          phoneNumber: body.phoneNumber,
          address: body.address,
          politicas: body.politicas,
          cookies: body.cookies,
          whatsapp: body.whatsapp,
          facebook: body.facebook,
          instagram: body.instagram,
        },
      });
      return NextResponse.json(info, { status: 201 });
    }

    // Se houver registro, atualiza-o
    const updatedInfo = await prisma.info.update({
      where: { id: info.id },
      data: {
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        politicas: body.politicas,
        cookies: body.cookies,
        whatsapp: body.whatsapp,
        facebook: body.facebook,
        instagram: body.instagram,
      },
    });

    return NextResponse.json(updatedInfo, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar ou criar Info:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar Info." },
      { status: 500 }
    );
  }
}
