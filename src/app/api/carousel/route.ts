import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { carouselImagesFile, ...formData } = await request.json();

    if (carouselImagesFile && Array.isArray(carouselImagesFile)) {
      // Verifica se a pasta de destino existe, caso contrário, cria a pasta
      const dirPath = path.join(process.cwd(), "public", "carousel");
      await fs.mkdir(dirPath, { recursive: true });

      // Salva cada imagem
      await Promise.all(
        carouselImagesFile.map(async (base64Image: string, index: number) => {
          const buffer = Buffer.from(base64Image, "base64");
          const filePath = path.join(dirPath, `carousel-${index}.jpg`);

          await fs.writeFile(filePath, buffer);
        })
      );
    }

    // Simula um envio dos dados restantes para outra API (se necessário)
    console.log(formData);
  } catch (error) {
    console.error("Erro ao criar carousel:", error);
    return NextResponse.json(
      { error: "Erro ao criar carousel." },
      { status: 500 }
    );
  }
}
