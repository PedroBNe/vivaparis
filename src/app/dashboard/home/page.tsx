import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { promises as fs } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function HomeForm() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const endereco = formData.get("endereco") as string;
    const privacidade = formData.get("privacidade") as string;
    const cookies = formData.get("cookies") as string;
    const instagram = formData.get("instagram") as string;
    const facebook = formData.get("facebook") as string;
    const whatsap = formData.get("whatsap") as string;

    const logoFile = formData.get("logo") as File;
    let logoPath = "";

    if (logoFile && logoFile.size > 0) {
      const data = await logoFile.arrayBuffer();
      logoPath = `/${logoFile.name}`;
      await fs.writeFile(`${process.cwd()}/public/${logoFile.name}`, Buffer.from(data));
    }

    try {
      await prisma.home.upsert({
        where: { id: "unique_home_id" }, // Use um ID fixo ou único
        update: {
          email,
          phone,
          endereco,
          privacidade,
          cookies,
          instagram,
          facebook,
          logo: logoPath,
          whatsap,
        },
        create: {
          id: "unique_home_id", // Use um ID fixo ou gerado manualmente
          email,
          phone,
          endereco,
          privacidade,
          cookies,
          instagram,
          facebook,
          logo: logoPath,
          whatsap,
        },
      });
    } catch (error) {
      console.error("Erro ao salvar no banco de dados:", error);
      return { error: "Erro ao salvar no banco de dados" };
    }

    return { success: true };
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 md:w-[50%]">
        <form action={handleSubmit}>
          {/* Input para a logo */}
          <Input type="file" label="Logo" name="logo" accept=".png,.jpg,.jpeg" />

          {/* Inputs para os outros campos */}
          <Input type="email" label="Email" name="email" placeholder="Insira o email" required />
          <Input type="text" label="Telefone" name="phone" placeholder="Insira o telefone" required />
          <Input type="text" label="Endereço" name="endereco" placeholder="Insira o endereço" required />

          <label htmlFor="privacidade">Política de Privacidade</label>
          <textarea id="privacidade" name="privacidade" placeholder="Política de privacidade" required className="w-full p-2 border rounded-md" />

          <label htmlFor="cookies">Política de Cookies</label>
          <textarea id="cookies" name="cookies" placeholder="Política de cookies" required className="w-full p-2 border rounded-md" />

          <Input type="text" label="Instagram" name="instagram" placeholder="Link do Instagram" />
          <Input type="text" label="Facebook" name="facebook" placeholder="Link do Facebook" />
          <Input type="text" label="Whatsap" name="whatsap" placeholder="Link do WhatsAp" />

          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  );
}
