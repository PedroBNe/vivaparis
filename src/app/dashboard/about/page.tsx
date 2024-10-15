"use client"; // Habilita hooks e interatividade

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

// Define o tipo do dado de About
type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  // Função para buscar o único registro de About
  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error(`Erro ao buscar About: ${res.status}`);

      const data = await res.json();
      setAbout(data);
    } catch (err) {
      console.error("Erro ao buscar About:", err);
    }
  };

  // Chama a função ao carregar o componente
  useEffect(() => {
    fetchAbout();
  }, []);

  // Manipula a mudança dos campos do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAbout((prev) => prev && { ...prev, [name]: value });
  };

  // Envia as alterações para a API via PUT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });

      if (!res.ok) throw new Error("Erro ao atualizar About");
      const updatedAbout = await res.json();
      setAbout(updatedAbout);
      alert("Atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar About:", err);
    }
  };

  if (!about) return <p>Nenhuma informação encontrada.</p>;

  return (
    <div>
      <h1>Editar Sobre Nós</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={about.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Imagem URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={about.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h2>Visualização</h2>
        <h3>{about.title}</h3>
        {about.imageUrl && <img src={about.imageUrl} alt="Imagem" width={300} />}
      </div>
    </div>
  );
}
