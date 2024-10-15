import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "../../../../lib/prisma";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Função para salvar o arquivo
const saveFile = async (file: File, prefix: string) => {
  const fileName = `${prefix}-${Date.now()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
};

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

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    let info = await prisma.info.findFirst();

    const logoFile = formData.get("logo") as File | null;
    const caroselFiles = formData.getAll("carosel") as File[];
    const quemsoueuFiles = formData.getAll("quemsoueu") as File[];

    const logoUrl = logoFile
      ? await saveFile(logoFile, "logo")
      : info?.logo || "";
    const caroselUrls = caroselFiles.length
      ? await Promise.all(
          caroselFiles.map((file, i) => saveFile(file, `carosel-${i + 1}`))
        )
      : info?.carosel || [];
    const quemsoueuUrls = quemsoueuFiles.length
      ? await Promise.all(
          quemsoueuFiles.map((file, i) => saveFile(file, `quemsoueu-${i + 1}`))
        )
      : info?.quemsoueu || [];

    const data = {
      logo: logoUrl,
      carosel: caroselUrls,
      quemsoueu: quemsoueuUrls,
      email: formData.get("email")?.toString() || info?.email || "",
      phoneNumber:
        formData.get("phoneNumber")?.toString() || info?.phoneNumber || "",
      address: formData.get("address")?.toString() || info?.address || "",
      politicas: formData.get("politicas")?.toString() || info?.politicas || "",
      cookies: formData.get("cookies")?.toString() || info?.cookies || "",
      whatsapp: formData.get("whatsapp")?.toString() || info?.whatsapp || "",
      facebook: formData.get("facebook")?.toString() || info?.facebook || "",
      instagram: formData.get("instagram")?.toString() || info?.instagram || "",
    };

    if (!info) {
      const newInfo = await prisma.info.create({ data });
      return NextResponse.json(newInfo, { status: 201 });
    } else {
      const updatedInfo = await prisma.info.update({
        where: { id: info.id },
        data,
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
