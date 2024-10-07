import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function GET() {
  try {
    const home = await prisma.home.findFirst({
      include: {
        images: true,
        navbar: true,
      },
    });
    return NextResponse.json(home);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao obter a home." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Se os relacionamentos vierem como arrays vazios, remova-os para evitar erros
    if (data.images && data.images.length === 0) {
      delete data.images;
    }
    if (data.navbar && data.navbar.length === 0) {
      delete data.navbar;
    }

    // Verifica se já existe uma Home
    const existingHome = await prisma.home.findFirst();

    let home;
    if (existingHome) {
      // Atualiza a Home existente
      home = await prisma.home.update({
        where: { id: existingHome.id },
        data: {
          ...data,
          images: {
            deleteMany: {},
            create: data.images || [],
          },
          navbar: {
            deleteMany: {},
            create: data.navbar || [],
          },
        },
      });
    } else {
      // Cria uma nova Home
      home = await prisma.home.create({
        data: {
          ...data,
          images: {
            create: data.images || [],
          },
          navbar: {
            create: data.navbar || [],
          },
        },
      });
    }

    return NextResponse.json(home);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar ou atualizar a home." },
      { status: 500 }
    );
  }
}
