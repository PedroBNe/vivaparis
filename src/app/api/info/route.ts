import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "../../../../lib/prisma";

// Diretório onde as imagens serão armazenadas
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Função para salvar um arquivo e retornar a URL
const saveFile = async (file: File, prefix: string) => {
  const fileName = `${prefix}-${Date.now()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
};

// Método GET: Buscar a entrada de Info
export async function GET() {
  try {
    const info = await prisma.info.findFirst();
    if (!info) {
      return NextResponse.json(
        { error: "Info não encontrada." },
        { status: 404 }
      );
    }
    return NextResponse.json(info, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar Info:", error);
    return NextResponse.json(
      { error: "Erro ao buscar Info." },
      { status: 500 }
    );
  }
}

// Método PUT: Atualizar ou criar a entrada de Info
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    // Verificar se existe uma entrada de Info
    let info = await prisma.info.findFirst();

    // Extrair dados do formulário
    const logoFile = formData.get("logo") as File;
    const caroselFiles = formData.getAll("carosel") as File[];
    const quemsoueuFiles = formData.getAll("quemsoueu") as File[];
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;
    const politicas = formData.get("politicas") as string;
    const cookies = formData.get("cookies") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const facebook = formData.get("facebook") as string;
    const instagram = formData.get("instagram") as string;

    // Salvar arquivos de imagens
    const logoUrl = logoFile
      ? await saveFile(logoFile, "logo")
      : info?.logo || "";
    const caroselUrls = caroselFiles.length
      ? await Promise.all(
          caroselFiles.map((file, index) =>
            saveFile(file, `carosel-${index + 1}`)
          )
        )
      : info?.carosel || [];

    const quemsoueuUrls = quemsoueuFiles.length
      ? await Promise.all(
          quemsoueuFiles.map((file, index) =>
            saveFile(file, `quemsoueu-${index + 1}`)
          )
        )
      : info?.quemsoueu || [];

    // Criar ou atualizar a entrada de Info
    if (!info) {
      info = await prisma.info.create({
        data: {
          logo: logoUrl,
          carosel: caroselUrls,
          quemsoueu: quemsoueuUrls,
          email,
          phoneNumber,
          address,
          politicas,
          cookies,
          whatsapp,
          facebook,
          instagram,
        },
      });
      return NextResponse.json(info, { status: 201 });
    } else {
      const updatedInfo = await prisma.info.update({
        where: { id: info.id },
        data: {
          logo: logoUrl,
          carosel: caroselUrls,
          quemsoueu: quemsoueuUrls,
          email,
          phoneNumber,
          address,
          politicas,
          cookies,
          whatsapp,
          facebook,
          instagram,
        },
      });
      return NextResponse.json(updatedInfo, { status: 200 });
    }
  } catch (error) {
    console.error("Erro ao atualizar Info:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar Info." },
      { status: 500 }
    );
  }
}
