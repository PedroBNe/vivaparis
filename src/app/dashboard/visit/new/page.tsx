"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function CreateVisit() {
  const [form, setForm] = useState({
    title: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("file", selectedFile);

      const res = await fetch("/api/visit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro ao criar visita.");
      }

      alert("Visita criada com sucesso!");
      setForm({ title: "" });
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao criar visita:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Criar Nova Visita</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Visita"}
        </button>
      </form>
    </div>
  );
}
