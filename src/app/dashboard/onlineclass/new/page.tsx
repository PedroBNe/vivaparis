"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function CreateOnlineClass() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    date: "",
    students: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      formData.append("subtitle", form.subtitle);
      formData.append("date", form.date);
      formData.append("students", form.students);
      formData.append("file", selectedFile);

      const res = await fetch("/api/onlineclass", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro ao criar aula online.");
      }

      alert("Aula criada com sucesso!");
      setForm({ title: "", subtitle: "", date: "", students: "" });
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao criar aula online:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Criar Nova Aula Online</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtítulo"
          value={form.subtitle}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="students"
          placeholder="Número de Alunos"
          value={form.students}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Aula"}
        </button>
      </form>
    </div>
  );
}
