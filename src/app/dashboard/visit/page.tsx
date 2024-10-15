'use client';

import { useEffect, useState } from 'react';

type Visit = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function VisitList() {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      const res = await fetch('/api/visit');
      const data = await res.json();
      setVisits(data);
    };
    fetchVisits();
  }, []);

  return (
    <div>
      <h1>Visit List</h1>
      <ul>
        {visits.map((visit) => (
          <li key={visit.id}>
            <h2>{visit.title}</h2>
            {visit.imageUrl && <img src={visit.imageUrl} alt={visit.title} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
