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

    // Simula um envio dos dados restantes para outra API (se necessário)
    console.log(formData);
  } catch (error) {
    console.error("Erro ao criar logo:", error);
    return NextResponse.json({ error: "Erro ao criar logo." }, { status: 500 });
  }
}
