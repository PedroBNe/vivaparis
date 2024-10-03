import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Garantindo uma única instância do PrismaClient
const prisma = new PrismaClient();

// GET: Buscar uma classe por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const classItem = await prisma.class.findUnique({
      where: { id },
    });

    if (!classItem) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classItem);
  } catch (error) {
    console.error("Error fetching class:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the class" },
      { status: 500 }
    );
  }
}
