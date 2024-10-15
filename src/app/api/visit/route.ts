import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { promises as fs } from "fs";
import path from "path";

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
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extrair dados do formulário
    const title = formData.get("title") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Imagem é obrigatória." },
        { status: 400 }
      );
    }

    // Gera um nome único para a imagem
    const fileName = `visit-${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo localmente
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Cria o caminho da imagem para o banco de dados
    const imageUrl = `/uploads/${fileName}`;

    // Cria um novo registro de visita no banco de dados
    const newVisit = await prisma.visit.create({
      data: {
        title,
        imageUrl,
      },
    });

    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar visita:", error);
    return NextResponse.json(
      { error: "Erro ao criar visita." },
      { status: 500 }
    );
  }
}
