"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Interface para os dados de Info
interface Info {
  id: string;
  logo: string;
  carosel: string[];
  quemsoueu: string[];
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
}

export default function EditInfo() {
  const [info, setInfo] = useState<Info | null>(null);
  const [form, setForm] = useState<Partial<Info>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [caroselFiles, setCaroselFiles] = useState<File[]>([]);
  const [quemsoueuFiles, setQuemsoueuFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar as informações existentes de Info
  const fetchInfo = async () => {
    try {
      const res = await fetch("/api/info");
      if (!res.ok) throw new Error("Erro ao carregar Info.");
      const data = await res.json();
      setInfo(data);
      setForm(data); // Preencher o formulário com os dados existentes
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar os dados assim que o componente for montado
  useEffect(() => {
    fetchInfo();
  }, []);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFiles: (files: File[]) => void
  ) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (logoFile) formData.append("logo", logoFile);
      caroselFiles.forEach((file) => formData.append("carosel", file));
      quemsoueuFiles.forEach((file) => formData.append("quemsoueu", file));

      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      const res = await fetch("/api/info", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar Info.");

      alert("Info atualizado com sucesso!");
      fetchInfo(); // Recarregar os dados após a atualização
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!info) return <p>Info não encontrada.</p>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Editar Informações</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Logo Atual:</label>
        {info.logo && <img src={info.logo} alt="Logo Atual" className="w-32 h-32" />}
        <input type="file" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
        <label>Imagens do Carrossel:</label>
        <div className="flex gap-4">
          {info.carosel.map((image, index) => (
            <img key={index} src={image} alt={`Carrossel ${index + 1}`} className="w-32 h-32" />
          ))}
        </div>
        <input type="file" multiple onChange={(e) => handleFileChange(e, setCaroselFiles)} />
        <label>Imagens de Quem Sou Eu:</label>
        <div className="flex gap-4">
          {info.quemsoueu.map((image, index) => (
            <img key={index} src={image} alt={`Quem Sou Eu ${index + 1}`} className="w-32 h-32" />
          ))}
        </div>
        <Input type="file" multiple onChange={(e) => handleFileChange(e, setQuemsoueuFiles)} />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Telefone"
          value={form.phoneNumber || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Endereço"
          value={form.address || ""}
          onChange={handleChange}
        />
        <Textarea
          name="politicas"
          placeholder="Políticas"
          value={form.politicas || ""}
          onChange={handleChange}
        />
        <Textarea
          name="cookies"
          placeholder="Cookies"
          value={form.cookies || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          value={form.whatsapp || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="facebook"
          placeholder="Facebook"
          value={form.facebook || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={form.instagram || ""}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  );
}
