'use client';

import { useEffect, useState } from 'react';

type OnlineClass = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  students: string;
};

export default function OnlineClassList() {
  const [classes, setClasses] = useState<OnlineClass[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch('/api/onlineclass');
      const data = await res.json();
      setClasses(data);
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Online Classes</h1>
      <ul>
        {classes.map((onlineClass) => (
          <li key={onlineClass.id}>
            <h2>{onlineClass.title}</h2>
            <p>{onlineClass.subtitle}</p>
            <p>{new Date(onlineClass.date).toLocaleDateString()}</p>
            {onlineClass.imageUrl && <img src={onlineClass.imageUrl} alt={onlineClass.title} width={100} />}
            <p>Students: {onlineClass.students}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
