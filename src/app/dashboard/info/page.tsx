"use client";

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

  // Função para buscar as informações da API
  const fetchInfo = async () => {
    try {
      const res = await fetch("/api/info");
      if (!res.ok) throw new Error("Erro ao carregar Info.");
      const data = await res.json();
      setInfo(data);
      setForm(data); // Preenche o formulário com os dados recebidos
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as informações na montagem do componente
  useEffect(() => {
    fetchInfo();
  }, []);

  // Manipulação de arquivos
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFiles: (files: File[]) => void
  ) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Manipulação de campos de texto
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar apenas os dados modificados
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Envia apenas os arquivos modificados
      if (logoFile) formData.append("logo", logoFile);
      if (caroselFiles.length > 0) {
        caroselFiles.forEach((file) => formData.append("carosel", file));
      }
      if (quemsoueuFiles.length > 0) {
        quemsoueuFiles.forEach((file) => formData.append("quemsoueu", file));
      }

      // Adiciona apenas os campos que foram alterados
      Object.entries(form).forEach(([key, value]) => {
        if (info && value !== info[key as keyof Info]) {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/info", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar Info.");

      alert("Info atualizado com sucesso!");
      fetchInfo(); // Recarrega os dados após a atualização
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Editar Informações</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Logo Atual:</label>
        {info?.logo && <img src={info.logo} alt="Logo Atual" className="w-32 h-32" />}
        <input type="file" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />

        <label>Imagens do Carrossel:</label>
        <div className="flex gap-4">
          {info?.carosel.map((image, index) => (
            <img key={index} src={image} alt={`Carrossel ${index + 1}`} className="w-32 h-32" />
          ))}
        </div>
        <input type="file" multiple onChange={(e) => handleFileChange(e, setCaroselFiles)} />

        <label>Imagens de Quem Sou Eu:</label>
        <div className="flex gap-4">
          {info?.quemsoueu.map((image, index) => (
            <img key={index} src={image} alt={`Quem Sou Eu ${index + 1}`} className="w-32 h-32" />
          ))}
        </div>
        <input type="file" multiple onChange={(e) => handleFileChange(e, setQuemsoueuFiles)} />

        <input type="text" name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
        <input type="text" name="phoneNumber" placeholder="Telefone" value={form.phoneNumber || ""} onChange={handleChange} />
        <input type="text" name="address" placeholder="Endereço" value={form.address || ""} onChange={handleChange} />
        <textarea name="politicas" placeholder="Políticas" value={form.politicas || ""} onChange={handleChange} />
        <textarea name="cookies" placeholder="Cookies" value={form.cookies || ""} onChange={handleChange} />
        <input type="text" name="whatsapp" placeholder="WhatsApp" value={form.whatsapp || ""} onChange={handleChange} />
        <input type="text" name="facebook" placeholder="Facebook" value={form.facebook || ""} onChange={handleChange} />
        <input type="text" name="instagram" placeholder="Instagram" value={form.instagram || ""} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
