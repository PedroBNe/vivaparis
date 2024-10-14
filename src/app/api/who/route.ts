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
    const response = await fetch("http://localhost:8080/home/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Imagens do Carousel salvas com sucesso!" });
    } else {
      const errorText = await response.text(); // Captura a mensagem de erro da API externa
      console.error("Erro ao enviar dados para API externa:", errorText);
      return NextResponse.json(
        { error: "Erro ao enviar dados ao backend externo" },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na requisição:", errorMessage);
    return NextResponse.json(
      { error: `Erro na requisição: ${errorMessage}` },
      { status: 500 }
    );
  }
}
