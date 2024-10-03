'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Class {
  id: string;
  title: string;
  subtitle: string;
  date: string; // Usaremos string para facilitar a manipulação
  imageUrl?: string; // Campo opcional para a imagem
  time: number;
  students: number;
  category: string; // Como `category` é um enum, usaremos string
}

export default function DashboardClasses() {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    async function fetchClasses() {
      const res = await fetch('/api/class'); // Rota de API para as classes
      const data: Class[] = await res.json();
      setClasses(data);
    }

    fetchClasses();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center p-12 text-black">
      <div className="w-[60vw] h-auto flex flex-col items-center gap-3 border-2 rounded-xl border-black bg-slate-200 shadow-2xl">
        <h1 className="text-lg font-semibold mt-2">Classes</h1>
        <button className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white ease-in transition p-3 rounded-2xl font-semibold text-sm">
          <Link href="/dashboard/classes/create">Criar Nova Classe</Link>
        </button>
        <ul className="w-[90%] flex flex-col gap-3">
          {classes.map((classe) => (
            <li key={classe.id} className="border-2 border-black p-3 rounded-lg">
              <div>
                <strong>{classe.title}</strong>
              </div>
              <div>
                <p>{classe.subtitle}</p>
              </div>
              {/* Renderizando a imagem se o imageUrl estiver presente */}
              {classe.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={classe.imageUrl}
                    alt={classe.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              {/* Exibindo a data da classe */}
              <div>
                <p>Data: {new Date(classe.date).toLocaleDateString()}</p>
              </div>
              {/* Exibindo o tempo da classe em horas e minutos */}
              <div>
                <p>Duração: {Math.floor(classe.time / 60)}h {classe.time % 60}m</p>
              </div>
              {/* Exibindo o número de estudantes */}
              <div>
                <p>Estudantes: {classe.students}</p>
              </div>
              {/* Exibindo a categoria */}
              <div>
                <p>Categoria: {classe.category}</p>
              </div>
              <Link href={`/dashboard/classes/edit/${classe.id}`} className="underline text-blue-500">
                Editar
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
