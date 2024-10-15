import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { promises as fs } from "fs";
import path from "path";

// GET: Listar todas as aulas online
export async function GET() {
  try {
    const classes = await prisma.onlineClass.findMany();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar aulas online:", error);
    return NextResponse.json(
      { error: "Erro ao buscar aulas." },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova aula online
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extrair dados do formulário
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const date = formData.get("date") as string;
    const students = formData.get("students") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Imagem é obrigatória." },
        { status: 400 }
      );
    }

    // Gera um nome único para a imagem
    const fileName = `onlineclass-${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo localmente
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Cria o caminho da imagem para o banco de dados
    const imageUrl = `/uploads/${fileName}`;

    // Cria uma nova aula online no banco de dados
    const newClass = await prisma.onlineClass.create({
      data: {
        title,
        subtitle,
        date: new Date(date),
        students,
        imageUrl,
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar aula online:", error);
    return NextResponse.json(
      { error: "Erro ao criar aula online." },
      { status: 500 }
    );
  }
}
