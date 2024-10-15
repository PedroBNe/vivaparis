import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { whoImagesFile, ...formData } = await request.json();
    console.log("Dados recebidos:", { whoImagesFile, formData });

    if (whoImagesFile && Array.isArray(whoImagesFile)) {
      const dirPath = path.join(process.cwd(), "public", "quem");
      console.log("Criando diretório:", dirPath);
      await fs.mkdir(dirPath, { recursive: true });

      // Tenta salvar cada imagem e loga caso haja erro
      await Promise.all(
        whoImagesFile.map(async (base64Image: string, index: number) => {
          try {
            const buffer = Buffer.from(base64Image, "base64");
            const filePath = path.join(dirPath, `carousel-${index}.jpg`);
            console.log(`Salvando imagem em: ${filePath}`);
            await fs.writeFile(filePath, buffer);
          } catch (err) {
            console.error(`Erro ao salvar a imagem ${index}:`, err);
            throw err; // Relança o erro para que o catch externo o capture
          }
        })
      );
    } else {
      console.warn("Nenhuma imagem válida fornecida.");
    }

    // Tenta enviar os dados para a API externa
    console.log("Enviando dados para a API externa:", formData);
  } catch (error) {
    console.error("Erro ao criar quem somos:", error);
    return NextResponse.json(
      { error: "Erro ao criar quem somos." },
      { status: 500 }
    );
  }
}
