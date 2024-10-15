import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "../../../../lib/prisma";

// Diretório onde as imagens serão armazenadas
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    if (!about) {
      return NextResponse.json(
        { error: "About não encontrado." },
        { status: 404 }
      );
    }
    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar About:", error);
    return NextResponse.json(
      { error: "Erro ao buscar About." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const file = formData.get("file") as File;

    // Valida a imagem
    if (!file) {
      return NextResponse.json(
        { error: "Arquivo de imagem é necessário." },
        { status: 400 }
      );
    }

    // Gera um nome fixo para o arquivo
    const fileName = `about-image-${Date.now()}.jpg`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo no servidor
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    // Verifica se o registro já existe e faz update ou create
    let about = await prisma.about.findFirst();

    if (about) {
      about = await prisma.about.update({
        where: { id: about.id },
        data: { title, imageUrl },
      });
    } else {
      about = await prisma.about.create({
        data: { title, imageUrl },
      });
    }

    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar About:", error);
    return NextResponse.json(
      { error: "Erro ao salvar About." },
      { status: 500 }
    );
  }
}
