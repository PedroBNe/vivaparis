import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Diretório onde as imagens serão salvas
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não encontrado." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Gera um nome único para a imagem
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo no diretório
    await fs.writeFile(filePath, buffer);

    // Retorna a URL pública da imagem
    const imageUrl = `/uploads/${fileName}`;

    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload." },
      { status: 500 }
    );
  }
}
