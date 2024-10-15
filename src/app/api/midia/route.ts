import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const midia = await prisma.midia.findMany();
    return NextResponse.json(midia || [], { status: 200 }); // Retorna um array vazio se não houver registros
  } catch (error) {
    console.error("Erro ao buscar Mídia:", error);
    return NextResponse.json(
      { error: "Erro ao buscar Mídia." },
      { status: 500 }
    );
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extrair dados do formulário
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Imagem é obrigatória." },
        { status: 400 }
      );
    }

    // Gera um nome único para a imagem
    const fileName = `midia-${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo localmente
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Cria o caminho da imagem para o banco de dados
    const imageUrl = `/uploads/${fileName}`;

    // Cria um novo registro de mídia no banco de dados
    const newMedia = await prisma.midia.create({
      data: {
        title,
        subtitle,
        content,
        date: new Date(date),
        imageUrl,
      },
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar mídia:", error);
    return NextResponse.json(
      { error: "Erro ao criar mídia." },
      { status: 500 }
    );
  }
}
