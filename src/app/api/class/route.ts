import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

// Singleton do PrismaClient
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

interface ClassData {
  id?: string;
  title: string;
  subtitle: string;
  date: string | Date;
  time: number;
  students: number;
  imageUrl?: string;
  category: string; // Usando string para o enum Category
}

// GET: Pegar todas as classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany();
    return NextResponse.json(classes);
  } catch (error) {
    console.error("Error fetching classes: ", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

// POST: Criar uma nova classe
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extraindo campos do FormData
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const date = formData.get("date") as string | Date;
    const time = formData.get("time") as string;
    const students = formData.get("students") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file");

    // Verificando se o arquivo de imagem foi recebido
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No image file received." },
        { status: 400 }
      );
    }

    // Manipulação de arquivo (imagem)
    const buffer = Buffer.from(await (file as Blob).arrayBuffer());
    const filename =
      Date.now() + "_" + (file as Blob).name.replaceAll(" ", "_");
    const uploadPath = path.join(process.cwd(), "public/class/");

    // Criar a pasta se não existir
    await fs.promises.mkdir(uploadPath, { recursive: true });

    // Salvar o arquivo de imagem
    await writeFile(path.join(uploadPath, filename), buffer);

    // Criando a classe no banco de dados
    const formattedDate = new Date(date);
    const newClass = await prisma.class.create({
      data: {
        title,
        subtitle,
        date: formattedDate.toISOString(),
        time: parseInt(time),
        students: parseInt(students),
        imageUrl: "/class/" + filename, // Caminho da imagem
        category, // O enum é representado como string
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error("Error occurred while creating class: ", error);
    return NextResponse.json({
      Message: "Failed to create class",
      status: 500,
    });
  }
}

// PUT: Atualizar uma classe existente
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    // Extraindo campos do FormData
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const date = formData.get("date") as string | Date;
    const time = formData.get("time") as string;
    const students = formData.get("students") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file");

    let imageUrl: string | undefined;

    if (file && typeof file !== "string") {
      // Manipulação de arquivo (imagem)
      const buffer = Buffer.from(await (file as Blob).arrayBuffer());
      const filename =
        Date.now() + "_" + (file as Blob).name.replaceAll(" ", "_");
      const uploadPath = path.join(process.cwd(), "public/class/");

      // Criar a pasta se não existir
      await fs.promises.mkdir(uploadPath, { recursive: true });

      // Salvar o arquivo de imagem
      await writeFile(path.join(uploadPath, filename), buffer);

      imageUrl = "/class/" + filename; // Caminho da imagem
    }

    // Atualizando a classe no banco de dados
    const formattedDate = new Date(date);
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        title,
        subtitle,
        date: formattedDate.toISOString(),
        time: parseInt(time),
        students: parseInt(students),
        category,
        ...(imageUrl && { imageUrl }), // Atualiza a imagem se houver uma nova
      },
    });

    return NextResponse.json(updatedClass);
  } catch (error) {
    console.error("Error occurred while updating class: ", error);
    return NextResponse.json({
      Message: "Failed to update class",
      status: 500,
    });
  }
}

// DELETE: Excluir uma classe
export async function DELETE(req: Request) {
  try {
    const { id }: { id: string } = await req.json();
    await prisma.class.delete({
      where: { id },
    });
    return NextResponse.json({ status: "Class deleted" });
  } catch (error) {
    console.error("Error occurred while deleting class: ", error);
    return NextResponse.json({
      Message: "Failed to delete class",
      status: 500,
    });
  }
}
