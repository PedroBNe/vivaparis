'use client';

import { useEffect, useState } from 'react';

type Midia = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  content: string;
  imageUrl: string;
};

export default function MidiaList() {
  const [midias, setMidias] = useState<Midia[]>([]);

  useEffect(() => {
    const fetchMidias = async () => {
      const res = await fetch('/api/midia');
      const data = await res.json();
      setMidias(data);
    };
    fetchMidias();
  }, []);

  return (
    <div>
      <h1>Midia List</h1>
      <ul>
        {midias.map((midia) => (
          <li key={midia.id}>
            <h2>{midia.title}</h2>
            <p>{midia.subtitle}</p>
            <p>{new Date(midia.date).toLocaleDateString()}</p>
            <p>{midia.content}</p>
            {midia.imageUrl && <img src={midia.imageUrl} alt={midia.title} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
