/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface FormData {
  logo: string;
  logoFile: File | null | string;
  navbar: { name: string; url: string }[];
  email: string;
  number: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
}


const EditForm = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    logo: '',
    logoFile: null,
    navbar: [{ name: '', url: '' }],
    email: "",
    number: "",
    address: "",
    politicas: "",
    cookies: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
  });

  const handleNavbarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "name" | "url"
  ) => {
    const { value } = e.target;
    const updatedNavbar = formData.navbar.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      navbar: updatedNavbar,
    }));
  };

  // Função para adicionar um item na navbar
  const handleAddNavbarItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      navbar: [...prevFormData.navbar, { name: "", url: "" }],
    }));
  };

  // Função para remover um item da navbar
  const handleRemoveNavbarItem = (index: number) => {
    const updatedNavbar = formData.navbar.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      navbar: updatedNavbar,
    }));
  };

  // Função para atualizar o estado quando o input mudar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'logo' && files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        logoFile: files[0],  // Captura o arquivo de imagem para fazer o upload
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // const handleImageUpload = async (file: File): Promise<string | null> => {
  //   const formData = new FormData();
  //   formData.append("file", file); // Adiciona o arquivo para ser enviado

  //   try {
  //     const response = await fetch("http://localhost:8080/upload", {
  //       method: "POST",
  //       body: formData, // Envia o arquivo como FormData
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       return data.fileName; // Recebe o nome da imagem salva no servidor
  //     } else {
  //       console.error("Erro ao enviar a imagem");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Erro na requisição:", error);
  //     return null;
  //   }
  // };

  // Função para enviar os dados ao backend via PUT
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const logoFile = formData.logoFile instanceof File
        ? await formData.logoFile.arrayBuffer()
        : null;

      const base64LogoFile = logoFile
        ? Buffer.from(logoFile).toString('base64')
        : null;

      const payload = { ...formData, logoFile: base64LogoFile };

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Alterações salvas com sucesso!');
      } else {
        console.error('Erro ao salvar as alterações');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };


  // Função para buscar os dados do backend ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/external-api/home/1"); // API externa
        const data = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="w-full h-screen flex justify-center text-black bg-[var(--background)] rounded-b-[70px] z-20 relative">
      <Card className="w-[55vw] h-fit">
        <CardHeader>
          <h2 className="text-xl font-semibold">Edit Form</h2>
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
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="logo"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                />
                <Input
                  type="file"
                  id="imageInput"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="navbar" className="block text-sm font-medium text-gray-700">
                Barra de Navegação
              </label>
              {formData.navbar.map((field, index) => (
                <div key={index} className="flex space-x-2 mb-2 items-center">
                  <Input
                    type="text"
                    placeholder="Item"
                    value={field.name}
                    onChange={(event) =>
                      handleNavbarChange(event, index, "name")
                    }
                  />
                  <Input
                    type="text"
                    placeholder="URL"
                    value={field.url}
                    onChange={(event) =>
                      handleNavbarChange(event, index, "url")
                    }
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveNavbarItem(index)}
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddNavbarItem}>
                Adicionar item
              </Button>
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Email
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
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Politicas
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.politicas}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Cookies
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.cookies}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Facebook
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                WhatsApp
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="w-full block text-sm font-medium text-gray-700"
              >
                Instagram
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.instagram}
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
