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
  carouselImagesFile: (File | null | string)[];    
  imagesWhoFile: (File | null | string)[];  
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
    carouselImagesFile: [],  
    imagesWhoFile: [],  
    email: '',
    number: '',
    address: '',
    politicas: '',
    cookies: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
  });

  const [loading, setLoading] = useState(false); // Estado de loading
  const [message, setMessage] = useState<string | null>(null); // Feedback ao usuário

  // Adicionar nova entrada para Imagens do Carousel
  const handleAddCarouselImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      carouselImagesFile: [...prevFormData.carouselImagesFile, null],
    }));
  };

  // Remover imagem do Carousel pelo índice
  const handleRemoveCarouselImage = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      carouselImagesFile: prevFormData.carouselImagesFile.filter((_, i) => i !== index),
    }));
  };

  // Adicionar nova entrada para Imagens de "Quem Sou Eu"
  const handleAddImagesWho = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagesWhoFile: [...prevFormData.imagesWhoFile, null],
    }));
  };

  // Remover imagem de "Quem Sou Eu" pelo índice
  const handleRemoveImagesWho = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagesWhoFile: prevFormData.imagesWhoFile.filter((_, i) => i !== index),
    }));
  };

  // Função para lidar com o upload de arquivos de imagem
  const handleImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'carouselImagesFile' | 'imagesWhoFile'
  ) => {
    const { files } = e.target;
    if (files && files[0]) {
      const updatedFiles = [...formData[field]];
      updatedFiles[index] = files[0]; // Atualiza a entrada correspondente com o arquivo selecionado
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: updatedFiles,
      }));
    }
  };

  // Função para lidar com as mudanças na Navbar
  const handleNavbarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'name' | 'url'
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

  // Adicionar um item à Navbar
  const handleAddNavbarItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      navbar: [...prevFormData.navbar, { name: '', url: '' }],
    }));
  };

  // Remover um item da Navbar pelo índice
  const handleRemoveNavbarItem = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      navbar: prevFormData.navbar.filter((_, i) => i !== index),
    }));
  };

  // Função para atualizar campos simples do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'logo' && files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        logoFile: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Função para enviar os dados ao backend via PUT
  const convertFileToBase64 = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
  };
  
  const convertFilesToBase64Array = async (files: File[]): Promise<string[]> => {
    return Promise.all(files.map((file) => convertFileToBase64(file)));
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      // Convertendo logo para base64 se existir
      const base64LogoFile = formData.logoFile instanceof File
        ? await convertFileToBase64(formData.logoFile)
        : null;
  
      const payload = { ...formData, logoFile: base64LogoFile };
  
      // Convertendo imagens do carousel para base64
      const carouselFiles = formData.carouselImagesFile.filter(
        (file): file is File => file instanceof File
      );
      const base64CarouselImages = await convertFilesToBase64Array(carouselFiles);
  
      const imagesCarouselPayload = {
        ...formData,
        carouselImagesFile: base64CarouselImages,
      };
  
      // Convertendo imagens "Who" para base64
      const whoFiles = formData.imagesWhoFile.filter(
        (file): file is File => file instanceof File
      );
      const base64WhoImages = await convertFilesToBase64Array(whoFiles);
  
      const imagesWhoPayload = {
        ...formData,
        whoImagesFile: base64WhoImages,
      };
  
      // Enviando requisições em paralelo
      const [imgResponse, imgWhoResponse, logoResponse] = await Promise.all([
        fetch('/api/carousel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(imagesCarouselPayload),
        }),
        fetch('/api/who', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(imagesWhoPayload),
        }),
        fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
      ]);
  
      // Checando as respostas das requisições
      if (imgResponse.ok && imgWhoResponse.ok && logoResponse.ok) {
        console.log('Alterações salvas com sucesso!');
        setMessage("Alterações salvas com sucesso!");
        setLoading(false);
      } else {
        setLoading(false);
        setMessage("Erro ao salvar alterações.");
        console.error('Erro ao salvar as alterações:', {
          imgResponse: imgResponse.status,
          imgWhoResponse: imgWhoResponse.status,
          logoResponse: logoResponse.status,
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMessage("Erro ao salvar alterações.");
      setLoading(false);
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
    <div className="w-full h-auto py-8 flex justify-center text-black bg-[var(--background)] rounded-b-[70px] z-20 relative">
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
              <Input
                type="file"
                id="imageInput"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Imagens do Carousel
              </label>
              {formData.carouselImagesFile.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageFileChange(e, index, 'carouselImagesFile')
                    }
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveCarouselImage(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddCarouselImage}>
                Adicionar Imagem
              </Button>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Imagens "Quem Sou Eu"
              </label>
              {formData.imagesWhoFile.map((_, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageFileChange(e, index, 'imagesWhoFile')
                    }
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveImagesWho(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddImagesWho}>
                Adicionar Imagem
              </Button>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </CardFooter>
          {message && <p className="text-center my-4">{message}</p>}
        </form>
      </Card>
    </div>
  );
};

export default EditForm;
