import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// GET: Listar todos os itens da Navbar
export async function GET() {
  try {
    const navbars = await prisma.navbar.findMany();
    return NextResponse.json(navbars, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar itens da Navbar." },
      { status: 500 }
    );
  }
}

// POST: Criar um novo item na Navbar
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newNavbarItem = await prisma.navbar.create({
      data: {
        name: body.name,
        url: body.url,
      },
    });
    return NextResponse.json(newNavbarItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar item na Navbar." },
      { status: 500 }
    );
  }
}
