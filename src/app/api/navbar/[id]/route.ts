import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// GET: Obter um item da Navbar por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const navbarItem = await prisma.navbar.findUnique({ where: { id } });
    if (!navbarItem)
      return NextResponse.json(
        { error: "Item não encontrado." },
        { status: 404 }
      );

    return NextResponse.json(navbarItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar item." },
      { status: 500 }
    );
  }
}

// PUT: Atualizar um item da Navbar por ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedNavbarItem = await prisma.navbar.update({
      where: { id },
      data: { name: body.name, url: body.url },
    });

    return NextResponse.json(updatedNavbarItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar item." },
      { status: 500 }
    );
  }
}

// DELETE: Deletar um item da Navbar por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.navbar.delete({ where: { id } });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar item." },
      { status: 500 }
    );
  }
}
