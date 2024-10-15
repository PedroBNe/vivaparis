'use client';

import { useEffect, useState } from 'react';

type About = {
  id: string;
  title: string;
  imageUrl: string;
};

export default function AboutList() {
  const [abouts, setAbouts] = useState<About[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      const res = await fetch('/api/about');
      const data = await res.json();
      setAbouts(data);
    };
    fetchAbouts();
  }, []);

  return (
    <div>
      <h1>About List</h1>
      <ul>
        {abouts.map((about) => (
          <li key={about.id}>
            <h2>{about.title}</h2>
            {about.imageUrl && <img src={about.imageUrl} alt={about.title} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
