import { NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    const filename = `${uuidv4()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    const buffer = Buffer.from(await file.arrayBuffer());

    // Salva o arquivo na pasta 'public/uploads'
    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filepath);
      writeStream.write(buffer);
      writeStream.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao fazer upload do arquivo." },
      { status: 500 }
    );
  }
}
