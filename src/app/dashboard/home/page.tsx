"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  logo: string;
  email: string;
  number: string;
  address: string;
}

const EditForm = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    logo: "",
    email: "",
    number: "",
    address: "",
  });

  // Função para atualizar o estado quando o input mudar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Função para enviar os dados ao backend via PUT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/home/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Sucesso
        console.log("Alterações salvas com sucesso!");
      } else {
        // Caso haja um erro
        console.error("Erro ao salvar as alterações");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center text-black">
      <Card className="w-[400px] h-fit">
        <CardHeader>
          <CardTitle>Home</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardContent className="space-y-4">
            <div className="w-full">
              <label
                htmlFor="logo"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Logo
              </label>
              <Input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Categoria
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="number"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Telefone
              </label>
              <Input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Endereço
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <Button type="submit">Salvar alterações</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditForm;
