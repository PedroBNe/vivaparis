// /pages/api/navbar/create.ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, link, homeId } = req.body;

    try {
      const newItem = await prisma.navbarItem.create({
        data: {
          name,
          link,
          home: { connect: { id: homeId } },
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: "Erro ao criar NavbarItem" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
};

export default handler;
