'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClassFormData {
  title: string;
  subtitle: string;
  date: string; // Usaremos uma string para o input de data
  timeHours: number; // Horas de duração
  timeMinutes: number; // Minutos de duração
  students: number;
  image: File | null;
  category: string; // Usaremos string para representar o enum
}

export default function CreateClass() {
  const [formData, setFormData] = useState<ClassFormData>({
    title: '',
    subtitle: '',
    date: new Date().toISOString().slice(0, 10),
    timeHours: 0,
    timeMinutes: 0,
    students: 0,
    image: null,
    category: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const categoryOptions = [
    { value: 'INICIANTE', label: 'Iniciante' },
    { value: 'INTERMEDIARIO', label: 'Intermediário' },
    { value: 'AVANCADO', label: 'Avançado' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'students' ? parseInt(value) : value,
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples
    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.date ||
      (formData.timeHours === 0 && formData.timeMinutes === 0) ||
      formData.students === 0 ||
      !formData.category ||
      !formData.image
    ) {
      setError(
        'Por favor, preencha todos os campos e faça o upload de uma imagem.'
      );
      return;
    }

    setLoading(true);
    setError(null);

    // Calcula o tempo total em minutos
    const totalTime = formData.timeHours * 60 + formData.timeMinutes;

    const classData = new FormData();
    classData.append('title', formData.title);
    classData.append('subtitle', formData.subtitle);
    classData.append('date', formData.date);
    classData.append('time', totalTime.toString());
    classData.append('students', formData.students.toString());
    classData.append('category', formData.category);
    classData.append('file', formData.image as File);

    try {
      const response = await fetch('/api/class', {
        method: 'POST',
        body: classData,
      });

      if (response.ok) {
        router.push('/dashboard/classes');
      } else {
        setError('Ocorreu um erro ao criar a classe.');
      }
    } catch (err) {
      setError('Ocorreu um erro na requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Classe</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subtítulo
          </label>
          <input
            type="text"
            name="subtitle"
            placeholder="Subtítulo"
            value={formData.subtitle}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duração
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="timeHours"
              placeholder="Horas"
              value={formData.timeHours}
              onChange={handleTimeChange}
              min={0}
              required
              className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="timeMinutes"
              placeholder="Minutos"
              value={formData.timeMinutes}
              onChange={handleTimeChange}
              min={0}
              max={59}
              required
              className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Estudantes
          </label>
          <input
            type="number"
            name="students"
            placeholder="Quantidade de estudantes"
            value={formData.students}
            onChange={handleInputChange}
            min={0}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagem da Classe
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione uma categoria</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Classe'}
          </button>
        </div>
      </form>
    </div>
  );
}
