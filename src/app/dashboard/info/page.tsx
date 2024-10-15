'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define o tipo do dado de Info
type Info = {
  id?: string;
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function EditInfo() {
  const [info, setInfo] = useState<Info>({
    email: '',
    phoneNumber: '',
    address: '',
    politicas: '',
    cookies: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Função para buscar o registro de Info
  const fetchInfo = async () => {
    try {
      const res = await fetch('/api/info');
      if (res.ok) {
        const data = await res.json();
        setInfo(data);
      } else {
        console.log('Nenhuma entrada encontrada. Criando uma nova entrada...');
        // Se não houver registro, usamos o estado padrão (vazio)
      }
    } catch (err) {
      console.error('Erro ao buscar Info:', err);
      setError('Erro ao buscar Info.');
    } finally {
      setLoading(false);
    }
  };

  // Chama a função ao carregar o componente
  useEffect(() => {
    fetchInfo();
  }, []);

  // Manipula a mudança dos campos do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Envia as alterações para a API via PUT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });

      if (res.ok) {
        const updatedInfo = await res.json();
        setInfo(updatedInfo);
        alert('Atualizado com sucesso!');
        router.push('/dashboard/info'); // Redireciona após salvar
      } else {
        console.error('Erro ao atualizar Info.');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-black">
      <form
        onSubmit={handleSubmit}
        className="w-[30%] p-4 bg-white rounded-xl flex flex-col gap-4"
      >
        <Input
          name="email"
          placeholder="Email"
          value={info.email}
          onChange={handleChange}
          required
        />
        <Input
          name="phoneNumber"
          placeholder="Telefone"
          value={info.phoneNumber}
          onChange={handleChange}
        />
        <Input
          name="address"
          placeholder="Endereço"
          value={info.address}
          onChange={handleChange}
        />
        <Input
          name="politicas"
          placeholder="Políticas"
          value={info.politicas}
          onChange={handleChange}
        />
        <Input
          name="cookies"
          placeholder="Cookies"
          value={info.cookies}
          onChange={handleChange}
        />
        <Input
          name="whatsapp"
          placeholder="WhatsApp"
          value={info.whatsapp}
          onChange={handleChange}
        />
        <Input
          name="facebook"
          placeholder="Facebook"
          value={info.facebook}
          onChange={handleChange}
        />
        <Input
          name="instagram"
          placeholder="Instagram"
          value={info.instagram}
          onChange={handleChange}
        />
        <Button variant="meu" type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
}
