import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { promises as fs } from "fs";
import path from "path";

// GET: Listar todos os blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar blogs:", error);
    return NextResponse.json(
      { error: "Erro ao buscar blogs." },
      { status: 500 }
    );
  }
}

// POST: Criar um novo blog
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extrai os dados do formulário
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const categoryId = formData.get("categoryId") as string; // Categoria selecionada
    const file = formData.get("file") as File;

    // Verifica se a imagem foi enviada
    if (!file) {
      return NextResponse.json(
        { error: "Imagem é obrigatória." },
        { status: 400 }
      );
    }

    // Gera um nome único para a imagem
    const fileName = `blog-${Date.now()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Garante que o diretório de uploads exista
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Salva o arquivo localmente
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Cria o caminho da imagem para o banco de dados
    const imageUrl = `/uploads/${fileName}`;

    // Cria uma nova postagem no banco de dados com a categoria
    const newPost = await prisma.blog.create({
      data: {
        title,
        subtitle,
        content,
        date: new Date(date),
        imageUrl,
        category: { connect: { id: categoryId } }, // Conectando a categoria selecionada
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar blog:", error);
    return NextResponse.json({ error: "Erro ao criar blog." }, { status: 500 });
  }
}
