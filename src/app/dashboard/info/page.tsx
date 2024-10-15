'use client';

import { useEffect, useState } from 'react';

type Info = {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  politicas: string;
  cookies: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
};

export default function InfoList() {
  const [infos, setInfos] = useState<Info[]>([]);

  useEffect(() => {
    const fetchInfos = async () => {
      const res = await fetch('/api/info');
      const data = await res.json();
      setInfos(data);
    };
    fetchInfos();
  }, []);

  return (
    <div>
      <h1>Info List</h1>
      <ul>
        {infos.map((info) => (
          <li key={info.id}>
            <p>Email: {info.email}</p>
            <p>Phone: {info.phoneNumber}</p>
            <p>Address: {info.address}</p>
            <p>Políticas: {info.politicas}</p>
            <p>Cookies: {info.cookies}</p>
            <p>WhatsApp: {info.whatsapp}</p>
            <p>Facebook: {info.facebook}</p>
            <p>Instagram: {info.instagram}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
