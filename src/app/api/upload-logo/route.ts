import { NextResponse } from "next/server";
import fs from "fs/promises";

// A função precisa seguir esta assinatura no App Router
export async function POST(request: Request) {
  try {
    const { logoFile, ...formData } = await request.json();

    if (logoFile) {
      const buffer = Buffer.from(logoFile, "base64");
      await fs.writeFile("public/logo.png", buffer); // Salva a imagem na pasta 'public'
    }

    const response = await fetch("http://localhost:8080/home/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Alterações salvas com sucesso!" });
    } else {
      return NextResponse.json(
        { error: "Erro ao salvar as alterações" },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json(
      { error: `Erro na requisição: ${errorMessage}` },
      { status: 500 }
    );
  }
}
