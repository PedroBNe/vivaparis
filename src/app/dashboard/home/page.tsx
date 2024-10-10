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

const EditForm = () => {
  const [formData, setFormData] = useState({
    id: 1,
    logo: "aqui",
    navbar: [
      { id: 1, name: "Home", url: "/home" },
      { id: 2, name: "Sobre", url: "/sobre" },
    ],
    carouselImages: [
      "https://exemplo.com/imagem1.png",
      "https://exemplo.com/imagem2.png",
    ],
    about: {
      id: 1,
      title: "Teste",
      image: "Imagem",
    },
    email: "pedro@gmail.com",
    number: "(48) 999999999",
    address: "Endereco",
    politicas: "Politicas de privacidade",
    cookies: "cookies",
    whatsapp: "Link whatsapp",
    facebook: "Link facebook",
    instagram: "Link instagram",
    imagesWho: ["Varias image", "aqui vai outra", "outra"],
  });

  // Função para atualizar o estado conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados enviados:", formData); // Verifique os dados aqui

    try {
      const response = await fetch("http://127.0.0.1:8080/home/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sucesso:", data);
      } else {
        const errorDetails = await response.text();
        console.error("Erro ao enviar dados:", response.status, errorDetails);
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
                htmlFor="title"
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
                htmlFor="title"
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
                htmlFor="title"
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
                htmlFor="title"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Endereco
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
            <Button type="submit">Salvar alteracoes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditForm;
